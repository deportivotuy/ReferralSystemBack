// app.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // Importa cors
const routes = require('./routes'); // Archivo de rutas centralizado

const app = express();
const origin = `http://localhost:8080`; // Local


// Seguridad y middlewares
app.use(helmet());
app.use(cors({ 
  origin: origin, // Permitir solo este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));
app.use(express.json());

// Rutas
app.use('/api', routes); // Prefijo de ruta común

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  //console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
