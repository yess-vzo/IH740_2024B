const pool = require('../config/db');

// Confirmar un pedido
exports.placeOrder = async (req, res) => {
  const { usuario_id, carrito_id, fecha_recoleccion } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO pedidos (usuario_id, carrito_id, fecha_recoleccion) 
       VALUES ($1, $2, $3) RETURNING id`,
      [usuario_id, carrito_id, fecha_recoleccion]
    );
    res.json({ message: 'Pedido realizado', pedidoId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: 'Error al realizar pedido' });
  }
};
