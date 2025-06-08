import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedSection({ children, delay = 0, className = '' }: AnimatedSectionProps) {
  return (
    <div 
      className={`animate-fade-in ${className}`} 
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
