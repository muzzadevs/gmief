// controller/iglesiasController.js
const connection = require("./dbConnection");

exports.getAllIglesias = function () {
  return connection
    .query("SELECT * FROM iglesias")
    .then(([results]) => {
      console.log("Resultados de la consulta de iglesias:", results);
      return results;
    })
    .catch((error) => {
      console.error("Error al obtener las iglesias:", error);
      throw new Error(`Error al obtener las iglesias: ${error.message}`);
    });
};

exports.getAllIglesiasBySubzona = function (subzona_id) {
  const query =
    "SELECT * FROM iglesias WHERE subzona_id = ? ORDER BY nombre ASC";
  return connection
    .query(query, [subzona_id])
    .then(([results]) => {
      console.log(`Resultados para subzona_id=${subzona_id}:`, results);
      return results;
    })
    .catch((error) => {
      console.error("Error al obtener iglesias de la subzona:", error);
      throw new Error(
        `Error al obtener iglesias de la subzona: ${error.message}`
      );
    });
};

exports.getAllIglesiasByZona = function (zona_id) {
  const query = `
    SELECT iglesias.*
    FROM iglesias
    JOIN subzonas ON iglesias.subzona_id = subzonas.id
    JOIN zonas ON subzonas.zona_id = zonas.id
    WHERE zonas.id = ?
    ORDER BY iglesias.nombre ASC
  `;
  return connection
    .query(query, [zona_id])
    .then(([results]) => {
      console.log(`Resultados para zona_id=${zona_id}:`, results);
      return results;
    })
    .catch((error) => {
      console.error("Error al obtener iglesias de la zona:", error);
      throw new Error(`Error al obtener iglesias de la zona: ${error.message}`);
    });
};
