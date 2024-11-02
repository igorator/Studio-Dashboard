const Media = require('../models/Media');

const handleMedia = async (entity, mediaFields, mediaData, transaction) => {
  const { singleField, multiField } = mediaFields;

  if (singleField) {
    const mediaFile = mediaData[singleField];

    if (mediaFile === null) {
      if (entity[`${singleField}_id`]) {
        await Media.destroy({
          where: { id: entity[`${singleField}_id`] },
          transaction,
        });
        await entity.update({ [`${singleField}_id`]: null }, { transaction });
      }
    } else if (mediaFile?.buffer) {
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

  if (multiField) {
    const newMediaArray = mediaData[multiField] || [];
    let existingMediaIds = entity[`${multiField}_ids`] || [];

    const newMediaIds = newMediaArray.map((media) => media.id).filter(Boolean);
    const mediaToAdd = newMediaArray.filter((media) => !media.id);

    const mediaToRemove = existingMediaIds.filter(
      (id) => !newMediaIds.includes(id),
    );
    if (mediaToRemove.length > 0) {
      await Media.destroy({ where: { id: mediaToRemove }, transaction });
      existingMediaIds = existingMediaIds.filter(
        (id) => !mediaToRemove.includes(id),
      );
    }

    if (mediaToAdd.length > 0) {
      const mediaToSave = mediaToAdd.map((media) => ({
        content: media.buffer,
        originalname: media.originalname,
        mimetype: media.mimetype,
        size: media.size,
        entityId: entity.id,
      }));
      const createdMedia = await Media.bulkCreate(mediaToSave, { transaction });
      existingMediaIds = [
        ...existingMediaIds,
        ...createdMedia.map((media) => media.id),
      ];
    }

    // 2.5 Обновляем поле с массивом ID медиа (если оно изменилось)
    await entity.update(
      { [`${multiField}_ids`]: existingMediaIds },
      { transaction },
    );
  }
};

module.exports = handleMedia;
