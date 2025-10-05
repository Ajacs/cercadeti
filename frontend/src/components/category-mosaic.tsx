"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/use-strapi-categories";
import * as LucideIcons from "lucide-react";
import { Grid3X3 } from "lucide-react";

interface CategoryMosaicProps {
  onSelectCategory: (category: string) => void;
  selectedZone?: string;
}

        // Función para obtener el ícono de Lucide por nombre
        function getLucideIcon(iconName: string) {
          const IconComponent = (LucideIcons as any)[iconName];
          if (IconComponent) {
            return <IconComponent className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />;
          }
          return <LucideIcons.HelpCircle className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />;
        }

export function CategoryMosaic({ onSelectCategory, selectedZone = "pedregal" }: CategoryMosaicProps) {
  const { categories, loading, error } = useCategories();

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-8"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50/50 rounded-3xl">
      <div className="px-4 md:px-8">
        {/* Sección de categorías con badge integrado */}
        <div className="relative bg-gradient-to-br from-gray-50/80 via-white to-gray-50/60 rounded-3xl border border-gray-200/60 shadow-sm backdrop-blur-sm p-4 md:p-8">
          {/* Badge "Explora por categoría" como encabezado de la sección */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium border border-primary/20 shadow-sm backdrop-blur-sm">
              <LucideIcons.Grid3X3 className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Explora por categoría</span>
              <span className="sm:hidden">Categorías</span>
            </div>
          </div>

          {/* Título y descripción dentro de la sección */}
          <div className="text-center mb-6 md:mb-8 mt-4">
            <h2 className="text-2xl md:text-3xl font-headline font-bold mb-2 md:mb-3">
              Categorías en <span className="text-primary">El Pedregal</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto px-4 md:px-0">
              Descubre todo lo que tu zona tiene para ofrecerte
            </p>
          </div>

          {/* Layout responsive: centrado en mobile, lado a lado en desktop */}
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center mt-4">
            {/* Grid de categorías - centrado en mobile, izquierda en desktop */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="flex justify-center lg:justify-start w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
                  {categories.slice(0, 10).map((category, index) => (
                    <Link
                      key={category.id}
                      href={`/zona/${selectedZone}/${category.slug}`}
                      onClick={() => onSelectCategory(category.name)}
                      className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
                    >
                      <div
                        className="relative h-24 md:h-32 lg:h-36 flex flex-col items-center justify-center p-2 md:p-3 lg:p-4 text-center bg-white/80 backdrop-blur-sm hover:bg-gradient-to-br transition-all duration-300 border border-gray-200/80 hover:border-primary/30 shadow-sm hover:shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${category.color}06, ${category.color}02)`,
                          borderColor: `${category.color}20`
                        }}
                      >
                        <div className="relative z-10 space-y-1 md:space-y-2 lg:space-y-3 flex flex-col items-center justify-center h-full">
                          <div
                            className="rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 shadow-sm border"
                            style={{
                              backgroundColor: `${category.color}12`,
                              borderColor: `${category.color}25`
                            }}
                          >
                            <div
                              className="text-primary"
                              style={{
                                color: category.color,
                                fontSize: '0.8rem'
                              }}
                            >
                              {getLucideIcon(category.icon)}
                            </div>
                          </div>

                          <h3 className="font-semibold font-headline text-foreground transition-colors duration-300 text-xs md:text-sm lg:text-base leading-tight text-center">
                            {category.name}
                          </h3>
                        </div>

                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${category.color}08, transparent)`
                          }}
                        />
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Separador visual elegante - solo en desktop */}
            <div className="hidden lg:block w-px h-96 bg-gradient-to-b from-transparent via-gray-300/50 to-transparent"></div>

            {/* Tile "TODAS" - centrado en mobile, derecha en desktop */}
            <div className="w-full lg:w-80 lg:mt-0 mt-6 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm">
                <Link
                href="/zona/pedregal"
                onClick={() => onSelectCategory("Todas")}
                className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl block h-64 md:h-80 lg:h-96"
              >
                <div className="relative h-full flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 text-center bg-gradient-to-br from-primary via-primary to-orange-600 hover:from-orange-600 hover:to-primary transition-all duration-300 border-4 border-primary/30 shadow-2xl">
                  {/* Efecto de brillo diagonal */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  {/* Patrón geométrico de fondo */}
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
                      backgroundSize: '40px 40px, 20px 20px'
                    }}
                  />

                  {/* Contenido principal */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-3 md:space-y-4 lg:space-y-6">
                    {/* Ícono con efecto glassmorphism */}
                    <div className="p-4 md:p-5 lg:p-6 bg-white/20 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl border border-white/30 group-hover:scale-110 transition-transform duration-300">
                      <Grid3X3 className="h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 text-white" />
                    </div>

                    {/* Texto principal */}
                    <div className="text-center space-y-2 md:space-y-3">
                      <h3 className="font-black font-headline text-2xl md:text-3xl lg:text-4xl text-white drop-shadow-lg tracking-wide">
                        TODAS
                      </h3>
                      <p className="text-white/90 text-sm md:text-base font-medium">
                        Explora todas las categorías
                      </p>

                      {/* Badge con contador */}
                      <div className="inline-flex items-center gap-2 md:gap-3 bg-white/25 backdrop-blur-sm px-3 md:px-4 lg:px-5 py-1 md:py-2 rounded-full border border-white/30 shadow-lg">
                        <span className="text-white font-bold text-sm md:text-base lg:text-lg">+{categories.length}</span>
                        <span className="text-white text-xs md:text-sm font-medium">categorías</span>
                      </div>
                    </div>
                  </div>

                  {/* Elementos decorativos flotantes */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center border border-white/30 shadow-lg">
                    <span className="text-white font-bold text-lg">★</span>
                  </div>

                  {/* Partículas animadas mejoradas */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-6 left-6 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-16 right-8 w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-8 left-12 w-2.5 h-2.5 bg-white/35 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-20 right-6 w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  </div>

                  {/* Efecto hover adicional */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
              </div>
            </div>
          </div>

          {/* Categorías adicionales - Ver más */}
          {categories.length > 10 && (
            <div className="mt-6 pt-6 border-t border-gray-200/60">
              <div className="text-center">
                <Link
                  href="/zona/pedregal"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors group"
                >
                  <span>Ver {categories.length - 10} categorías más</span>
                  <LucideIcons.ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
