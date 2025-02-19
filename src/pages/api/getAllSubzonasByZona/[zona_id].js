// src/pages/api/getAllSubzonasByZona/[zona_id].js

const { getAllSubzonasByZona } = require('../../../controller/subzonasController');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Solo se permiten solicitudes GET' });
  }

  const { zona_id } = req.query;

  if (!zona_id) {
    return res.status(400).json({ message: 'El parámetro zona_id es requerido' });
  }

  try {
    const subzonas = await getAllSubzonasByZona(zona_id);
    res.status(200).json(subzonas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
