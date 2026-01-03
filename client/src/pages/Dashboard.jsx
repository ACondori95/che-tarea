/**
 * Dashboard Page
 * Página principal con tablero Kanban (temporal)
 */

import {Filter, Plus} from "lucide-react";
import {DashboardLayout, EmptyState, PageHeader} from "../components/layout";
import {Button, Card} from "../components/ui";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <PageHeader
        title='Dashboard'
        subtitle='Visualiza y gestiona todas tus tareas'
        actions={
          <>
            <Button variant='secondary' icon={<Filter className='w-4 h-4' />}>
              Filtrar
            </Button>
            <Button variant='primary' icon={<Plus className='w-4 h-4' />}>
              Nueva Tarea
            </Button>
          </>
        }
      />

      {/* Contenido temporal */}
      <Card className='p-8'>
        <EmptyState
          icon={Plus}
          title='¡Comenzá a organizar tus tareas!'
          descrption='El tablero Kanban se implementará en la siguiente fase. Por ahora podés explorar la interfaz.'
          actionLabel='Crear Primera Tarea'
          onAction={() => alert("¡Pronto disponible!")}
        />
      </Card>

      {/* Preview de lo que se viene */}
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {[
          "Por Hacer",
          "En Progreso",
          "Pendiente de Revisión",
          "Finalizadas",
        ].map((estado) => (
          <Card key={estado} title={estado} className='h-48'>
            <p className='text-sm text-gray-500 text-center mt-8'>
              Las columnas Kanban aparecerán aquí
            </p>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
