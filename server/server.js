const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const projectRoutes = require('./routes/projectRoutes');
const { formDataHandler } = require('./middlewares/formDataHandler');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://www.3mpq.com'],
  }),
);

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

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

app.use('/projects', formDataHandler(), projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
