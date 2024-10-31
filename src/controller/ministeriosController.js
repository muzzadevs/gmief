const connection = require("./dbConnection");

exports.getAllMinisteriosByIglesia = function (iglesia_id) {
  const query = `
    SELECT * FROM ministerios
    WHERE iglesia_id = ?
    ORDER BY nombre ASC
  `;

  return connection
    .query(query, [iglesia_id])
    .then(([results]) => {
      console.log(`Resultados para iglesia_id=${iglesia_id}:`, results);
      return results;
    })
    .catch((error) => {
      console.error("Error al obtener los ministerios de la iglesia:", error);
      throw new Error(`Error al obtener los ministerios: ${error.message}`);
    });
};
