const mysql = require('mysql2');

const dbConfig = {
    host: 'hambrecero.cjcimec0gf2z.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '12345paul6789', // Cambié 'pass' a 'password'
};

const connectionCalendar = mysql.createConnection({
    ...dbConfig,
    database: 'calendar'
});

const connectionLogin = mysql.createConnection({
    ...dbConfig,
    database: 'logindb'
});

connectionCalendar.connect(function (err) {
    if (err) {
        console.log('Error al conectar a calendar: ' + err.stack);
        return;
    }
    console.log('Conexion exitosa a calendar');
});

connectionLogin.connect(function (err) {
    if (err) {
        console.error('Error al conectar a logindb: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a logindb');
});


module.exports = {
    connectionCalendar,
    connectionLogin
};
