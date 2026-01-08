import {useAuth} from "../context/AuthContext";
import {AlertCircle, BarChart3, CheckCircle2, Clock} from "lucide-react";

const Dashboard = () => {
  const {user} = useAuth();

  const stats = [
    {
      title: "Tareas Totales",
      value: "24",
      icon: BarChart3,
      color: "bg-blue-500",
      textColor: "text-blue-500",
    },
    {
      title: "En Progreso",
      value: "8",
      icon: Clock,
      color: "bg-amber-500",
      textColor: "text-amber-500",
    },
    {
      title: "Completadas",
      value: "12",
      icon: CheckCircle2,
      color: "bg-green-500",
      textColor: "text-green-500",
    },
    {
      title: "Urgentes",
      value: "4",
      icon: AlertCircle,
      color: "bg-red-500",
      textColor: "text-red-500",
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Bienvenida */}
      <div className='bg-white rounded-lg shadow p-6'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>
          ¡Hola, {user?.name}! 👋
        </h1>
        <p className='text-gray-600'>
          Aquí está el resumen de tu día. Mantegamos el trabajo organizado.
        </p>
      </div>

      {/* Estadísticas */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className='bg-white rounded-lg shadow p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-600 mb-1'>{stat.title}</p>
                  <p className='text-3xl font-bold text-gray-900'>
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className='text-white' size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contenido próximamente */}
      <div className='bg-white rounded-lg shadow p-8'>
        <div className='text-center'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4'>
            <BarChart3 className='text-primary' size={32} />
          </div>
          <h2 className='text-xl font-bold text-gray-900 mb-2'>
            Dashboard en construcción
          </h2>
          <p className='text-gray-600 mb-6'>
            Pronto podrás ver gráficos detallados de tu productividad y el
            progreso del equipo.
          </p>
          <button className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition'>
            Ver Tablero Kanban
          </button>
        </div>
      </div>

      {/* Tareas recientes (placeholder) */}
      <div className='bg-white rounded-lg shadow'>
        <div className='px-6 py-4 border-b border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Actividad Reciente
          </h3>
        </div>
        <div className='p-6'>
          <div className='space-y-4'>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className='flex items-start gap-4 p-4 bg-gray-50 rounded-lg'>
                <div className='w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0'>
                  <CheckCircle2 className='text-primary' size={20} />
                </div>
                <div className='flex-1'>
                  <p className='font-medium text-gray-900'>
                    Tarea de ejemplo {item}
                  </p>
                  <p className='text-sm text-gray-500 mt-1'>
                    Actualizada hace 2 horas
                  </p>
                </div>
                <span className='px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full'>
                  Completada
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
