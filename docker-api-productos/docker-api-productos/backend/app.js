// backend/app.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ---- helpers ---------------------------------------------------------------
function isNumber(n) {
  return typeof n === 'number' && !Number.isNaN(n);
}
function coalesceText(v) {
  // Acepta string vacío como NULL para campos opcionales
  return (v === undefined || v === null || String(v).trim() === '') ? null : String(v);
}

// ---- rutas -----------------------------------------------------------------
app.get('/', (_req, res) => {
  res.send('API-REST PRODUCTOS is running...');
});

// Listar todos los productos
app.get('/productos', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM productos ORDER BY id ASC');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear producto
app.post('/productos', async (req, res) => {
  try {
    const {
      nombre,
      precio,
      descripcion,
      marca,
      categoria
    } = req.body;

    if (!nombre || precio === undefined) {
      return res.status(400).json({ error: 'Los campos nombre y precio son obligatorios.' });
    }
    const precioNum = Number(precio);
    if (!isNumber(precioNum)) {
      return res.status(400).json({ error: 'precio debe ser numérico.' });
    }

    const result = await pool.query(
      `INSERT INTO productos (nombre, precio, descripcion, marca, categoria)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        String(nombre),
        precioNum,
        coalesceText(descripcion),
        coalesceText(marca),
        coalesceText(categoria)
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar producto
app.put('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      precio,
      descripcion,
      marca,
      categoria
    } = req.body;

    if (!nombre || precio === undefined) {
      return res.status(400).json({ error: 'Los campos nombre y precio son obligatorios.' });
    }
    const precioNum = Number(precio);
    if (!isNumber(precioNum)) {
      return res.status(400).json({ error: 'precio debe ser numérico.' });
    }

    const result = await pool.query(
      `UPDATE productos
         SET nombre = $1,
             precio = $2,
             descripcion = $3,
             marca = $4,
             categoria = $5
       WHERE id = $6
       RETURNING *`,
      [
        String(nombre),
        precioNum,
        coalesceText(descripcion),
        coalesceText(marca),
        coalesceText(categoria),
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar producto
app.delete('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM productos WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Detalle de un producto (campos específicos)
app.get('/productos/:id/detalle', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, nombre, precio, descripcion, marca, categoria
         FROM productos
        WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---- servidor --------------------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API-REST PRODUCTOS running on port ${PORT}`);
});
