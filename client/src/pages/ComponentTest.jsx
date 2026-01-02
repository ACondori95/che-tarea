/**
 * Página de prueba de componentes
 * TEMPORAL: Solo para verificar que los componentes funcionan
 */

import {useState} from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  Badge,
  Modal,
  Card,
  Avatar,
  Skeleton,
  TaskCardSkeleton,
} from "../components/ui";
import {Plus, Mail, AlertCircle} from "lucide-react";
import {PRIORIDADES} from "../utils/constants";

const ComponentTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-6xl mx-auto space-y-8'>
        <h1 className='text-3xl font-bold text-gray-900'>
          Prueba de Componentes UI
        </h1>

        {/* Buttons */}
        <Card title='Buttons'>
          <div className='flex flex-wrap gap-3'>
            <Button variant='primary'>Primary</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='danger'>Danger</Button>
            <Button variant='success'>Success</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='primary' size='sm'>
              Small
            </Button>
            <Button variant='primary' size='lg'>
              Large
            </Button>
            <Button variant='primary' icon={<Plus className='w-4 h-4' />}>
              With Icon
            </Button>
            <Button variant='primary' loading>
              Loading
            </Button>
            <Button variant='primary' disabled>
              Disabled
            </Button>
          </div>
        </Card>

        {/* Inputs */}
        <Card title='Inputs'>
          <div className='space-y-4'>
            <Input
              label='Email'
              type='email'
              placeholder='tu@email.com'
              icon={<Mail className='w-4 h-4' />}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              label='Con error'
              error='Este campo es obligatorio'
              required
            />
            <Input label='Disabled' disabled value='Valor deshabilitado' />
          </div>
        </Card>

        {/* Textarea */}
        <Card title='Textarea'>
          <Textarea
            label='Descripción'
            placeholder='Escribe una descripción...'
            maxLength={200}
            showCounter
            helperText='Máximo 200 caracteres'
          />
        </Card>

        {/* Select */}
        <Card title='Select'>
          <Select
            label='Prioridad'
            options={PRIORIDADES}
            placeholder='Selecciona una prioridad'
          />
        </Card>

        {/* Badges */}
        <Card title='Badges'>
          <div className='flex flex-wrap gap-2'>
            <Badge variant='default'>Default</Badge>
            <Badge variant='primary'>Primary</Badge>
            <Badge variant='success'>Success</Badge>
            <Badge variant='warning'>Warning</Badge>
            <Badge variant='danger'>Danger</Badge>
            <Badge variant='urgente'>Urgente</Badge>
            <Badge variant='alta'>Alta</Badge>
            <Badge variant='media'>Media</Badge>
            <Badge variant='baja'>Baja</Badge>
            <Badge variant='primary' icon={<AlertCircle className='w-3 h-3' />}>
              Con Icono
            </Badge>
          </div>
        </Card>

        {/* Avatars */}
        <Card title='Avatars'>
          <div className='flex flex-wrap items-center gap-4'>
            <Avatar name='Juan Pérez' size='sm' />
            <Avatar name='María González' size='md' />
            <Avatar name='Carlos Rodríguez' size='lg' />
            <Avatar name='Ana Martínez' size='xl' />
            <Avatar size='md' />
          </div>
        </Card>

        {/* Modal */}
        <Card title='Modal'>
          <Button onClick={() => setIsModalOpen(true)}>Abrir Modal</Button>
        </Card>

        {/* Skeletons */}
        <Card title='Skeletons'>
          <div className='space-y-4'>
            <Skeleton variant='title' />
            <Skeleton variant='text' count={3} />
            <div className='mt-6'>
              <h3 className='text-sm font-medium text-gray-700 mb-3'>
                Task Card Skeleton:
              </h3>
              <TaskCardSkeleton />
            </div>
          </div>
        </Card>
      </div>

      {/* Modal de prueba */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Modal de Prueba'
        footer={
          <>
            <Button variant='secondary' onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant='primary' onClick={() => setIsModalOpen(false)}>
              Confirmar
            </Button>
          </>
        }>
        <p className='text-gray-600'>
          Este es un modal de prueba. Puedes cerrarlo haciendo clic en el botón
          de cerrar, presionando ESC, o haciendo clic fuera del modal.
        </p>
      </Modal>
    </div>
  );
};

export default ComponentTest;
