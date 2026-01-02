/**
 * Página de Login
 * Formulario de inicio de sesión
 */

import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Lock, Mail, Package} from "lucide-react";
import {useAuth} from "../hooks/useAuth";
import {Button, Input} from "../components/ui";

const Login = () => {
  const navigate = useNavigate();
  const {login} = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => ({...prev, [name]: ""}));
    }
  };

  // Validar formulario
  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      newErrors.email = "Ingrese un email válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (result.success) {
      navigate("/dashboard");
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
              Bienvenido de vuelta
            </p>
            <p className='text-gray-600 mt-2'>Accede a tu cuenta</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className='space-y-4'>
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

            <Input
              label='Contraseña'
              type='password'
              name='password'
              placeholder='••••••••'
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={<Lock className='w-4 h-4' />}
              required
            />

            {/* Recordarme y Olvidé contraseña */}
            <div className='flex items-center justify-between'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  name='rememberMe'
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className='w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary'
                />
                <span className='ml-2 text-sm text-gray-600'>Recuérdame</span>
              </label>
              <Link
                to='/forgot-password'
                className='text-sm text-primary hover:underline'>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón de login */}
            <Button
              type='submit'
              variant='primary'
              fullWidth
              loading={loading}
              className='mt-6'>
              Iniciar Sesión
            </Button>
          </form>

          {/* Link a registro */}
          <p className='text-center text-sm text-gray-600 mt-6'>
            ¿No tienes cuenta?{" "}
            <Link
              to='/register'
              className='text-primary font-medium hover:underline'>
              Regístrate
            </Link>
          </p>
        </div>
      </div>

      {/* Panel Derecho - Ilustración */}
      <div className='hidden lg:flex flex-1 bg-primary items-center justify-center p-12'>
        <div className='max-w-md text-center'>
          {/* Ilustración SVG minimalista */}
          <div className='mb-8'>
            <svg
              viewBox='0 0 400 300'
              className='w-full h-auto'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              {/* Personas colaborando */}
              <rect
                x='50'
                y='100'
                width='100'
                height='150'
                rx='8'
                fill='white'
                opacity='0.1'
              />
              <rect
                x='170'
                y='80'
                width='100'
                height='170'
                rx='8'
                fill='white'
                opacity='0.15'
              />
              <rect
                x='290'
                y='120'
                width='100'
                height='130'
                rx='8'
                fill='white'
                opacity='0.1'
              />
              {/* Checklist */}
              <circle cx='100' cy='140' r='8' fill='white' />
              <line
                x1='115'
                y1='140'
                x2='140'
                y2='140'
                stroke='white'
                strokeWidth='3'
              />
              <circle cx='100' cy='170' r='8' fill='white' />
              <line
                x1='115'
                y1='170'
                x2='140'
                y2='170'
                stroke='white'
                strokeWidth='3'
              />
              {/* Gráfico */}{" "}
              <line
                x1='220'
                y1='220'
                x2='220'
                y2='120'
                stroke='white'
                strokeWidth='2'
              />
              <polyline
                points='220,200 230,180 240,190 250,160'
                stroke='white'
                strokeWidth='3'
                fill='none'
              />
              {/* Reloj/Tiempo */}
              <circle
                cx='340'
                cy='180'
                r='25'
                stroke='white'
                strokeWidth='3'
                fill='none'
              />
              <line
                x1='340'
                y1='180'
                x2='340'
                y2='165'
                stroke='white'
                strokeWidth='3'
              />
              <line
                x1='340'
                y1='180'
                x2='350'
                y2='180'
                stroke='white'
                strokeWidth='3'
              />
            </svg>
          </div>

          <h2 className='text-3xl font-bold text-white mb-4'>
            Únete a tu equipo y organiza tus tareas
          </h2>
          <p className='text-blue-100 text-lg'>
            Gestiona proyectos, colabora con tu equipo y mantén todo bajo
            control en un solo lugar.
          </p>

          {/* Características */}
          <div className='mt-12 space-y-4 text-left'>
            {[
              "Tablero Kanban intuitivo",
              "Colaboración en tiempo real",
              "Prioridades y etiquetas",
            ].map((feature, index) => (
              <div key={index} className='flex items-center text-white'>
                <svg
                  className='w-6 h-6 mr-3'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
