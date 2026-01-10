import {useState} from "react";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {Plus} from "lucide-react";
import {useTask} from "../context/TaskContext";
import Column from "../components/kanban/Column";
import TaskCard from "../components/kanban/TaskCard";
import QuickAddModal from "../components/kanban/QuickAddModal";

const Tasks = () => {
  const {tasks, loading, updateTask} = useTask();
  const [activeTask, setActiveTask] = useState(null);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {activationConstraint: {distance: 8}})
  );

  const columns = [
    {id: "por_hacer", title: "Por Hacer"},
    {id: "en_progreso", title: "En Progreso"},
    {id: "pendiente_revision", title: "Pendiente de Revisión"},
    {id: "finalizada", title: "Finalizadas"},
  ];

  const getTaskByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleDragStart = (event) => {
    const {active} = event;
    const task = tasks.find((t) => t._id === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = async (event) => {
    const {active, over} = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const taskId = active.id;
    const newStatus = over.id;

    // Si se soltó sobre la misma columna, no hacer nada
    const task = tasks.find((t) => t._id === taskId);
    if (task.status === newStatus) {
      setActiveTask(null);
      return;
    }

    // Actualizar el estado de la tarea
    await updateTask(taskId, {status: newStatus});
    setActiveTask(null);
  };

  const handleTaskClick = (task) => {
    // TODO: Abrir modal de detalle de tarea
    console.log("Abrir detalle de tarea:", task);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary' />
      </div>
    );
  }

  return (
    <div className='h-full flex flex-col'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Tablero Kanban</h1>
          <p className='text-gray-600 mt-1'>Organiza y gestiona tus tareas</p>
        </div>
        <button
          onClick={() => setIsQuickAddOpen(true)}
          className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition'>
          <Plus size={20} />
          Quick Add
        </button>
      </div>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 overflow-auto pb-6'>
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={getTaskByStatus(column.id)}
              onTaskClick={handleTaskClick}
              isFinalized={column.id === "finalizada"}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} onClick={() => {}} />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Quick Add Modal */}
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
      />
    </div>
  );
};

export default Tasks;
