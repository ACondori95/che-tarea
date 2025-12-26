/**
 * Utilidad de Auto-borrado
 * Elimina automáticamente tareas finalizadas después de X días
 */

const Task = require("../models/Task");

/**
 * Elimina tareas finalizadas que excedieron el período de retención
 */
const autoDeleteFinishedTasks = async () => {
  try {
    const retentionDays = parseInt(process.env.AUTO_DELETE_DAYS) || 10;
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - retentionDays);

    const result = await Task.deleteMany({
      state: "Finalizadas",
      finalizedDate: {$lte: limitDate},
    });

    if (result.deletedCount > 0) {
      console.log(
        `🗑️ Auto-borrado: ${result.deletedCount} tarea(s) eliminada(s)`
      );
    }

    return result.deletedCount;
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
  autoDeleteFinishedTasks();

  // Ejecutar cada 24 horas (86400000 ms)
  setInterval(() => {
    autoDeleteFinishedTasks();
  }, 24 * 60 * 60 * 1000);

  console.log("⏰ Scheduler de auto-borrado iniciado (cada 24 horas)");
};

module.exports = {autoDeleteFinishedTasks, startAutoDeleteScheduler};
