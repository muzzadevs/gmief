const connection = require("./dbConnection");

exports.getAllMinisteriosByIglesia = async function (iglesia_id) {
  try {
    // Consulta principal para obtener ministerios con el nombre del estado
    const ministeriosQuery = `
      SELECT ministerios.*, estados.nombre AS estado_nombre
      FROM ministerios
      JOIN estados ON ministerios.estado_id = estados.id
      WHERE ministerios.iglesia_id = ?
      ORDER BY ministerios.nombre ASC
    `;

    const [ministerios] = await connection.query(ministeriosQuery, [
      iglesia_id,
    ]);

    // Para cada ministerio, obtener sus cargos y añadirlos como un array
    for (const ministerio of ministerios) {
      const cargosQuery = `
        SELECT cargos.cargo
        FROM ministerio_cargo
        JOIN cargos ON ministerio_cargo.cargo_id = cargos.id
        WHERE ministerio_cargo.ministerio_id = ?
      `;
      const [cargos] = await connection.query(cargosQuery, [ministerio.id]);

      // Añadir los cargos como un array en el ministerio actual
      ministerio.cargos = cargos.map((cargo) => cargo.cargo);
    }

    console.log(`Resultados para iglesia_id=${iglesia_id}:`, ministerios);
    return ministerios;
  } catch (error) {
    console.error("Error al obtener los ministerios de la iglesia:", error);
    throw new Error(`Error al obtener los ministerios: ${error.message}`);
  }
};
