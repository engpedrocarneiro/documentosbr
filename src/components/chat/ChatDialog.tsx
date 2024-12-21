import { X, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ChatPlaceholder } from './ChatPlaceholder';

interface ChatDialogProps {
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
}

export function ChatDialog({ onClose, onMinimize, isMinimized }: ChatDialogProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: '400px', height: '480px' });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({
          width: '90vw',
          height: '70vh'
        });
      } else {
        setDimensions({
          width: '400px',
          height: '480px'
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    // Hide loading after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isMinimized) return null;

  return (
    <div 
      className="fixed z-50 flex flex-col overflow-hidden transition-all duration-300 ease-in-out 
        transform animate-slideUp bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-2xl"
      style={{
        bottom: '96px',
        right: '24px',
        width: dimensions.width,
        height: dimensions.height,
        maxHeight: '80vh',
      }}
    >
      <div className="flex justify-between items-center p-3 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700">
        <span className="text-sm font-medium text-gray-200">Assistente IAnovar</span>
        <div className="flex items-center space-x-1">
          <button
            onClick={onMinimize}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
            aria-label="Minimizar chat"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
            aria-label="Fechar chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 relative">
        {isLoading ? (
          <ChatPlaceholder />
        ) : (
          <iframe 
            src="https://dash.superagentes.ai/agents/cm4wmr1ls009iaw72xhi0coiv/iframe"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="clipboard-write"
            className="w-full h-full bg-gray-900"
          />
        )}
      </div>
    </div>
  );
}