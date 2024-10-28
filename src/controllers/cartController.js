const pool = require('../config/db');

// Crear o agregar producto al carrito
exports.addItemToCart = async (req, res) => {
  const { usuario_id, producto_id, cantidad, tamano_id, tipo_leche_id } = req.body;
  try {
    let carrito = await pool.query(`SELECT id FROM carritos WHERE usuario_id = $1`, [usuario_id]);
    let carritoId;
    if (carrito.rows.length === 0) {
      const nuevoCarrito = await pool.query(`INSERT INTO carritos (usuario_id) VALUES ($1) RETURNING id`, [usuario_id]);
      carritoId = nuevoCarrito.rows[0].id;
    } else {
      carritoId = carrito.rows[0].id;
    }

    await pool.query(
      `INSERT INTO carrito_items (carrito_id, producto_id, cantidad, tamano_id, tipo_leche_id) 
       VALUES ($1, $2, $3, $4, $5)`,
      [carritoId, producto_id, cantidad, tamano_id, tipo_leche_id]
    );
    res.json({ message: 'Producto añadido al carrito', carritoId });
  } catch (err) {
    res.status(500).json({ error: 'Error al añadir producto al carrito' });
  }
};
