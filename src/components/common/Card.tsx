import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
}
