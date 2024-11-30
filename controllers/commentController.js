const connectionComments = require('../database/dbComments');

// Obtener comentarios y sus respuestas
const getComments = (req, res) => {
    const queryComments = `
    SELECT c.id AS comentario_id, c.nombre AS autor_comentario, c.comentario, c.fecha AS fecha_comentario,
           r.id AS respuesta_id, r.nombre AS autor_respuesta, r.respuesta, r.fecha AS fecha_respuesta
    FROM comentarios c
    LEFT JOIN respuestas r ON c.id = r.comentario_id
    ORDER BY c.fecha DESC, r.fecha ASC;
    `;

    connectionComments.query(queryComments, (err, results) => { 
        if (err) {
            console.error("Error al obtener comentarios:", err.message);
            return res.status(500).json({ success: false, message: "Error al obtener los comentarios." });
        }

        const commentsMap = new Map();

        results.forEach((row) => {
            if (!commentsMap.has(row.comentario_id)) {
                commentsMap.set(row.comentario_id, {
                    id: row.comentario_id,
                    nombre: row.autor_comentario,
                    comentario: row.comentario,
                    fecha: row.fecha_comentario,
                    replies: [],
                });
            }

            if (row.respuesta_id) {
                commentsMap.get(row.comentario_id).replies.push({
                    id: row.respuesta_id,
                    nombre: row.autor_respuesta,
                    respuesta: row.respuesta,
                    fecha: row.fecha_respuesta,
                });
            }
        });

        // Convertir el Map a un Array y devolver la respuesta
        res.json(Array.from(commentsMap.values()));
    });
};

// Insertar un comentario
const submitComment = (req, res) => {
    const { nombre, comentario } = req.body;

    // Validar los datos recibidos
    if (!nombre || nombre.trim().length < 2) {
        return res
            .status(400)
            .json({ success: false, message: "El nombre debe tener al menos 2 caracteres." });
    }

    if (!comentario || comentario.trim().length < 5) {
        return res
            .status(400)
            .json({ success: false, message: "El comentario debe tener al menos 5 caracteres." });
    }

    console.log("Datos recibidos:", { nombre, comentario });

    // Insertar el comentario en la base de datos
    connectionComments.query(  // Asegúrate de usar connectionComments
        "INSERT INTO comentarios (nombre, comentario) VALUES (?, ?)",
        [nombre, comentario],
        (err, result) => {
            if (err) {
                console.error("Error al insertar comentario:", err); 
                return res.status(500).json({ success: false, message: "Error al enviar el comentario.", error: err.message });
            }
            console.log("Comentario insertado con éxito", result);
            res.json({ success: true, message: "Comentario enviado con éxito." });
        }
    );
};

module.exports = { getComments, submitComment };
