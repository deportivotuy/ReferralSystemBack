const express = require('express');
const userRoutes = require('./userRoutes');
//const productRoutes = require('./productRoutes');
//const orderRoutes = require('./orderRoutes');

const router = express.Router();

router.use('/users', userRoutes);
//router.use('/products', productRoutes);
//router.use('/orders', orderRoutes);

module.exports = router; 
