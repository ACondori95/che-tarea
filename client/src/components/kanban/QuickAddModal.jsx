/**
 * QuickAddModal Component
 * Modal rápido para crear tareas
 */

import {useState} from "react";
import {Button, Input, Modal, Select, Textarea} from "../ui";
import {PRIORIDADES} from "../../utils/constants";
import {useTasks} from "../../hooks/useTasks";
import {useAuth} from "../../hooks/useAuth";

const QuickAddModal = ({isOpen, onClose, initialEstado = "Por Hacer"}) => {
  const {createTask, loadTasks} = useTasks();
  const {user} = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    prioridad: "Media",
    estado: initialEstado,
  });

  const [errors, setErrors] = useState({});

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    if (errors[name]) {
      setErrors((prev) => ({...prev, [name]: ""}));
    }
  };

  // Validar formulario
  const validate = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es obligatorio";
    } else if (formData.titulo.trim().length < 3) {
      newErrors.titulo = "El título debe tener al menos 3 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const result = await createTask(formData);

    setLoading(false);

    if (result.success) {
      // Resetear formulario
      setFormData({
        titulo: "",
        descripcion: "",
        prioridad: "Media",
        estado: initialEstado,
      });
      setErrors({});

      // Recargar tareas
      await loadTasks();

      // Cerrar modal
      onClose();
    }
  };

  // Resetear al cerrar
  const handleClose = () => {
    setFormData({
      titulo: "",
      descripcion: "",
      prioridad: "Media",
      estado: initialEstado,
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title='Crear Nueva Tarea'
      size='md'
      footer={
        <>
          <Button variant='secondary' onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant='primary' onClick={handleSubmit} loading={loading}>
            Crear Tarea
          </Button>
        </>
      }>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input
          label='Título de la Tarea'
          name='titulo'
          placeholder='Ej: Revisar el diseño de landing page'
          value={formData.titulo}
          onChange={handleChange}
          error={errors.titulo}
          required
          autoFocus
        />

        <Textarea
          label='Descripción (opcional)'
          name='descripcion'
          placeholder='Agrega más detalles sobre la tarea...'
          value={formData.descripcion}
          onChange={handleChange}
          rows={3}
          maxLength={500}
          showCounter
        />

        <Select
          label='Prioridad'
          name='prioridad'
          value={formData.prioridad}
          onChange={handleChange}
          options={PRIORIDADES}
        />

        <div className='bg-gray-50 rounded-lg p-3 border border-gray-200'>
          <p className='text-sm text-gray-700'>
            <span className='font-medium'>Estado:</span> {formData.estado}
          </p>
          <p className='text-xs text-gray-500 mt-1'>
            La tarea se creará en esta columna
          </p>
        </div>
      </form>
    </Modal>
  );
};

export default QuickAddModal;
