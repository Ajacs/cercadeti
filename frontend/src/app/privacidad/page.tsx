export default function PrivacidadPage() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-8">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-bold text-gray-900 mb-4">
            Aviso de Privacidad
          </h1>
          <p className="text-gray-600">
            Última actualización: Enero 2025
          </p>
        </div>

        <div className="prose prose-gray max-w-none">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-blue-800 mb-0">
              <strong>Nota:</strong> Este es contenido placeholder. El aviso de privacidad real deberá cumplir con las regulaciones locales y ser revisado por el equipo legal antes de la implementación final.
            </p>
          </div>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">1. Responsable del Tratamiento</h2>
            <p className="text-gray-700">
              CercaDeTi es responsable del tratamiento de sus datos personales. Puede contactarnos en: privacidad@cercadeti.com
            </p>

            <h2 className="text-2xl font-bold text-gray-900">2. Datos que Recopilamos</h2>
            <p className="text-gray-700">
              Recopilamos los siguientes tipos de información:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Información de uso:</strong> Páginas visitadas, búsquedas realizadas, tiempo de navegación</li>
              <li><strong>Información técnica:</strong> Dirección IP, tipo de navegador, dispositivo utilizado</li>
              <li><strong>Información de ubicación:</strong> Zona geográfica seleccionada (cuando se proporciona voluntariamente)</li>
              <li><strong>Información de contacto:</strong> Email y teléfono (solo si se proporciona para contacto)</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900">3. Finalidad del Tratamiento</h2>
            <p className="text-gray-700">
              Utilizamos sus datos para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Proporcionar información relevante sobre negocios locales</li>
              <li>Mejorar la experiencia del usuario en la plataforma</li>
              <li>Realizar análisis estadísticos y de uso</li>
              <li>Responder a consultas y brindar soporte</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900">4. Base Legal</h2>
            <p className="text-gray-700">
              El tratamiento de sus datos se basa en su consentimiento y en el interés legítimo de proporcionar servicios de información local.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">5. Compartir Información</h2>
            <p className="text-gray-700">
              No vendemos ni compartimos sus datos personales con terceros, excepto:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Cuando sea requerido por autoridades legales</li>
              <li>Con proveedores de servicios que nos ayudan a operar la plataforma</li>
              <li>Con su consentimiento explícito</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900">6. Retención de Datos</h2>
            <p className="text-gray-700">
              Conservamos sus datos personales solo durante el tiempo necesario para cumplir con las finalidades descritas o según lo requiera la ley.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">7. Sus Derechos</h2>
            <p className="text-gray-700">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Acceder a sus datos personales</li>
              <li>Rectificar información incorrecta</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Limitar el procesamiento de sus datos</li>
              <li>Revocar su consentimiento</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900">8. Cookies y Tecnologías Similares</h2>
            <p className="text-gray-700">
              Utilizamos cookies y tecnologías similares para mejorar la funcionalidad de la plataforma y analizar el uso del sitio. Puede configurar su navegador para rechazar cookies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">9. Seguridad</h2>
            <p className="text-gray-700">
              Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">10. Contacto</h2>
            <p className="text-gray-700">
              Para ejercer sus derechos o hacer preguntas sobre este aviso de privacidad, contáctenos en: privacidad@cercadeti.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
