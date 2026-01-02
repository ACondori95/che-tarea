/**
 * Componente Skeleton
 * Loading placeholder para mejorar UX
 */

const Skeleton = ({
  variant = "text",
  width,
  height,
  count = 1,
  className = "",
}) => {
  const variants = {
    text: "h-4 w-full",
    title: "h-6 w-3/4",
    avatar: "h-10 w-10 rounded-full",
    card: "h-32 w-full",
    button: "h-10 w-24",
  };

  const baseStyles = `skeleton bg-gray-200 rounded animate-pulse ${variants[variant]} ${className}`;

  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  // Si count > 1, renderizar múltiples skeletons
  if (count > 1) {
    return (
      <div className='space-y-3'>
        {Array.from({length: count}).map((_, index) => (
          <div key={index} className={baseStyles.trim()} style={style} />
        ))}
      </div>
    );
  }

  return <div className={baseStyles.trim()} style={style} />;
};

// Skeleton compuesto para tarjetas de tareas
export const TaskCardSkeleton = () => {
  return (
    <div className='bg-white rounded-lg border border-gray-200 p-4 space-y-3'>
      <div className='flex items-center justify-between'>
        <Skeleton variant='button' width='60px' />
        <Skeleton variant='avatar' />
      </div>
      <Skeleton variant='title' />
      <Skeleton variant='text' width='90%' />
      <div className='flex items-center gap-2'>
        <Skeleton width='50px' height='20px' />
        <Skeleton width='50px' height='20px' />
      </div>
    </div>
  );
};

// Skeleton para el tablero Kanban
export const KanbanSkeleton = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {[1, 2, 3, 4].map((col) => (
        <div key={col} className='space-y-3'>
          <Skeleton variant='title' width='120px' />
          <TaskCardSkeleton />
          <TaskCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
