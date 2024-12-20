import { LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const { signOut } = useAuth();

  return (
    <header className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Processador de Documentos</h1>
        <p className="text-gray-400 mt-2">
          Gerencie seus documentos
        </p>
      </div>
      <button
        onClick={() => signOut()}
        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sair
      </button>
    </header>
  );
}