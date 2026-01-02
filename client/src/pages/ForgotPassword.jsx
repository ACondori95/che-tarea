/**
 * Página de Recuperación de Contraseña
 * Formulario para solicitar reset de contraseña
 */

import {useState} from "react";
import {Link} from "react-router-dom";
import {ArrowLeft, Mail, Package} from "lucide-react";
import {Button, Input} from "../components/ui";
import {toast} from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Validar email
  const validate = () => {
    if (!email.trim()) {
      setError("El email es obligatorio");
      return false;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("Ingrese un email válido");
      return false;
    }
    setError("");
    return true;
  };

  // Manejar submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    // Simular envío (implementar endpoint real después)
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
      toast.success("Se ha enviado un email con instrucciones");
    }, 1500);
  };

  if (emailSent) {
    return (
      <div className='min-h-screen flex items-center justify-center p-8 bg-gray-50'>
        <div className='w-full max-w-md text-center'>
          {/* Ícono de éxito */}
          <div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-6'>
            <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                clipRule='evenodd'
              />
            </svg>
          </div>

          <h1 className='text-2xl font-bold text-gray-900 mb-2'>
            ¡Revisa tu email!
          </h1>
          <p className='text-gray-600 mb-6'>
            Hemos enviado instrucciones para restablecer tu contraseña a{" "}
            <span className='font-medium text-gray-900'>{email}</span>
          </p>

          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
            <p className='text-sm text-blue-800'>
              Si no recibes el email en unos minutos, revisa tu carpeta de spam.
            </p>
          </div>

          <Link to='/login'>
            <Button variant='primary' fullWidth>
              Volver al Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-8 bg-gray-50'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-8'>
          {/* Logo y título */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4'>
              <Package className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>
              ¿Olvidaste tu contraseña?
            </h1>
            <p className='text-gray-600'>
              No te preocupes, te enviaremos instrucciones para restablecerla.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              label='Correo Electrónico'
              type='email'
              placeholder='correo@ejemplo.com'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              error={error}
              icon={<Mail className='w-4 h-4' />}
              required
            />

            <Button type='submit' variant='primary' fullWidth loading={loading}>
              Enviar Instrucciones
            </Button>
          </form>

          {/* Link de regreso */}
          <Link
            to='/login'
            className='flex items-center justify-center text-sm text-gray-600 hover:text-primary mt-6'>
            <ArrowLeft className='w-4 h-4 mr-1' />
            Volver al Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
