import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div className="min-h-screen bg-gray-900 animate-fadeIn">
      {children}
    </div>
  );
}