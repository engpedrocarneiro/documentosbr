import { LoginForm } from '../components/auth/LoginForm';

export function Login() {
  return (
    <div className="flex flex-col items-center justify-center px-4 h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Processador de Documentos</h1>
        <p className="mt-2 text-gray-400">Faça login para acessar seus documentos</p>
      </div>
      <LoginForm />
    </div>
  );
}