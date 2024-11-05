const Media = require('../models/Media');

const handleMedia = async (entity, mediaFields, mediaData, transaction) => {
  const { singleField, multiField } = mediaFields;

  if (singleField) {
    const mediaFile = mediaData[singleField];
    if (mediaFile) {
      const newMedia = await Media.create(
        {
          content: mediaFile.buffer,
          originalname: mediaFile.originalname,
          mimetype: mediaFile.mimetype,
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
    const mediaToSave = newMediaArray.map((media) => ({
      content: media.buffer,
      originalname: media.originalname,
      mimetype: media.mimetype,
      entityId: entity.id,
    }));
    const createdMedia = await Media.bulkCreate(mediaToSave, { transaction });
    const existingMediaIds = createdMedia.map((media) => media.id);
    await entity.update(
      { [`${multiField}_ids`]: existingMediaIds },
      { transaction },
    );
  }
};

module.exports = handleMedia;
