const { connectionLogin } = require('../database/dbConnections');
const { hashPassword } = require('../utils/cryptoUtils');

exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    console.log('Intentando iniciar sesión con:', { email, password });

    connectionLogin.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).send('Error en el servidor');
        }
        if (results.length > 0) {
            // Verifica el hash de la contraseña
            res.send('Inicio de sesión exitoso');
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    });
};

exports.registerUser = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('Faltan campos requeridos');
    }
   // cryptoUtils
    const { salt, hash } = hashPassword(password);
    const user = { username, email, password: `${salt}$${hash}` };

    connectionLogin.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error al registrar el usuario');
        } else {
            res.status(201).send('Usuario registrado con éxito');
        }
    });
};
