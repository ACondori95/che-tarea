const cron = require("node-cron");
const Task = require("../models/Task");

// Función para eliminar tareas finalizadas después de 10 días
const deleteExpiredTasks = async () => {
  try {
    const now = new Date();

    // Buscar tareas que tengan autoDeleteAt en el pasado
    const expiredTasks = await Task.find({
      autoDeleteAt: {$lte: now},
      status: "finalizada",
    });

    if (expiredTasks.length > 0) {
      // Eliminar tareas expiradas
      const result = await Task.deleteMany({
        autoDeleteAt: {$lte: now},
        status: "finalizada",
      });

      console.log(
        `🗑️ Auto-borrado: ${result.deletedCount} tareas(s) eliminada(s)`
      );

      return {
        success: true,
        deletedCount: result.deletedCount,
        tasks: expiredTasks.map((t) => ({id: t._id, title: t.title})),
      };
    } else {
      console.log("✅ Auto-borrado: No hay tareas para eliminar");
      return {success: false, deletedCount: 0, tasks: []};
    }
  } catch (error) {
    console.error("❌ Error en auto-borrado:", error);
    return {success: false, error: error.message};
  }
};

// Función para iniciar el cron job
const startTaskCleanupJob = () => {
  // Ejecutar todos los días a las 2:00 AM
  // Formato: segundo minuto hora día mes día_semana
  cron.schedule("0 2 * * *", async () => {
    console.log("⏰ Ejecutando tarea de auto-borrado programada...");
    await deleteExpiredTasks();
  });

  console.log(
    "✅ Tarea de auto-borrado programada (diariamente a las 2:00 AM)"
  );
};

// Función para ejecutar limpieza manual (útil para testing)
const runManualCleanup = async () => {
  console.log("🔄️ Ejecutando limpieza manual...");
  return await deleteExpiredTasks();
};

module.exports = {startTaskCleanupJob, runManualCleanup, deleteExpiredTasks};
