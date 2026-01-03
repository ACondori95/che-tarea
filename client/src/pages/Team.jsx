/**
 * Team Page
 * Gestión del equipo (placeholder)
 */

import {Users} from "lucide-react";
import {DashboardLayout, EmptyState, PageHeader} from "../components/layout";

const Team = () => {
  return (
    <DashboardLayout>
      <PageHeader
        title='Equipo'
        subtitle='Gestiona los miembros de tu equipo'
      />
      <EmptyState
        icon={Users}
        title='Gestión de Equipo'
        descrption='Esta sección se implementará próximamente'
      />
    </DashboardLayout>
  );
};

export default Team;
