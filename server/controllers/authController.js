const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Найдите пользователя по email
    const user = await User.findOne({ where: { email } });
    console.log(user); // Проверьте, действительно ли пользователь найден

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Сравните пароль
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Password match: ${isMatch}`); // Выводит результат сравнения

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Создайте токен и отправьте его в куки
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('auth_token');
  res.status(200).json({ message: 'Logout successful' });
};
