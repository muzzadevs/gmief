// controlador de iglesias: controller/iglesiasController.js

const mysql = require("mysql2");

// Crear la conexión a la base de datos usando un pool de conexiones
const connection = mysql.createPool({
  host: 'b0ic3s5sskkjcelz7f0a-mysql.services.clever-cloud.com',  // Hostname del MySQL
  user: 'u5iexzxkejkxnabl',                                     // Usuario de MySQL
  password: 'QEsRVHoWeSUtPIgt2GRO',                             // Contraseña de MySQL
  database: 'b0ic3s5sskkjcelz7f0a',                             // Nombre de la base de datos
  port: 3306,                                                   // Puerto
  timezone: "utc+1",                                            // Zona horaria
  dateStrings: true,                                            // Manejar las fechas como cadenas
  decimalNumbers: true,                                         // Manejar decimales correctamente
  connectionLimit: 5,                                          // Límite de conexiones simultáneas
  multipleStatements: true,                                     // Permitir múltiples declaraciones
  waitForConnections: true,                                     // Esperar por conexiones cuando se alcanza el límite
});

// Función para obtener todas las iglesias
exports.getAllIglesias = function () {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM iglesias', (error, results) => {
      if (error) {
        console.error('Error en la consulta SQL o en la conexión:', error);
        return reject(new Error(`Error al obtener las iglesias: ${error.message}`));
      }
      console.log('Resultados de la consulta de iglesias:', results);
      resolve(results);
    });
  });
};

// Función para obtener iglesias por subzona
exports.getAllIglesiasBySubzona = function (subzona_id) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM iglesias WHERE subzona_id = ? ORDER BY nombre ASC';
    connection.query(query, [subzona_id], (error, results) => {
      if (error) {
        console.error('Error en la consulta SQL o en la conexión:', error);
        return reject(new Error(`Error al obtener las iglesias de la subzona: ${error.message}`));
      }
      console.log(`Resultados de la consulta de iglesias para subzona_id=${subzona_id}:`, results);
      resolve(results);
    });
  });
};
