
import Link from "next/link";
import { useCategories } from "@/hooks/use-strapi-categories";
import * as LucideIcons from "lucide-react";
import { Grid3X3 } from "lucide-react";

interface CategoryExplorerProps {
  onSelectCategory: (category: string) => void;
  selectedZone?: string;
}

// Función para obtener el ícono de Lucide por nombre
function getLucideIcon(iconName: string) {
  const IconComponent = (LucideIcons as any)[iconName];
  if (IconComponent) {
    return <IconComponent className="h-8 w-8" />;
  }
  // Fallback si no se encuentra el ícono
  return <LucideIcons.HelpCircle className="h-8 w-8" />;
}

export function CategoryExplorer({ onSelectCategory, selectedZone = "pedregal" }: CategoryExplorerProps) {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-headline font-bold text-center mb-6">Categorías en El Pedregal</h2>
        <div className="text-center">
          <p>Cargando categorías disponibles...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-headline font-bold text-center mb-6">Explora por Categoría</h2>
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-headline font-bold text-center mb-6">Categorías en El Pedregal</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
        {/* Categoría "Todas" - Super destacada */}
        <Link href="/zona/pedregal" onClick={() => onSelectCategory("Todas")}>
          <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary via-primary to-orange-600 hover:from-orange-600 hover:to-primary rounded-3xl transition-all duration-300 h-full shadow-2xl hover:shadow-primary/25 border-4 border-primary/30 transform hover:scale-110 relative overflow-hidden">
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10 p-5 bg-white/25 rounded-full mb-4 text-white shadow-lg">
              <Grid3X3 className="h-10 w-10" />
            </div>
            <div className="relative z-10 text-center">
              <span className="font-black font-headline text-xl text-white drop-shadow-lg">Todas</span>
              <p className="text-white/90 text-sm font-medium mt-2">Ver todas las categorías</p>
            </div>
            
            {/* Indicador de "más" */}
            <div className="absolute top-3 right-3 bg-white/20 rounded-full w-6 h-6 flex items-center justify-center">
              <span className="text-white font-bold text-xs">+</span>
            </div>
          </div>
        </Link>

        {/* Categorías normales */}
        {categories.map((category) => (
          <Link key={category.id} href={`/zona/${selectedZone}/${category.slug}`} onClick={() => onSelectCategory(category.name)}>
            <div className="flex flex-col items-center justify-center p-6 bg-card hover:bg-muted rounded-2xl transition-all duration-300 h-full shadow-sm hover:shadow-lg border">
              <div className="p-4 bg-primary/10 rounded-full mb-4 text-primary" style={{ backgroundColor: `${category.color}20` }}>
                {getLucideIcon(category.icon)}
              </div>
              <span className="font-semibold font-headline text-center text-foreground">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
