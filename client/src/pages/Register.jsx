/**
 * Página de Registro
 * Formulario para crear nueva cuenta
 */

import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Lock, Mail, Package, User} from "lucide-react";
import {register as registerApi} from "../api/authApi";
import {Button, Input, Select} from "../components/ui";
import {toast} from "react-toastify";
import {ROLES} from "../utils/constants";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "Usuario Estándar",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => ({...prev, [name]: ""}));
    }
  };

  // Validar formulario
  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      newErrors.email = "Ingrese un email válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirme su contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await registerApi({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        rol: formData.rol,
      });

      if (response.success) {
        toast.success("¡Cuenta creada exitosamente!");
        // Auto-login después del registro
        navigate("/dashboard");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al crear la cuenta";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex'>
      {/* Panel Izquierdo - Formulario */}
      <div className='flex-1 flex items-center justify-center p-8 bg-white'>
        <div className='w-full max-w-md'>
          {/* Logo y título */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4'>
              <Package className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-2xl font-bold text-gray-900'>Task Manager</h1>
            <p className='text-3xl font-bold text-gray-900 mt-2'>
              Crea tu Cuenta
            </p>
            <p className='text-gray-600 mt-2'>
              Únete a tu equipo y organiza tus tareas
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              label='Nombre Completo'
              type='text'
              name='nombre'
              placeholder='Juan Pérez'
              value={formData.nombre}
              onChange={handleChange}
              error={errors.nombre}
              icon={<User className='w-4 h-4' />}
              required
            />

            <Input
              label='Correo Electrónico'
              type='email'
              name='email'
              placeholder='correo@ejemplo.com'
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={<Mail className='w-4 h-4' />}
              required
            />

            <Select
              label='Rol Inicial'
              name='rol'
              value={formData.rol}
              onChange={handleChange}
              options={ROLES}
              helperText='Puedes cambiar esto después en configuración'
            />

            <Input
              label='Contraseña'
              type='password'
              name='password'
              placeholder='Mínimo 6 caracteres'
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={<Lock className='w-4 h-4' />}
              required
            />

            <Input
              label='Confirmar Contraseña'
              type='password'
              name='confirmPassword'
              placeholder='Repite tu contraseña'
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              icon={<Lock className='w-4 h-4' />}
              required
            />

            {/* Botón de registro */}
            <Button
              type='submit'
              variant='primary'
              fullWidth
              loading={loading}
              className='mt-6'>
              Registrarse
            </Button>
          </form>

          {/* Link a login */}
          <p className='text-center text-sm text-gray-600 mt-6'>
            ¿Ya tienes cuenta?{" "}
            <Link
              to='/login'
              className='text-primary font-medium hover:underline'>
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>

      {/* Panel Derecho - Ilustración */}
      <div className='hidden lg:flex flex-1 bg-primary items-center justify-center p-12'>
        <div className='max-w-md text-center'>
          {/* Ilustración SVG */}
          <div className='mb-8'>
            <svg
              viewBox='0 0 400 300'
              className='w-full h-auto'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              {/* Personas trabajando */}
              <circle cx='120' cy='120' r='40' fill='white' opacity='0.2' />
              <circle cx='200' cy='100' r='45' fill='white' opacity='0.25' />
              <circle cx='280' cy='120' r='40' fill='white' opacity='0.2' />

              {/* Líneas de conexión */}
              <line
                x1='160'
                y1='120'
                x2='240'
                y2='100'
                stroke='white'
                strokeWidth='2'
                opacity='0.3'
              />
              <line
                x1='240'
                y1='100'
                x2='240'
                y2='120'
                stroke='white'
                strokeWidth='2'
                opacity='0.3'
              />

              {/* Iconos de tareas */}
              <rect
                x='100'
                y='200'
                width='60'
                height='8'
                rx='4'
                fill='white'
                opacity='0.3'
              />
              <rect
                x='170'
                y='200'
                width='60'
                height='8'
                rx='4'
                fill='white'
                opacity='0.3'
              />
              <rect
                x='240'
                y='200'
                width='60'
                height='8'
                rx='4'
                fill='white'
                opacity='0.3'
              />

              <rect
                x='100'
                y='220'
                width='80'
                height='8'
                rx='4'
                fill='white'
                opacity='0.25'
              />
              <rect
                x='190'
                y='220'
                width='50'
                height='8'
                rx='4'
                fill='white'
                opacity='0.25'
              />
            </svg>
          </div>

          <h2 className='text-3xl font-bold text-white mb-4'>
            Comienza a colaborar hoy
          </h2>
          <p className='text-blue-100 text-lg'>
            Crear tu cuenta gratuita y empieza a organizar tus proyectos con tu
            equipo.
          </p>

          {/* Beneficios */}
          <div className='mt-12 space-y-4 text-left'>
            {[
              "Configuración rápida en minutos",
              "Sin tarjeta de crédito requerida",
              "Comienza a organizar inmediatamente",
            ].map((benefit, index) => (
              <div key={index} className='flex items-center text-white'>
                <svg
                  className='w-6 h-6 mr-3 flex-shrink-0'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
