// controller/subzonasController.js
const connection = require("./dbConnection");

exports.getAllSubzonasByZona = function (zona_id) {
  const query = "SELECT * FROM subzonas WHERE zona_id = ? ORDER BY nombre ASC";
  return connection
    .query(query, [zona_id])
    .then(([results]) => {
      console.log(`Resultados para zona_id=${zona_id}:`, results);
      return results;
    })
    .catch((error) => {
      console.error("Error al obtener las subzonas:", error);
      throw new Error(`Error al obtener las subzonas: ${error.message}`);
    });
};
