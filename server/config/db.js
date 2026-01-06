const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);

    // Listener para errores de conexión después del inicio
    mongoose.connection.on("error", (err) => {
      console.error("❌ Error de MongoDB:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB desconectado");
    });
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
