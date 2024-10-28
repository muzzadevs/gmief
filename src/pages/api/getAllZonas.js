// pages/api/getAllZonas.js

const { getAllZonas } = require('../../controller/zonasController');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Solo se permiten solicitudes GET' });
  }

  try {
    const zonas = await getAllZonas();
    res.status(200).json(zonas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
