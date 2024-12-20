import { RegisterForm } from '../components/auth/RegisterForm';

export function Register() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Criar Conta</h1>
        <p className="mt-2 text-gray-400">
          Registre-se para começar a gerenciar seus documentos
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}