const { sequelize } = require('../config/database');
const Project = require('../models/Project');
const Media = require('../models/Media');
const handleMedia = require('../utils/mediaHandler');

// Функция для обработки ошибок
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: error.message });
};

// Получение всех проектов
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    handleError(res, error);
  }
};

// Получение проекта по ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    handleError(res, error);
  }
};

// Создание нового проекта
exports.createProject = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const mediaData = extractMedia(req.files);

    const newProject = await Project.create(req.body, { transaction });
    await handleMedia(
      newProject,
      { singleField: 'cover', multiField: 'screens' },
      mediaData,
      transaction,
    );

    await transaction.commit();
    res.status(201).json(newProject);
  } catch (error) {
    await transaction.rollback();
    handleError(res, error);
  }
};

// Обновление проекта
exports.updateProject = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.update(req.body, { transaction });
    await handleUpdatedMedia(req, project, transaction);

    await transaction.commit();
    res.status(200).json(project);
  } catch (error) {
    await transaction.rollback();
    handleError(res, error);
  }
};

// Удаление проекта
exports.deleteProject = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await handleMediaDeletion(project.cover_id, transaction);
    await handleMediaDeletion(project.screens_ids, transaction);

    await project.destroy({ transaction });
    await transaction.commit();
    res.status(204).send(); // Успешное удаление, но без контента
  } catch (error) {
    await transaction.rollback();
    handleError(res, error);
  }
};

// Обработка удаления медиафайлов
const handleMediaDeletion = async (mediaIds, transaction) => {
  if (Array.isArray(mediaIds) && mediaIds.length) {
    await Media.destroy({ where: { id: mediaIds }, transaction });
  }
};

// Извлечение медиафайлов из запроса
const extractMedia = (files) => ({
  cover: files.find((file) => file.fieldname === 'cover') || null,
  screens: files.filter((file) => file.fieldname.startsWith('screens')),
});

// Обработка обновления медиафайлов
const handleUpdatedMedia = async (req, project, transaction) => {
  const coverFile = req.files.find((file) => file.fieldname === 'cover');
  const screenFiles = req.files.filter((file) =>
    file.fieldname.startsWith('screens'),
  );

  await updateCover(req, project, coverFile, transaction);
  await updateScreens(req, project, screenFiles, transaction);
};

// Обновление обложки проекта
const updateCover = async (req, project, coverFile, transaction) => {
  if (req.body.cover === 'null') {
    await handleMediaDeletion(project.cover_id, transaction);
    await project.update({ cover_id: null }, { transaction });
  } else if (coverFile) {
    await handleMedia(
      project,
      { singleField: 'cover' },
      { cover: coverFile },
      transaction,
    );
    await project.update({ cover_id: coverFile.id }, { transaction });
  }
};

// Обновление экранов проекта
const updateScreens = async (req, project, screenFiles, transaction) => {
  if (req.body.screens === '[]') {
    await handleMediaDeletion(project.screens_ids, transaction);
    await project.update({ screens_ids: [] }, { transaction });
  } else if (screenFiles.length > 0) {
    await handleMedia(
      project,
      { multiField: 'screens' },
      { screens: screenFiles },
      transaction,
    );
    await project.update(
      { screens_ids: screenFiles.map((file) => file.id) },
      { transaction },
    );
  }
};

// Обновление порядка проектов
exports.updateProjectOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const projects = Array.isArray(req.body)
      ? req.body
      : Object.values(req.body).filter(Boolean);

    if (!Array.isArray(projects)) {
      return res
        .status(400)
        .json({ error: 'Invalid data format. Expected an array.' });
    }

    await Promise.all(
      projects.map((project) =>
        Project.update(
          { order_number: project.order_number },
          { where: { id: project.id }, transaction },
        ),
      ),
    );

    await transaction.commit();
    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    await transaction.rollback();
    handleError(res, error);
  }
};
