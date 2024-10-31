import { getAllMinisteriosByIglesia } from "../../../controller/ministeriosController";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Solo se permiten solicitudes GET" });
  }

  const { iglesia_id } = req.query;

  if (!iglesia_id) {
    return res.status(400).json({ message: "El ID de la iglesia es requerido" });
  }

  try {
    const ministerios = await getAllMinisteriosByIglesia(iglesia_id);
    res.status(200).json(ministerios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
