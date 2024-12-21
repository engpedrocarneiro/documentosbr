import { useState, useEffect } from 'react';
import { ChatButton } from './ChatButton';
import { ChatDialog } from './ChatDialog';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useLocalStorage('chat-widget-open', false);
  const [isMinimized, setIsMinimized] = useLocalStorage('chat-widget-minimized', true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      if (window.innerWidth < 640 && isOpen) {
        setIsMinimized(true);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setIsMinimized(true);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  if (!mounted) return null;

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsMinimized(!isMinimized);
    }
  };

  return (
    <>
      {isOpen && (
        <ChatDialog 
          onClose={() => {
            setIsOpen(false);
            setIsMinimized(true);
          }}
          onMinimize={() => setIsMinimized(true)}
          isMinimized={isMinimized}
        />
      )}
      <ChatButton 
        onClick={handleToggle} 
        className={isOpen && !isMinimized ? 'hidden' : ''}
      />
    </>
  );
}