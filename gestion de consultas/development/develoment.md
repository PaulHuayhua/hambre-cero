# Documentación para Base de Datos **comentariosDB**

## Índice

1. [Descripción General](#descripción-general)
2. [Gestión de la Base de Datos](#gestión-de-la-base-de-datos)
   - [Crear Base de Datos](#crear-base-de-datos)
   - [Seleccionar Base de Datos](#seleccionar-base-de-datos)
   - [Estructura de Tablas](#estructura-de-tablas)
   - [Inserción de Datos](#inserción-de-datos)
   - [Consultas](#consultas)
   - [Eliminación de Base de Datos](#eliminación-de-base-de-datos)

---

## Descripción General

1. La base de datos **comentariosDB** está diseñada para gestionar comentarios y sus respectivas respuestas.
2. Es ideal para plataformas que requieran interacción entre usuarios mediante un sistema de preguntas y respuestas.
3. Estructura clave:
   - **Tabla de comentarios**: almacena las preguntas o comentarios iniciales.
   - **Tabla de respuestas**: almacena las respuestas asociadas a cada comentario.

---

## Gestión de la Base de Datos

### Crear Base de Datos

1. Sintaxis para crear la base de datos:

```sql
CREATE DATABASE comentariosDB;
```

2. Definir el conjunto de caracteres y collation (opcional):

```sql
CREATE DATABASE IF NOT EXISTS comentariosDB
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;
```

---

### Seleccionar Base de Datos

1. Para trabajar con la base de datos recién creada:

```sql
USE comentariosDB;
```

---

### Estructura de Tablas

#### Tabla de comentarios

1. **Descripción**: Almacena los comentarios iniciales.
2. **Estructura**:

```sql
CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Identificador único del comentario
    nombre VARCHAR(100) NOT NULL,             -- Nombre del autor del comentario
    comentario TEXT NOT NULL,                 -- Contenido del comentario
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha y hora de creación del comentario
);
```

---

#### Tabla de respuestas

1. **Descripción**: Almacena respuestas asociadas a los comentarios.
2. **Estructura**:

```sql
CREATE TABLE respuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Identificador único de la respuesta
    comentario_id INT NOT NULL,               -- Referencia al comentario principal
    nombre VARCHAR(100) NOT NULL,             -- Nombre del autor de la respuesta
    respuesta TEXT NOT NULL,                  -- Contenido de la respuesta
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- Fecha y hora de creación de la respuesta
    FOREIGN KEY (comentario_id) REFERENCES comentarios(id) ON DELETE CASCADE
);
```

---

### Inserción de Datos

#### Insertar un comentario

```sql
INSERT INTO comentarios (nombre, comentario)
VALUES ('Juan', '¿Cuál es el horario de atención?');
```

#### Insertar una respuesta asociada

```sql
INSERT INTO respuestas (comentario_id, nombre, respuesta)
VALUES (1, 'Soporte', 'Nuestro horario es de 9 AM a 6 PM.');
```

---

### Consultas

#### Listar comentarios y respuestas asociadas

```sql
SELECT c.id AS comentario_id,
       c.nombre AS autor_comentario,
       c.comentario,
       c.fecha AS fecha_comentario,
       r.id AS respuesta_id,
       r.nombre AS autor_respuesta,
       r.respuesta,
       r.fecha AS fecha_respuesta
FROM comentarios c
LEFT JOIN respuestas r
ON c.id = r.comentario_id
ORDER BY c.fecha, r.fecha;
```

#### Ordenar los comentarios y respuestas más recientes primero

```sql
SELECT c.id AS comentario_id,
       c.nombre AS autor_comentario,
       c.comentario,
       c.fecha AS fecha_comentario,
       r.id AS respuesta_id,
       r.nombre AS autor_respuesta,
       r.respuesta,
       r.fecha AS fecha_respuesta
FROM comentarios c
LEFT JOIN respuestas r
ON c.id = r.comentario_id
ORDER BY c.fecha DESC, r.fecha DESC;
```

#### Listar todos los comentarios y respuestas

```sql
SELECT * FROM comentarios, respuestas;
```

---

### Eliminación de Base de Datos

1. **Antes de eliminar**:
   - Asegúrese de que la base de datos no está en uso.

```sql
USE another_database; -- Cambiar a una base de datos diferente
```

2. **Eliminar la base de datos**:

```sql
DROP DATABASE comentariosDB;
```

3. **Verificar eliminación**:

```sql
SHOW DATABASES;
```

---
