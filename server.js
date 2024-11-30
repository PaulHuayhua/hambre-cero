// Accede a la carpeta public/js y actualiza las direcciones IP en los siguientes archivos:
// - En fetchCurrentDate, cambia la IP en la línea 1.
// - En loginManager, cambia las IPs en las líneas 38 y 70.
// - En comments, cambia las IPs en las líneas 7 y 63.

// Luego, ve a la carpeta database y actualiza las credenciales de acceso en ambos archivos JS correspondientes.

const express = require("express");
const cors = require("cors");
const path = require("path");

const calendarRoutes = require("./routes/calendarRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");

const commentController = require('./controllers/commentController');

const app = express();

// Usar las funciones integradas de Express para manejar las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Definir las rutas
app.use('/api', calendarRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

// Ruta para obtener los comentarios
app.get('/comments', commentController.getComments);
app.post('/submit', commentController.submitComment);

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).send('Ruta no encontrada');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
