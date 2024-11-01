const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const functionGlobal = require('../functionGlobal');

/////
exports.registerUser = async (req, res) => {
  console.log('Entro en registerUser');
  
  let connection;
  try {
    const { username, email, password } = req.body;
    
    // Validar resultados de la validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    
    // Conectar a la base de datos
    connection = await db.getConnection();

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar usuario en la base de datos
    const [result] = await connection.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
      [username, email, hashedPassword]
    );
    res.status(201).json({ id: result.insertId, username, email });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).json({ message: 'Error al registrar usuario' });
  } finally {
    if (connection) connection.release(); // Liberar conexión
  }
};

/////
exports.loginUser = async (req, res) => {
  
  console.log('Entro en loginUser');

  let connection;
  try {
    // Validar resultados de la validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    
    const { username, password } = req.body;
    
    // Conectar a la base de datos
    connection = await db.getConnection();

    // Verificar si el usuario existe
    const [rows] = await connection.query('SELECT * FROM users WHERE username = ?',[username]);
    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = rows[0];

    // Comparar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Password incorrect' });

    // Validar el estatus de la cuenta
    if (user.is_active === 0) return res.status(401).json({ message: 'User inactive' });

    // Crear y enviar token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Login errors:', err);
    res.status(500).json({ message: 'Login errors' });
  } finally {
    if (connection) connection.release(); // Liberar conexión
  }
};
