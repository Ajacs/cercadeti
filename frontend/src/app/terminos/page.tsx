export default function TerminosPage() {
  return (
    <div className="container mx-auto px-4 max-w-4xl py-8">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-bold text-gray-900 mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-gray-600">
            Última actualización: Enero 2025
          </p>
        </div>

        <div className="prose prose-gray max-w-none">
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-0">
              <strong>Nota:</strong> Este es contenido placeholder. Los términos y condiciones reales deberán ser revisados y aprobados por el equipo legal antes de la implementación final.
            </p>
          </div>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">1. Aceptación de los Términos</h2>
            <p className="text-gray-700">
              Al acceder y utilizar la plataforma CercaDeTi, usted acepta cumplir con estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">2. Descripción del Servicio</h2>
            <p className="text-gray-700">
              CercaDeTi es una plataforma digital que conecta usuarios con negocios locales, proporcionando información sobre productos, servicios y ofertas disponibles en diferentes zonas geográficas.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">3. Uso Aceptable</h2>
            <p className="text-gray-700">
              Los usuarios se comprometen a utilizar la plataforma de manera responsable y legal. Está prohibido:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Proporcionar información falsa o engañosa</li>
              <li>Violar derechos de propiedad intelectual</li>
              <li>Realizar actividades fraudulentas o ilegales</li>
              <li>Interferir con el funcionamiento normal de la plataforma</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900">4. Información de Negocios</h2>
            <p className="text-gray-700">
              La información sobre negocios es proporcionada por terceros. Aunque nos esforzamos por mantener la información actualizada y precisa, no garantizamos la exactitud completa de todos los datos.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">5. Limitación de Responsabilidad</h2>
            <p className="text-gray-700">
              CercaDeTi no será responsable por daños directos, indirectos, incidentales o consecuentes que resulten del uso de la plataforma.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">6. Modificaciones</h2>
            <p className="text-gray-700">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la plataforma.
            </p>

            <h2 className="text-2xl font-bold text-gray-900">7. Contacto</h2>
            <p className="text-gray-700">
              Para preguntas sobre estos términos, contáctanos en: legal@cercadeti.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
