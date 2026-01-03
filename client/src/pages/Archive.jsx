/**
 * Archive Page
 * Tareas archivadas (placeholder)
 */

import {Archive as ArchiveIcon} from "lucide-react";
import {DashboardLayout, EmptyState, PageHeader} from "../components/layout";

const Archive = () => {
  return (
    <DashboardLayout>
      <PageHeader title='Archivo' subtitle='Tareas finalizadas y archivadas' />
      <EmptyState
        icon={ArchiveIcon}
        title='Archivo de Tareas'
        descrption='Las tareas finalizadas aparecerán aquí antes de ser eliminadas automáticamente'
      />
    </DashboardLayout>
  );
};

export default Archive;
