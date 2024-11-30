const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para el login
router.post('/login', userController.loginUser);

// Ruta para el registro
router.post('/register', userController.registerUser);

module.exports = router;
