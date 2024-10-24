const Media = require('../models/Media'); // Убедитесь, что путь к модели Media правильный

const handleMedia = async (
  entity, // объект сущности, например Project, TeamMember и т.д.
  mediaFields, // объект, содержащий поля для медиа, например { singleField: 'cover', multiField: 'screens' }
  mediaData, // объект, содержащий данные медиа (например, файлы)
  transaction, // транзакция для сохранения данных в базе
) => {
  const { singleField, multiField } = mediaFields;

  // 1. Обработка одиночного медиа-поля (например, cover или photo)
  if (singleField) {
    const mediaFile = mediaData[singleField];

    if (mediaFile === null) {
      // Если медиа равно null, удаляем существующее медиа, если оно есть
      if (entity[`${singleField}_id`]) {
        await Media.destroy({
          where: { id: entity[`${singleField}_id`] },
          transaction,
        });
        await entity.update({ [`${singleField}_id`]: null }, { transaction });
      }
    } else if (mediaFile?.buffer) {
      // Если есть новый файл, заменяем существующий
      if (entity[`${singleField}_id`]) {
        await Media.destroy({
          where: { id: entity[`${singleField}_id`] },
          transaction,
        });
      }
      const newMedia = await Media.create(
        {
          content: mediaFile.buffer,
          originalname: mediaFile.originalname,
          mimetype: mediaFile.mimetype,
          size: mediaFile.size,
          entityId: entity.id,
        },
        { transaction },
      );
      await entity.update(
        { [`${singleField}_id`]: newMedia.id },
        { transaction },
      );
    }
  }

  // 2. Обработка мульти-поля медиа (например, screens)
  if (multiField) {
    const newMediaArray = mediaData[multiField]; // Новые медиа-файлы (если есть)
    let existingMediaIds = entity[`${multiField}_ids`] || []; // Существующие ID медиа

    console.log('MEDIADATA:', mediaData);

    // Если есть новые медиа
    if (Array.isArray(newMediaArray) && newMediaArray.length > 0) {
      // Сохраняем новые медиа
      const mediaToSave = newMediaArray.map((media) => ({
        content: media.buffer,
        originalname: media.originalname, // Предполагается, что у каждого медиа есть originalname
        mimetype: media.mimetype, // Предполагается, что у каждого медиа есть mimetype
        size: media.size, // Предполагается, что у каждого медиа есть size
        entityId: entity.id,
      }));
      const createdMedia = await Media.bulkCreate(mediaToSave, { transaction });

      // Добавляем новые ID к существующим ID медиа
      existingMediaIds = [
        ...existingMediaIds,
        ...createdMedia.map((media) => media.id),
      ];
    }

    // Обновляем поле с массивом ID медиа (если оно изменилось)
    await entity.update(
      { [`${multiField}_ids`]: existingMediaIds },
      { transaction },
    );
  }
};

module.exports = handleMedia;
