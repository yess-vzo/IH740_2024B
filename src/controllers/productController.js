const pool = require('../config/db');

// Obtener productos por categoría
const pool = require('../config/db');

exports.getProductsByCategory = async (req, res) => {
  const categoria = req.params.categoria;
  try {
    const result = await pool.query(`
      SELECT p.id, p.nombre, p.descripcion, p.precio 
      FROM productos p 
      JOIN categorias c ON p.categoria_id = c.id 
      WHERE c.nombre = $1
    `, [categoria]);
    
    console.log('Resultado de la consulta:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener productos por categoría:', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Obtener opciones de personalización
exports.getPersonalizationOptions = async (req, res) => {
  console.log('Entrando a getPersonalizationOptions'); // Para confirmar que el endpoint es alcanzado
  try {
    const tamanos = await pool.query(`SELECT * FROM tamanos`);
    console.log('Tamaños obtenidos:', tamanos.rows); // Verifica que la consulta se ejecute

    const tiposLeche = await pool.query(`SELECT * FROM tipos_leche`);
    console.log('Tipos de Leche obtenidos:', tiposLeche.rows); // Verifica que la consulta se ejecute

    const extras = await pool.query(`SELECT * FROM extras`);
    console.log('Extras obtenidos:', extras.rows); // Verifica que la consulta se ejecute

    res.json({
      tamanos: tamanos.rows,
      tiposLeche: tiposLeche.rows,
      extras: extras.rows
    });
  } catch (err) {
    console.error('Error al obtener opciones de personalización:', err);
    res.status(500).json({ error: 'Error al obtener opciones de personalización' });
  }
};
