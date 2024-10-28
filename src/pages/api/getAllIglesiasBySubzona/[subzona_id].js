// src/pages/api/getAllIglesiasBySubzona/[subzona_id].js

const { getAllIglesiasBySubzona } = require('../../../controller/iglesiasController');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Solo se permiten solicitudes GET' });
  }

  const { subzona_id } = req.query;

  if (!subzona_id) {
    return res.status(400).json({ message: 'El parámetro subzona_id es requerido' });
  }

  try {
    const iglesias = await getAllIglesiasBySubzona(subzona_id);
    res.status(200).json(iglesias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
