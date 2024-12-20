import { Brain } from 'lucide-react';

export function ChatPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-900/95 space-y-4 backdrop-blur-sm">
      <div className="animate-pulse">
        <Brain className="w-12 h-12 text-blue-500" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-gray-200">Assistente Virtual IAnovar</h3>
        <p className="text-sm text-gray-400">
          Carregando seu assistente pessoal...
        </p>
      </div>
    </div>
  );
}