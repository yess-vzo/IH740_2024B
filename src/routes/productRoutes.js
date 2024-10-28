// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para obtener opciones de personalización
router.get('/personalizacion', productController.getPersonalizationOptions);

// Ruta para obtener productos por categoría
router.get('/:categoria', productController.getProductsByCategory);

module.exports = router;
