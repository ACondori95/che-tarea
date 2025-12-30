/**
 * Controlador de Tareas
 * Maneja todas las operaciones CRUD de tareas
 */

const Task = require("../models/Task");

/**
 * @desc    Obtener todas las tareas
 * @route   GET /api/tasks
 * @access  Private
 */
exports.getTasks = async (req, res) => {
  try {
    const {estado, prioridad, asignadoA} = req.query;
    const filtro = {};

    // Aplicar filtros si existen
    if (estado) filtro.estado = estado;
    if (prioridad) filtro.prioridad = prioridad;
    if (asignadoA) filtro.prioridad = prioridad;

    const tareas = await Task.find(filtro)
      .populate("asignadoA", "nombre email avatar")
      .populate("tags", "nombre color")
      .populate("creadoPor", "nombre")
      .sort({createdAt: -1});

    res.status(200).json({success: true, cantidad: tareas.length, tareas});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Obtener una tarea por ID
 * @route   GET /api/tasks/:id
 * @access  Private
 */
exports.getTask = async (req, res) => {
  try {
    const tarea = await Task.findById(req.params.id)
      .populate("asignadoA", "nombre email avatar")
      .populate("tags", "nombre color")
      .populate("creadoPor", "nombre")
      .populate("comentarios.usuario", "nombre avatar")
      .populate("historial.usuario", "nombre");

    if (!tarea) {
      return res
        .status(404)
        .json({success: false, message: "Tarea no encontrada"});
    }

    res.status(200).json({success: true, tarea});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Crear nueva tarea
 * @route   POST /api/tasks
 * @access  Private
 */
exports.createTask = async (req, res) => {
  try {
    // Agregar el creador automáticamente
    req.body.creadoPor = req.user.id;

    const tarea = await Task.create(req.body);

    // Agregar entrada al historial
    tarea.historial.push({usuario: req.user.id, accion: "Creó la tarea"});

    await tarea.save();

    // Poblar datos para la respuesta
    await tarea.populate("asignadoA", "nombre email avatar");
    await tarea.populate("tags", "nombre color");

    res
      .status(201)
      .json({success: true, message: "Tarea creada exitosamente", tarea});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Actualizar tarea
 * @route   PUT /api/tasks/:id
 * @access  Private
 */
exports.updateTask = async (req, res) => {
  try {
    let tarea = await Task.findById(req.params.id);

    if (!tarea) {
      return res
        .status(404)
        .json({success: false, message: "Tarea no encontrada"});
    }

    // Detectar cambios para el historial
    const cambios = [];
    if (req.body.estado && req.body.estado !== tarea.estado) {
      cambios.push(`Movió a "${req.body.estado}"`);
    }
    if (req.body.prioridad && req.body.prioridad !== tarea.prioridad) {
      cambios.push(`Cambió prioridad a "${req.body.prioridad}"`);
    }

    // Actualizar tarea
    tarea = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("asignadoA tags");

    // Agregar al historial
    if (cambios.length > 0) {
      tarea.historial.push({usuario: req.user.id, accion: cambios.join(", ")});
      await tarea.save();
    }

    res
      .status(200)
      .json({success: true, message: "Tarea actualizada exitosamente", tarea});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Eliminar tarea
 * @route   DELETE /api/tasks/:id
 * @access  Private (Admin o creador)
 */
exports.deleteTask = async (req, res) => {
  try {
    const tarea = await Task.findById(req.params.id);

    if (!tarea) {
      return res
        .status(404)
        .json({success: false, message: "Tarea no encontrada"});
    }

    // Verificar permisos (Admin o creador)
    if (
      req.user.rol !== "Admin" &&
      tarea.creadoPor.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "No tienes permisos para eliminar esta tarea",
      });
    }

    await tarea.deleteOne();

    res
      .status(200)
      .json({success: true, message: "Tarea eliminada exitosamente"});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Agregar comentario a tarea
 * @route   POST /api/tasks/:id/comments
 * @access  Private
 */
exports.addComment = async (req, res) => {
  try {
    const tarea = await Task.findById(req.params.id);

    if (!tarea) {
      return res
        .status(404)
        .json({success: false, message: "Tarea no encontrada"});
    }

    tarea.comentarios.push({usuario: req.user.id, texto: req.body.texto});

    await tarea.save();
    await tarea.populate("comentarios.usuario", "nombre avatar");

    res.status(201).json({
      success: true,
      message: "Comentario agregado",
      comentarios: tarea.comentarios,
    });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Actualizar subtarea
 * @route   PUT /api/tasks/:id/subtasks/:subtaskId
 * @access  Private
 */
exports.updateSubtask = async (req, res) => {
  try {
    const tarea = await Task.findById(req.params.id);

    if (!tarea) {
      return res
        .status(404)
        .json({success: false, message: "Tarea no encontrada"});
    }

    const subtarea = tarea.subtareas.id(req.params.subtaskId);
    if (!subtarea) {
      return res
        .status(404)
        .json({success: false, message: "Subtarea no encontrada"});
    }

    subtarea.completada = req.body.completada;

    await tarea.save();

    res.status(200).json({
      success: true,
      message: "Subtarea actualizada",
      subtareas: tarea.subtareas,
    });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
