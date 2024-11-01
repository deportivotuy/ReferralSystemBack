// app.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes'); // Archivo de rutas centralizado

const app = express();

// Configuración del origen según el entorno
const origin = process.env.CLIENT_ORIGIN || 'http://localhost:8080'; // Usa variable de entorno o localhost

// Seguridad y middlewares
app.use(helmet());
app.use(cors({
  origin: origin, // Permitir origen configurado
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));
app.use(express.json());

// Ruta de prueba para verificar conectividad
app.get('/api/health', (req, res) => {
  res.json({ status: 'API funcionando correctamente' });
});

// Rutas
app.use('/api', routes); // Prefijo de ruta común

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
