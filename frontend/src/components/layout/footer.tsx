
import Link from 'next/link';
import { Logo } from '@/components/logo';
import * as LucideIcons from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 py-12 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo className="h-10 w-auto text-primary" />
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Conectando tu zona con los mejores negocios locales. Descubre, explora y encuentra todo cerca de ti.
            </p>
          </div>

          {/* Enlaces útiles */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Enlaces Útiles</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/terminos" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Términos y Condiciones
              </Link>
              <Link href="/privacidad" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Aviso de Privacidad
              </Link>
              <Link href="/contacto" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Centro de Ayuda destacado */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">¿Necesitas Ayuda?</h3>
            <Link
              href="/ayuda"
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group cursor-pointer"
            >
              <LucideIcons.HelpCircle className="h-5 w-5" />
              <div className="text-left">
                <div className="text-sm">Centro de Ayuda</div>
                <div className="text-xs text-white/80">Soporte completo</div>
              </div>
              <LucideIcons.ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-xs text-gray-500">
              Preguntas frecuentes, contacto directo y más
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-6 mt-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} CercaDeTi. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
