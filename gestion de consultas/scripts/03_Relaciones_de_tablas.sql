## CREACIÓN DE BASE DE DATOS
CREATE DATABASE IF NOT EXISTS comentariosDB
CHARACTER SET utf8mb4
COLLATE utf8mb4_spanish_ci;
USE comentariosDB;

### CREACIÓN DE TABLAS

-- Tabla de comentarios
CREATE TABLE IF NOT EXISTS comentarios (
    identificador INT AUTO_INCREMENT NOT NULL,          -- Identificador único del comentario
    nombre VARCHAR(100) NOT NULL,                      -- Nombre del autor del comentario
    comentario VARCHAR(255) NOT NULL,                  -- Contenido del comentario
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,         -- Fecha y hora de creación del comentario
    CONSTRAINT pk_comentarios PRIMARY KEY (identificador)
) ENGINE=InnoDB;

-- Tabla de respuestas
CREATE TABLE IF NOT EXISTS respuestas (
    identificador INT AUTO_INCREMENT NOT NULL,              -- Identificador único de la respuesta
    comentario_identificador INT NOT NULL,                  -- Referencia al comentario principal
    nombre VARCHAR(100) NOT NULL,                          -- Nombre del autor de la respuesta
    respuesta VARCHAR(255) NOT NULL,                       -- Contenido de la respuesta
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,             -- Fecha y hora de creación de la respuesta
    CONSTRAINT pk_respuestas PRIMARY KEY (identificador),
    CONSTRAINT fk_comentario FOREIGN KEY (comentario_identificador) 
        REFERENCES comentarios (identificador) 
        ON DELETE CASCADE
) ENGINE=InnoDB;

### RELACIONES ENTRE TABLAS
-- Verificamos el motor de almacenamiento
SHOW TABLE STATUS LIKE 'comentarios';
SHOW TABLE STATUS LIKE 'respuestas';

-- Relación de UNO A VARIOS (comentarios y respuestas)
-- Ya se estableció con la clave foránea en la tabla respuestas.

### CONSULTAS PARA LISTAR RELACIONES
-- Verificar las relaciones en la base de datos
SELECT 
    kcu.CONSTRAINT_NAME AS 'Nombre de Relación',
    kcu.REFERENCED_TABLE_NAME AS 'Tabla Padre',
    kcu.REFERENCED_COLUMN_NAME AS 'Primary Key',
    kcu.TABLE_NAME AS 'Tabla Hija',
    kcu.COLUMN_NAME AS 'Foreign Key'
FROM 
    information_schema.KEY_COLUMN_USAGE AS kcu
WHERE 
    kcu.TABLE_SCHEMA = 'comentariosDB' 
    AND kcu.REFERENCED_TABLE_NAME IS NOT NULL;

### CONSULTAS PRÁCTICAS
-- Insertar un comentario
INSERT INTO comentarios (nombre, comentario)
VALUES ('María', '¿Tienen algún contacto para soporte?');

-- Insertar una respuesta
INSERT INTO respuestas (comentario_identificador, nombre, respuesta)
VALUES (1, 'Equipo de soporte', 'Puede escribirnos a soporte@ejemplo.com.');

-- Consultar todos los comentarios con sus respuestas
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

### ELIMINACIÓN DE ELEMENTOS

-- Eliminar una tabla si existe
DROP TABLE IF EXISTS respuestas;

-- Eliminar una base de datos si existe
DROP DATABASE IF EXISTS comentariosDB;
