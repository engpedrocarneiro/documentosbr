import { LoginForm } from '../components/auth/LoginForm';

export function Login() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Processador de Documentos</h1>
        <p className="mt-2 text-gray-400">Faça login para acessar seus documentos</p>
      </div>
      <LoginForm />
    </div>
  );
}