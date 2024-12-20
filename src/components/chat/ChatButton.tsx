import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
  className?: string;
}

export function ChatButton({ onClick, className = '' }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      data-chat-button
      className={`fixed bottom-6 right-6 z-50 p-4 bg-blue-600/90 hover:bg-blue-600 text-white 
        rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 
        hover:shadow-xl hover:shadow-blue-500/20 ring-offset-2 ring-blue-500 focus:outline-none 
        focus:ring-2 sm:p-3 ${className}`}
      aria-label="Abrir chat"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}