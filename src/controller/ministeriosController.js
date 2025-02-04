import connection from "./dbConnection";

export const getAllMinisteriosByIglesia = async (iglesia_id) => {
  try {
    const ministeriosQuery = `
      SELECT ministerios.*, estados.nombre AS estado_nombre
      FROM ministerios
      JOIN estados ON ministerios.estado_id = estados.id
      WHERE ministerios.iglesia_id = ?
      ORDER BY ministerios.nombre ASC
    `;

    const [ministerios] = await connection.query(ministeriosQuery, [iglesia_id]);

    for (const ministerio of ministerios) {
      const cargosQuery = `
        SELECT cargos.cargo
        FROM ministerio_cargo
        JOIN cargos ON ministerio_cargo.cargo_id = cargos.id
        WHERE ministerio_cargo.ministerio_id = ?
      `;
      const [cargos] = await connection.query(cargosQuery, [ministerio.id]);
      ministerio.cargos = cargos.map((cargo) => cargo.cargo);
    }

    console.log(`Resultados para iglesia_id=${iglesia_id}:`, ministerios);
    return ministerios;
  } catch (error) {
    console.error("Error al obtener los ministerios de la iglesia:", error);
    throw new Error(`Error al obtener los ministerios: ${error.message}`);
  }
};

export const addMinisterio = async ({ nombre, apellidos, alias, codigo, aprob, telefono, email, iglesia_id, estado_id }) => {
  if (!nombre || !apellidos || !codigo || !aprob || !iglesia_id || !estado_id) {
    throw new Error("Faltan campos obligatorios");
  }

  try {
    const query = `
      INSERT INTO ministerios (nombre, apellidos, alias, codigo, aprob, telefono, email, iglesia_id, estado_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [nombre, apellidos, alias, codigo, aprob, telefono, email, iglesia_id, estado_id];

    const [result] = await connection.query(query, values);
    return { id: result.insertId, message: "Ministerio añadido correctamente" };
  } catch (error) {
    console.error("Error al añadir el ministerio:", error);
    throw new Error("Error al añadir el ministerio");
  }
};
