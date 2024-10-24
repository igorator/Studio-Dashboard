const { sequelize } = require('../config/database');
const Project = require('../models/Project');
const Media = require('../models/Media');
const handleMedia = require('../utils/mediaHandler');

// Создание нового проекта

// Получение всех проектов
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};

exports.createProject = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const mediaData = {
      cover: req.files.find((file) => file.fieldname === 'cover') || null,
      screens: req.files
        .filter((file) => file.fieldname.startsWith('screens'))
        .map((file) => file),
    };

    const newProject = await Project.create(
      {
        title_eng: req.body.title_eng,
        description_eng: req.body.description_eng,
        title_ua: req.body.title_ua,
        description_ua: req.body.description_ua,
        isOnSite: req.body.isOnSite,
        isOnHeroSlider: req.body.isOnHeroSlider,
      },
      { transaction },
    );

    // Вызов handleMedia с mediaData
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
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
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

    // Обновляем основные поля проекта
    await project.update(req.body, { transaction });

    // Формируем mediaData из req.files
    const coverFile = req.files.find((file) => file.fieldname === 'cover');
    const screenFiles = req.files
      .filter((file) => file.fieldname.startsWith('screens'))
      .map((file) => file);

    if (req.body.cover === 'null') {
      if (project.cover) {
        console.log(`Deleting cover media: ${project.cover}`);
        await Media.destroy({ where: { id: project.cover.id } });
      }
      await project.update({ cover_id: null }, { transaction });
    } else if (coverFile) {
      await handleMedia(
        project,
        { singleField: 'cover' },
        { cover: coverFile },
        transaction,
      );
      await project.update({ cover_id: coverFile.id }, { transaction }); // обновляем cover_id
    }

    // Обработка поля screens
    if (req.body.screens === '[]') {
      if (project.screens) {
        console.log(project.screens);
        console.log(`Deleting screens media: ${project.screens}`);
        await Media.destroy({
          where: { id: project.screens.map((screen) => screen.id) },
        });
      }
      await project.update({ screens_ids: [] }, { transaction });
    } else if (screenFiles.length > 0) {
      console.log(screenFiles);
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

    await transaction.commit();
    res.status(200).json(project);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
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

    // Удаление медиа, связанных с проектом, если необходимо
    if (project.cover_id) {
      await Media.destroy({ where: { id: project.cover_id }, transaction });
    }
    if (project.screens_ids && project.screens_ids.length > 0) {
      await Media.destroy({ where: { id: project.screens_ids }, transaction });
    }

    await project.destroy({ transaction });
    await transaction.commit();
    res.status(204).send(); // Успешное удаление, но без контента
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

exports.updateProjectOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    let projects = req.body;

    console.log('Received projects:', JSON.stringify(projects));

    if (!Array.isArray(projects) && typeof projects === 'object') {
      const projectArray = Object.values(projects).filter(
        (item) => typeof item === 'object' && item !== null,
      );
      console.log('Converted projects to array:', JSON.stringify(projectArray));
      projects = projectArray;
    }

    if (!Array.isArray(projects)) {
      return res
        .status(400)
        .json({ error: 'Invalid data format. Expected an array.' });
    }

    for (const project of projects) {
      await Project.update(
        { order_number: project.order_number },
        { where: { id: project.id }, transaction },
      );
    }

    await transaction.commit();
    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating project order:', error);
    res.status(500).json({ error: 'Failed to update project order' });
  }
};
