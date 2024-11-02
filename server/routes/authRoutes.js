const express = require('express');
const { login, register, logout } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/auth'); // Импортируйте verifyToken
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/check-auth', verifyToken, (req, res) => {
  // Добавьте этот маршрут
  res.status(200).json({ message: 'Authenticated', userId: req.userId });
});

module.exports = router;
