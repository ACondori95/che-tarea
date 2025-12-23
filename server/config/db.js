/**
 * Configuración de conexión a MongoDB
 * Establece la conexión con la base de datos usando Mongoose
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Establecer conexión
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    console.log(`📊 Base de datos: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error de conexión: ${error.message}`);
    // Terminar proceso de error
    process.exit(1);
  }
};

module.exports = connectDB;
