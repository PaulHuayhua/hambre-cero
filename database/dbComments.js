const mysql = require('mysql2');

const dbConfig = {
    host: 'hambrecero.cjcimec0gf2z.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '12345paul6789',
    database: 'comentariosDB',
};

const connectionComments = mysql.createConnection(dbConfig);

connectionComments.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err.message);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

module.exports = connectionComments;
