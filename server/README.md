# Che Tarea - Backend API

API REST para el gestor de tareas Che Tarea, diseñado específicamente para PyMEs Argentinas.

## 🚀 Stack Tecnológico

- **Node.js** v16+
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación basada en tokens
- **bcryptjs** - Encriptación de contraseñas

## 📁 Estructura del Proyecto

```
backend/
├── config/          # Configuraciones (DB, etc)
├── controllers/     # Lógica de negocio
├── middleware/      # Validaciones y autenticación
├── models/          # Esquemas de MongoDB
├── routes/          # Definición de endpoints
├── utils/           # Utilidades (auto-borrado, etc)
├── .env             # Variables de entorno
├── server.js        # Punto de entrada
└── package.json     # Dependencias
```

## ⚙️ Instalación

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env` con:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/chetarea
JWT_SECRET=tu_secreto_super_seguro
JWT_EXPIRE=7d
AUTO_DELETE_DAYS=10
```

### 3. Iniciar MongoDB

```bash
# Si usas MongoDB local
mongod

# O usa MongoDB Atlas (cloud)
```

### 4. Iniciar servidor

```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

## 📡 Endpoints Disponibles

### Autenticación (`/api/auth`)

- `POST /register` - Registrar nuevo usuario
- `POST /login` - Iniciar sesión
- `GET /me` - Obtener usuario actual (protegido)
- `PUT /profile` - Actualizar perfil (protegido)
- `PUT /change-password` - Cambiar contraseña (protegido)

### Tareas (`/api/tasks`)

- `GET /` - Listar todas las tareas (con filtros)
- `GET /:id` - Obtener tarea específica
- `POST /` - Crear nueva tarea
- `PUT /:id` - Actualizar tarea
- `DELETE /:id` - Eliminar tarea
- `POST /:id/comments` - Agregar comentario
- `PUT /:id/subtasks/:subtaskId` - Actualizar subtarea

### Etiquetas (`/api/tags`)

- `GET /` - Listar todas las etiquetas
- `POST /` - Crear etiqueta (Admin)
- `PUT /:id` - Actualizar etiqueta (Admin)
- `DELETE /:id` - Eliminar etiqueta (Admin)

### Usuarios (`/api/users`) - Solo Admin

- `GET /` - Listar todos los usuarios
- `GET /:id` - Obtener usuario específico
- `POST /` - Crear usuario
- `PUT /:id` - Actualizar usuario
- `DELETE /:id` - Desactivar usuario

## 🔒 Autenticación

La API usa JWT (JSON Web Tokens). Para acceder a rutas protegidas:

1. Login para obtener token
2. Incluir token en headers:

```
Authorization: Bearer <tu_token_jwt>
```

## 👥 Roles de Usuario

- **Usuario Estándar**: Puede crear y gestionar sus tareas
- **Admin**: Acceso completo + gestión de usuarios y etiquetas

## 🗑️ Auto-borrado de Tareas

Las tareas en estado "Finalizadas" se eliminan automáticamente después de 10 días (configurable en `AUTO_DELETE_DAYS`).

El scheduler se ejecuta cada 24 horas.

## 🧪 Pruebas Manuales

### Usando cURL

**Registrar usuario:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "123456",
    "rol": "Usuario Estándar"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "123456"
  }'
```

**Crear tarea:**

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TU_TOKEN>" \
  -d '{
    "titulo": "Mi primera tarea",
    "descripcion": "Descripción de prueba",
    "prioridad": "Alta"
  }'
```

## 🐛 Debugging

Para ver logs detallados:

```bash
NODE_ENV=development npm run dev
```

## 📝 Notas de Desarrollo

- Las contraseñas se hashean automáticamente antes de guardarse
- Los tokens JWT expiran en 7 días por defecto
- El auto-borrado NO es reversible
- Las tareas eliminadas no se pueden recuperar

## 🤝 Contribución

Este proyecto sigue las convenciones de commits:

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `chore:` Tareas de mantenimiento
- `docs:` Documentación

## 📄 Licencia

ISC
