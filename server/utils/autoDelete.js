/**
 * Utilidad de Auto-borrado
 * Elimina automáticamente tareas finalizadas después de X días
 */

const Task = require("../models/Task");

/**
 * Elimina tareas finalizadas que excedieron el período de retención
 */
const autoDeleteFinishedTask = async () => {
  try {
    const diasRetencion = parseInt(process.env.AUTO_DELETE_DAYS) || 10;
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - diasRetencion);

    const resultado = await Task.deleteMany({
      estado: "Finalizadas",
      fechaFinalizacion: {$lte: fechaLimite},
    });

    if (resultado.deletedCount > 0) {
      console.log(
        `🗑️ Auto-borrado: ${resultado.deletedCount} tarea(s) eliminada(s)`
      );
    }

    return resultado.deletedCount;
  } catch (error) {
    console.error("❌ Error en auto-borrado:", error.message);
    return 0;
  }
};

/**
 * Inicia el proceso de auto-borrado periódico
 * Se ejecuta cada 24 horas
 */
const startAutoDeleteScheduler = () => {
  // Ejecutar inmediatamente al iniciar
  autoDeleteFinishedTask();

  // Ejecutar cada 24 horas (86400000 ms)
  setInterval(() => {
    autoDeleteFinishedTask();
  }, 24 * 60 * 60 * 1000);

  console.log("⏰ Scheduler de auto-borrado iniciado (cada 24 horas)");
};

module.exports = {autoDeleteFinishedTask, startAutoDeleteScheduler};
