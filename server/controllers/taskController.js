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
    const {state, priority, assignedTo} = req.query;
    const filter = {};

    // Aplicar filtros si existen
    if (state) filter.state = state;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email avatar")
      .populate("tags", "name color")
      .populate("createdBy", "name")
      .sort({createdAt: -1});

    res.status(200).json({success: true, amount: tasks.length, tasks});
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
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email avatar")
      .populate("tags", "name color")
      .populate("createdBy", "name")
      .populate("comments.user", "name avatar")
      .populate("history.user", "name");

    if (!task) {
      return res
        .status(404)
        .json({success: false, message: "Tarea no encontrada"});
    }

    res.status(200).json({success: true, task});
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
    req.body.createdBy = req.user.id;

    const task = await Task.create(req.body);

    // Agregar entrada al historial
    task.history.push({user: req.user.id, action: "Creó la tarea"});

    await task.save();

    // Poblar datos para la reapuesta
    await task.populate("assignedTo", "name email avatar");
    await task.populate("tags", "name color");

    res
      .status(201)
      .json({success: true, message: "Tarea creada exitosamente", task});
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
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res
        .status(404)
        .json({success: false, message: "Tarea no encontrada"});
    }

    // Detectar cambios para el historial
    const changes = [];
    if (req.body.state && req.body.state !== task.state) {
      changes.push(`Movió a "${req.body.state}"`);
    }
    if (req.body.priority && req.body.priority !== task.priority) {
      changes.push(`Cambió prioridad a "${req.body.priority}"`);
    }

    // Actualizar tarea
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("assignedTo tags");

    // Agregar al historial
    if (changes.length > 0) {
      task.history.push({user: req.user.id, action: changes.join(", ")});
      await task.save();
    }

    res
      .status(200)
      .json({success: true, message: "Tarea actualizada exitosamente", task});
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
    const task = await Task.findById(req.params.id);

    if (!tarea) {
      return res
        .status(404)
        .json({success: false, message: "Tarea no encontrada"});
    }

    // Verificar permisos (Admin o creador)
    if (req.user.rol !== "Admin" && task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "No tiene permisos para eliminar esta tarea",
      });
    }

    await task.deleteOne();

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
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res
        .status(404)
        .json({success: false, message: "Tarea no encontrada"});
    }

    task.comments.push({user: req.user.id, text: req.body.text});

    await task.save();
    await task.populate("comments.user", "name avatar");

    res.status(201).json({
      success: true,
      message: "Comentario agregado",
      comments: task.comments,
    });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**

@desc    Actualizar subtarea
@route   PUT /api/tasks/:id/subtasks/:subtaskId
@access  Private
*/
exports.updateSubtask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res
        .status(404)
        .json({success: false, message: "Tarea no encontrada"});
    }

    const subtask = task.subtasks.id(req.params.subtaskId);
    if (!subtask) {
      return res.status(404).json({
        success: false,
        message: "Subtarea no encontrada",
      });
    }

    subtask.completed = req.body.completed;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Subtarea actualizada",
      subtasks: task.subtasks,
    });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
