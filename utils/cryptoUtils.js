const crypto = require('crypto');

exports.hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hash };
};

exports.verifyPassword = (storedPassword, enteredPassword) => {
    const [storedSalt, storedHash] = storedPassword.split('$');
    const hash = crypto.pbkdf2Sync(enteredPassword, storedSalt, 1000, 64, 'sha512').toString('hex');
    return hash === storedHash;
};
