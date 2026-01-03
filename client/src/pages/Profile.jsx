/**
 * Profile Page
 * Perfil del usuario (placeholder)
 */

import {} from "lucide-react";
import {DashboardLayout, PageHeader} from "../components/layout";
import {useAuth} from "../hooks/useAuth";
import {Avatar, Card} from "../components/ui";

const Profile = () => {
  const {user} = useAuth();

  return (
    <DashboardLayout>
      <PageHeader
        title='Mi Perfil'
        subtitle='Gestiona tu información personal'
      />

      <div className='max-w-2xl'>
        <Card className='p-6'>
          <div className='flex items-center space-x-4 mb-6'>
            <Avatar name={user?.nombre} size='xl' src={user?.avatar} />
            <div>
              <h2 className='text-2xl font-bold text-gray-900'>
                {user?.nombre}
              </h2>
              <p className='text-gray-500'>{user?.email}</p>
              <span className='inline-block mt-1 px-2 py-1 bg-primary text-white text-xs rounded'>
                {user?.rol}
              </span>
            </div>
          </div>

          <div className='border-t border-gray-200 pt-6'>
            <p className='text-gray-600'>
              La edición completa del perfil se implementará próximamente.
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
