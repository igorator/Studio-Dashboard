const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./config/database');
const projectRoutes = require('./routes/projectRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const offerRoutes = require('./routes/offerRoutes');
const teamRoutes = require('./routes/teamRoutes');
const leadRoutes = require('./routes/leadRoutes');
const { formDataHandler } = require('./middlewares/formDataHandler');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://www.3mpq.com'],
    credentials: true,
  }),
);
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(cookieParser());

// Подключение к БД
connectDB();

// Синхронизация моделей
const syncModels = async () => {
  try {
    await require('./models/Project').sequelize.sync({ alter: true });
    await require('./models/Offer').sequelize.sync({ alter: true });
    await require('./models/TeamMember').sequelize.sync({ alter: true });
    await require('./models/User').sequelize.sync({ alter: true });
    await require('./models/Media').sequelize.sync({ alter: true });
    console.log('Models synchronized');
  } catch (err) {
    console.error('Failed to synchronize models:', err.message);
  }
};

syncModels();

// Роуты
app.use('/auth', authRoutes); // Роуты для аутентификации
app.use('/projects', formDataHandler(), projectRoutes);
app.use('/team', formDataHandler(), teamRoutes);
app.use('/offers', formDataHandler(), offerRoutes);
app.use('/leads', formDataHandler(), leadRoutes);
app.use('/media', mediaRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
