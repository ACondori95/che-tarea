import {useEffect, useState} from "react";
import {
  Plus,
  Search,
  Shield,
  Trash2,
  User as UserIcon,
  UserPlus,
  X,
} from "lucide-react";
import {useTask} from "../context/TaskContext";
import axios from "../api/axios";
import {toast} from "react-toastify";

const AdminPanel = () => {
  const {tags, fetchTags} = useTask();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [inviteData, setInviteData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [newTag, setNewTag] = useState({name: "", color: "#2563eb"});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get("/users");
      setUsers(data.data);
    } catch (error) {
      toast.error("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleInviteUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/users", inviteData);
      toast.success("Usuario invitado exitosamente");
      setInviteData({name: "", email: "", password: "", role: "user"});
      setIsInviteModalOpen(false);
      fetchUsers();
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al invitar usuario";
      toast.error(message);
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await axios.put(`/users/${userId}`, {role: newRole});
      toast.success("Rol actualizado exitosamente");
      fetchUsers();
    } catch (error) {
      toast.error("Error al actualizar rol");
    }
  };

  const handleDeactivateUser = async (userId) => {
    if (
      window.confirm("¿Estás seguro de que deseas desactivar este usuario?")
    ) {
      try {
        await axios.delete(`/users/${userId}`);
        toast.success("Usuario desactivado exitosamente");
        fetchUsers();
      } catch (error) {
        toast.error("Error al desactivar usuario");
      }
    }
  };

  const handleCreateTag = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/tags", newTag);
      toast.success("Etiqueta creada exitosamente");
      setNewTag({name: "", color: "#2563eb"});
      setIsTagModalOpen(false);
      fetchTags();
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al crear etiqueta";
      toast.error(message);
    }
  };

  const handleDeleteTag = async (tagId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta etiqueta?")) {
      try {
        await axios.delete(`/tags/${tagId}`);
        toast.success("Etiqueta eliminada exitosamente");
        fetchTags();
      } catch (error) {
        toast.error("Error al eliminar etiqueta");
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const predefinedColors = [
    "#2563eb",
    "#dc2626",
    "#16a34a",
    "#ea580c",
    "#9333ea",
    "#0891b2",
    "#65a30d",
    "#ca8a04",
    "#e11d48",
    "#7c3aed",
  ];

  return (
    <div className=''>
      {/* Header */}
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>
          Configuración del Equipo
        </h1>
        <p className='text-gray-600 mt-1'>
          Gestiona usuarios y etiquetas del sistema
        </p>
      </div>

      {/* Gestión de Usuarios */}
      <div className='bg-white rounded-lg shadow'>
        <div className='px-6 py-4 border-b border-gray-200 flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Gestión de Usuarios
          </h2>
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition'>
            <UserPlus size={20} />
            Invitar Nuevo Miembro
          </button>
        </div>

        {/* Buscador */}
        <div className='p-6 border-b border-gray-200'>
          <div className='relative'>
            <Search
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Buscar usuarios...'
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none'
            />
          </div>
        </div>

        {/* Tabla de usuarios */}
        <div className='overflow-x-auto'>
          {loading ? (
            <div className='flex items-center justify-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary' />
            </div>
          ) : (
            <table className='w-full'>
              <thead className='bg-gray-50 border-b border-gray-200'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Usuario
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Email
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Rol
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Estado
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold'>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>
                        {user.email}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleUpdateUserRole(user._id, e.target.value)
                        }
                        className='text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:border-transparent outline-none'>
                        <option value='user'>Usuario Estándar</option>
                        <option value='admin'>Admin</option>
                      </select>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {user.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <button
                        onClick={() => handleDeactivateUser(user._id)}
                        className='text-red-600 hover:text-red-900 ml-4'>
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Gestión de Etiquetas */}
      <div className='bg-white rounded-lg shadow'>
        <div className='px-6 py-4 border-b border-gray-200 flex items-center justify-between'>
          <button
            onClick={() => setIsTagModalOpen(true)}
            className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition'>
            <Plus size={20} />
            Crear Nueva Etiqueta
          </button>
        </div>

        <div className='p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {tags.map((tag) => (
              <div
                key={tag._id}
                className='flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition'>
                <div className='flex items-center gap-3'>
                  <div
                    className='w-4 h-4 rounded-full'
                    style={{backgroundColor: tag.color}}
                  />
                  <span className='font-medium text-gray-900'>{tag.name}</span>
                </div>
                <button
                  onClick={() => handleDeleteTag(tag._id)}
                  className='text-red-600 hover:text-red-900'>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {tags.length === 0 && (
            <div className='text-center py-12 text-gray-500'>
              No hay etiquetas creadas. Crea la primera etiqueta.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Invitar Usuario */}
      {isInviteModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-xl max-w-md w-full'>
            <div className='flex items-center justify-between p-6 border-b border-gray-200'>
              <h3 className='text-xl font-semibold text-gray-900'>
                Invitar Nuevo Miembro
              </h3>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className='text-gray-400 hover:text-gray-600'>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleInviteUser} className='p-6 space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Nombre Completo
                </label>
                <input
                  type='text'
                  required
                  value={inviteData.name}
                  onChange={(e) =>
                    setInviteData({...inviteData, name: e.target.value})
                  }
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  required
                  value={inviteData.email}
                  onChange={(e) =>
                    setInviteData({...inviteData, email: e.target.value})
                  }
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Contraseña Temporal
                </label>
                <input
                  type='password'
                  required
                  minLength={6}
                  value={inviteData.password}
                  onChange={(e) =>
                    setInviteData({...inviteData, password: e.target.value})
                  }
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Rol
                </label>
                <div className='grid grid-cols-2 gap-3'>
                  <button
                    type='button'
                    onClick={() => setInviteData({...inviteData, role: "user"})}
                    className={`flex flex-col items-center p-4 border-2 rounded-lg transition ${
                      inviteData.role === "user"
                        ? "border-primary bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}>
                    <UserIcon
                      size={24}
                      className={
                        inviteData.role === "user"
                          ? "text-primary"
                          : "text-gray-400"
                      }
                    />
                    <span className='mt-2 text-sm font-medium'>Usuario</span>
                  </button>

                  <button
                    type='button'
                    onClick={() =>
                      setInviteData({...inviteData, role: "admin"})
                    }
                    className={`flex flex-col items-center p-4 border-2 rounded-lg transition ${
                      inviteData.role === "admin"
                        ? "border-primary bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}>
                    <Shield
                      size={24}
                      className={
                        inviteData.role === "admin"
                          ? "text-primary"
                          : "text-gray-400"
                      }
                    />
                    <span className='mt-2 text-sm font-medium'>Admin</span>
                  </button>
                </div>
              </div>

              <div className='flex gap-3 pt-4'>
                <button
                  type='button'
                  onClick={() => setIsInviteModalOpen(false)}
                  className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition'>
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition'>
                  Invitar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Crear Etiqueta */}
      {isTagModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-xl max-w-md w-full'>
            <div className='flex items-center justify-between p-6 border-b border-gray-200'>
              <h3 className='text-xl font-semibold text-gray-900'>
                Crear Nueva Etiqueta
              </h3>
              <button
                onClick={() => setIsTagModalOpen(false)}
                className='text-gray-400 hover:text-gray-600'>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateTag} className='p-6 space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Nombre de la Etiqueta
                </label>
                <input
                  type='text'
                  required
                  value={newTag.name}
                  onChange={(e) => setNewTag({...newTag, name: e.target.value})}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none'
                  placeholder='ej: Urgente'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Color
                </label>
                <div className='grid grid-cols-5 gap-2 mb-3'>
                  {predefinedColors.map((color) => (
                    <button
                      key={color}
                      type='button'
                      onClick={() => setNewTag({...newTag, color})}
                      className={`w-full h-10 rounded-lg transition ${
                        newTag.color === color
                          ? "ring-2 ring-offset-2 ring-primary"
                          : ""
                      }`}
                      style={{backgroundColor: color}}
                    />
                  ))}
                </div>
                <input
                  type='color'
                  value={newTag.color}
                  onChange={(e) =>
                    setNewTag({...newTag, color: e.target.value})
                  }
                  className='w-full h-10 rounded-lg border border-gray-300 cursor-pointer'
                />
              </div>

              <div className='flex gap-3 pt-4'>
                <button
                  type='button'
                  onClick={() => setIsTagModalOpen(false)}
                  className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition'>
                  Cancelar
                </button>
                <button
                  type='submit'
                  className='flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition'>
                  Crear Etiqueta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
