-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS comentariosDB;

-- Usar la base de datos
USE comentariosDB;

-- Crear la tabla de comentarios
CREATE TABLE IF NOT EXISTS comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Identificador único del comentario
    nombre VARCHAR(100) NOT NULL,             -- Nombre del autor del comentario
    comentario TEXT NOT NULL,                 -- Contenido del comentario
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha y hora de creación del comentario
);

-- Crear la tabla de respuestas
CREATE TABLE IF NOT EXISTS respuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Identificador único de la respuesta
    comentario_id INT NOT NULL,               -- Referencia al comentario principal
    nombre VARCHAR(100) NOT NULL,             -- Nombre del autor de la respuesta
    respuesta TEXT NOT NULL,                  -- Contenido de la respuesta
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- Fecha y hora de creación de la respuesta
    FOREIGN KEY (comentario_id) REFERENCES comentarios(id) ON DELETE CASCADE
);

-- Insertar datos en la tabla comentarios
INSERT INTO comentarios (nombre, comentario)
VALUES ('Juan', '¿Cuál es el horario de atención?');

-- Insertar datos en la tabla respuestas
INSERT INTO respuestas (comentario_id, nombre, respuesta)
VALUES (1, 'Soporte', 'El horario de atención es de lunes a viernes, de 9 AM a 6 PM.');

-- Consultar los comentarios y sus respuestas (ordenados por fecha de comentario y respuesta)
SELECT c.id AS comentario_id, c.nombre AS autor_comentario, c.comentario, c.fecha AS fecha_comentario, 
       r.id AS respuesta_id, r.nombre AS autor_respuesta, r.respuesta, r.fecha AS fecha_respuesta
FROM comentarios c
LEFT JOIN respuestas r ON c.id = r.comentario_id
ORDER BY c.fecha, r.fecha;

-- Consultar los comentarios y sus respuestas (ordenados por fecha más reciente)
SELECT c.id AS comentario_id, c.nombre AS autor_comentario, c.comentario, c.fecha AS fecha_comentario, 
       r.id AS respuesta_id, r.nombre AS autor_respuesta, r.respuesta, r.fecha AS fecha_respuesta
FROM comentarios c
LEFT JOIN respuestas r ON c.id = r.comentario_id
ORDER BY c.fecha DESC, r.fecha DESC; -- Los más recientes primero

-- Consultar todos los registros de ambas tablas sin unir (sin JOIN)
SELECT * 
FROM comentarios, respuestas;
