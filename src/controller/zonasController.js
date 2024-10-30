// controller/zonasController.js
const connection = require("./dbConnection");

exports.getAllZonas = function () {
  return connection
    .query("SELECT * FROM zonas")
    .then(([results]) => {
      console.log("Resultados de la consulta de zonas:", results);
      return results;
    })
    .catch((error) => {
      console.error("Error al obtener las zonas:", error);
      throw new Error(`Error al obtener las zonas: ${error.message}`);
    });
};
