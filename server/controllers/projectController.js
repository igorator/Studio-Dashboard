const Project = require('../models/Project');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProject = async (req, res) => {
  console.log(req);
  try {
    const projectData = {
      title_eng: req.body.title_eng,
      description_eng: req.body.description_eng,
      title_ua: req.body.title_ua,
      description_ua: req.body.description_ua,
      cover: req.body.cover,
      screens: req.body.screens,
      social_urls: req.body.social_urls,
      isShowedOnSite: req.body.isShowedOnSite,
      isOnHeroSlider: req.body.isOnHeroSlider,
    };

    const project = await Project.create(projectData);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const [updated] = await Project.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProject = await Project.findByPk(req.params.id);
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: 'Project deleted' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
