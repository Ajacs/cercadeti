"use client";

import * as LucideIcons from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function AyudaPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto px-4 max-w-7xl py-8">
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <LucideIcons.HelpCircle className="h-4 w-4" />
            Centro de Ayuda
          </div>
          <h1 className="text-5xl font-headline font-bold text-gray-900 mb-6">
            ¿En qué podemos ayudarte?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Encuentra respuestas rápidas, contacta con nosotros o explora nuestras opciones de asistencia
          </p>

          {/* Búsqueda rápida */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <LucideIcons.Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Busca tu pregunta o describe tu problema..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-base focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Opciones de Ayuda */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Búsquedas Populares */}
            <div className="group bg-white rounded-2xl p-8 border border-blue-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <LucideIcons.TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl">Búsquedas Populares</h3>
                  <p className="text-sm text-gray-500">Lo más buscado</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  'Cómo registrar mi negocio',
                  'Actualizar información',
                  'Reportar información incorrecta',
                  'Horarios de atención'
                ].map((term) => (
                  <button
                    key={term}
                    className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 transition-colors hover:bg-blue-50 px-3 py-2 rounded-lg font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Contacto Directo */}
            <div className="group bg-white rounded-2xl p-8 border border-green-100 hover:border-green-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <LucideIcons.MessageCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl">Contacto Directo</h3>
                  <p className="text-sm text-gray-500">Soporte personal</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3 text-green-600 font-semibold mb-2">
                    <LucideIcons.Phone className="h-4 w-4" />
                    <span>Teléfono</span>
                  </div>
                  <p className="text-sm text-gray-600">+52 (664) 123-4567</p>
                  <p className="text-xs text-gray-500">Lun-Vie 9AM-6PM</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3 text-green-600 font-semibold mb-2">
                    <LucideIcons.Mail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                  <p className="text-sm text-gray-600">ayuda@cercadeti.com</p>
                  <p className="text-xs text-gray-500">Respuesta en 24h</p>
                </div>
              </div>
            </div>

            {/* Sugerir Negocio */}
            <div className="group bg-white rounded-2xl p-8 border border-orange-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <LucideIcons.Plus className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl">Agregar Negocio</h3>
                  <p className="text-sm text-gray-500">Registra tu empresa</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">¿Tu negocio no aparece en nuestro directorio?</p>
                <Link href="/registro-negocio">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors">
                    Registrar Negocio
                  </button>
                </Link>
                <div className="flex items-center gap-2 text-orange-600 text-sm">
                  <LucideIcons.Clock className="h-3 w-3" />
                  <span>Proceso gratuito y rápido</span>
                </div>
              </div>
            </div>

            {/* Explorar Zonas */}
            <div className="group bg-white rounded-2xl p-8 border border-purple-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <LucideIcons.MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xl">Otras Zonas</h3>
                  <p className="text-sm text-gray-500">Explora más áreas</p>
                </div>
              </div>
              <div className="space-y-3">
                {['Zona Centro', 'Playas de Tijuana', 'La Mesa', 'Otay'].map((zone) => (
                  <button
                    key={zone}
                    className="block w-full text-left text-sm text-gray-700 hover:text-purple-600 transition-colors hover:bg-purple-50 px-3 py-2 rounded-lg font-medium"
                  >
                    {zone}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-3xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-headline font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-600">
              Encuentra respuestas a las dudas más comunes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "¿Cómo puedo registrar mi negocio?",
                answer: "Puedes registrar tu negocio de forma gratuita contactándonos directamente o enviando un email con la información básica de tu empresa."
              },
              {
                question: "¿Cómo actualizo la información de mi negocio?",
                answer: "Contacta con nuestro equipo de soporte con los datos actualizados y nosotros nos encargaremos de hacer los cambios necesarios."
              },
              {
                question: "¿El servicio tiene algún costo?",
                answer: "El registro básico y la aparición en nuestro directorio es completamente gratuito. Ofrecemos opciones premium para mayor visibilidad."
              },
              {
                question: "¿Qué zonas están disponibles?",
                answer: "Actualmente cubrimos El Pedregal, Zona Centro, Playas de Tijuana, La Mesa y Otay. Constantemente expandimos a nuevas áreas."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-gradient-to-r from-primary to-orange-600 text-white rounded-3xl p-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-headline font-bold mb-4">
              ¿Aún necesitas ayuda?
            </h2>
            <p className="text-white/90 mb-8">
              Nuestro equipo está aquí para ayudarte. No dudes en contactarnos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="tel:+526641234567">
                <button className="bg-white text-primary px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 justify-center">
                  <LucideIcons.Phone className="h-4 w-4" />
                  Llamar Ahora
                </button>
              </Link>
              <Link href="mailto:ayuda@cercadeti.com">
                <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors flex items-center gap-2 justify-center">
                  <LucideIcons.Mail className="h-4 w-4" />
                  Enviar Email
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
