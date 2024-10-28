const { getAllIglesias } = require('../../controller/iglesiasController');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Solo se permiten solicitudes GET' });
  }

  try {
    const iglesias = await getAllIglesias();
    res.status(200).json(iglesias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
