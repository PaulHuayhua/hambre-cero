## CREACIÓN DE BASE DE DATOS
CREATE DATABASE IF NOT EXISTS comentariosDB
CHARACTER SET utf8mb4
COLLATE utf8mb4_spanish_ci;
USE comentariosDB;

## CREACIÓN DE TABLAS
# Tabla de comentarios
CREATE TABLE comentarios (
    identificador INT AUTO_INCREMENT NOT NULL,          -- Identificador único del comentario
    nombre VARCHAR(100) NOT NULL,                      -- Nombre del autor del comentario
    comentario VARCHAR(255) NOT NULL,                  -- Contenido del comentario
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,         -- Fecha y hora de creación del comentario
    CONSTRAINT pk_comentarios PRIMARY KEY (identificador)
) ENGINE=InnoDB;

# Tabla de respuestas
CREATE TABLE respuestas (
    identificador INT AUTO_INCREMENT NOT NULL,          -- Identificador único de la respuesta
    comentario_identificador INT NOT NULL,              -- Referencia al comentario principal
    nombre VARCHAR(100) NOT NULL,                      -- Nombre del autor de la respuesta
    respuesta VARCHAR(255) NOT NULL,                   -- Contenido de la respuesta
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,         -- Fecha y hora de creación de la respuesta
    CONSTRAINT pk_respuestas PRIMARY KEY (identificador),
    CONSTRAINT fk_comentario FOREIGN KEY (comentario_identificador) REFERENCES comentarios (identificador) ON DELETE CASCADE
) ENGINE=InnoDB;

## INSERTAR DATOS
-- Inserta un comentario
INSERT INTO comentarios (nombre, comentario)
VALUES ('Juan', '¿Cuál es el horario de atención?');

-- Inserta una respuesta al comentario
INSERT INTO respuestas (comentario_identificador, nombre, respuesta)
VALUES (1, 'Soporte', 'Atendemos de lunes a viernes de 9 AM a 5 PM.');

## CONSULTAS
-- Consulta de todos los comentarios y sus respuestas
SELECT 
    c.identificador AS comentario_id, 
    c.nombre AS autor_comentario, 
    c.comentario, 
    c.fecha AS fecha_comentario,
    r.identificador AS respuesta_id, 
    r.nombre AS autor_respuesta, 
    r.respuesta, 
    r.fecha AS fecha_respuesta
FROM comentarios c
LEFT JOIN respuestas r ON c.identificador = r.comentario_identificador
ORDER BY c.fecha DESC, r.fecha DESC;

## GESTIÓN DE TABLAS
-- Ver todas las tablas en la base de datos
SHOW TABLES;

-- Ver la estructura de una tabla
DESCRIBE comentarios;

-- Agregar columna a tabla
ALTER TABLE comentarios
ADD COLUMN estado CHAR(1) DEFAULT 'A';

-- Modificar columna de tabla
ALTER TABLE comentarios
MODIFY COLUMN comentario VARCHAR(500);

-- Eliminar columna de tabla
ALTER TABLE respuestas
DROP COLUMN estado;

-- Eliminar tabla si existe
DROP TABLE IF EXISTS respuestas;
