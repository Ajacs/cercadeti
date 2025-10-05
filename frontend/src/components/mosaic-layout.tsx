'use client';

import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface MosaicItem {
  id: string;
  content: ReactNode;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  priority?: number;
}

interface MosaicLayoutProps {
  items: MosaicItem[];
  className?: string;
}

export function MosaicLayout({ items, className = '' }: MosaicLayoutProps) {
  // Ordenar items por prioridad (mayor prioridad primero)
  const sortedItems = [...items].sort((a, b) => (b.priority || 0) - (a.priority || 0));

  const getSizeClasses = (size: string) => {
    const baseClasses = "relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]";
    
    switch (size) {
      case 'small':
        return `${baseClasses} col-span-1 row-span-1 min-h-[200px]`;
      case 'medium':
        return `${baseClasses} col-span-1 md:col-span-2 row-span-1 min-h-[250px]`;
      case 'large':
        return `${baseClasses} col-span-1 md:col-span-2 lg:col-span-3 row-span-1 min-h-[300px]`;
      case 'wide':
        return `${baseClasses} col-span-1 md:col-span-2 lg:col-span-4 row-span-1 min-h-[200px]`;
      case 'tall':
        return `${baseClasses} col-span-1 md:col-span-1 row-span-2 min-h-[400px]`;
      default:
        return `${baseClasses} col-span-1 row-span-1 min-h-[200px]`;
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 auto-rows-[200px] ${className}`}>
      {sortedItems.map((item) => (
        <div key={item.id} className={getSizeClasses(item.size)}>
          <Card className="w-full h-full border-0 shadow-none bg-transparent">
            {item.content}
          </Card>
        </div>
      ))}
    </div>
  );
}

// Componente para crear elementos del mosaico
export function MosaicCard({ 
  children, 
  gradient = false, 
  overlay = false,
  className = '' 
}: { 
  children: ReactNode; 
  gradient?: boolean;
  overlay?: boolean;
  className?: string;
}) {
  const gradientClass = gradient 
    ? "bg-gradient-to-br from-primary/10 via-orange-500/5 to-primary/20" 
    : "bg-white";
    
  const overlayClass = overlay 
    ? "before:absolute before:inset-0 before:bg-gradient-to-t before:from-black/60 before:via-transparent before:to-transparent before:z-10" 
    : "";

  return (
    <div className={`relative w-full h-full ${gradientClass} ${overlayClass} ${className}`}>
      {children}
    </div>
  );
}


