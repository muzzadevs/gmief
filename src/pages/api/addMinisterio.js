
import { addMinisterio } from "../../controller/ministeriosController";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Solo se permiten solicitudes POST" });
    }

    const { nombre, apellidos, alias, codigo, aprob, telefono, email, iglesia_id, estado_id } = req.body;

    if (!nombre || !apellidos || !codigo || !aprob || !iglesia_id || !estado_id) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    try {
        const result = await addMinisterio({ nombre, apellidos, alias, codigo, aprob, telefono, email, iglesia_id, estado_id });
        res.status(201).json(result);
    } catch (error) {
        console.error("Error al añadir el ministerio:", error);
        res.status(500).json({ message: "Error al añadir el ministerio" });
    }
}
