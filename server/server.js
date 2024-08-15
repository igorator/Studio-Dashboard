const express = require('express');
const { connectDB } = require('./database');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

app.use(express.json());

connectDB();

const syncModels = async () => {
  try {
    await require('./models/Project').sequelize.sync({ alter: true });
    await require('./models/Offer').sequelize.sync({ alter: true });
    await require('./models/TeamMember').sequelize.sync({ alter: true });
    await require('./models/User').sequelize.sync({ alter: true });
    console.log('Models synchronized');
  } catch (err) {
    console.error('Failed to synchronize models:', err.message);
  }
};

syncModels();

app.use('/projects', projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
