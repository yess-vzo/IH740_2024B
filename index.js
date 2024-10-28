const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Configurar el middleware
app.use(cors());
app.use(express.json());

// Importar las rutas de los endpoints
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

app.use((req, res, next) => {
    console.log(`Solicitud recibida en: ${req.method} ${req.url}`);
    next();
  });
  
// Usar las rutas
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
