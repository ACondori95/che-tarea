/**
 * Controlador de Etiquetas
 * Maneja la gestión de tags para categorización de tareas
 */

const Tag = require("../models/Tag");

/**
 * @desc    Obtener todas las etiquetas
 * @route   GET /api/tags
 * @access  Private
 */
exports.getTags = async (req, res) => {
  try {
    const tags = (await Tag.find().populate("createdBy", "name")).toSorted({
      name: 1,
    });

    res.status(200).json({success: true, quantity: tags.length, tags});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Crear nueva etiqueta
 * @route   POST /api/tags
 * @access  Private (Admin only)
 */
exports.createTag = async (req, res) => {
  try {
    const {name, color} = req.body;

    // Verificar si ya existe
    const existingTag = await Tag.findOne({name});
    if (existingTag) {
      return res.status(400).json({
        success: false,
        message: "Ya existe una etiqueta con ese nombre",
      });
    }

    const tag = await Tag.create({name, color, createdBy: req.user.id});

    res
      .status(201)
      .json({success: true, message: "Etiqueta creada exitosamente", tag});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Actualizar etiqueta
 * @route   PUT /api/tags/:id
 * @access  Private (Admin only)
 */
exports.updateTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      return res
        .status(404)
        .json({success: false, message: "Etiqueta no encontrada"});
    }

    const updatedTag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Etiqueta actualizada exitosamente",
      tag: updatedTag,
    });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Eliminar etiqueta
 * @route   DELETE /api/tags/:id
 * @access  Private (Admin only)
 */
exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      return res
        .status(404)
        .json({success: false, message: "Etiqueta no encontrada"});
    }

    await tag.deleteOne();

    res
      .status(200)
      .json({success: true, message: "Etiqueta eliminada exitosamente"});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
