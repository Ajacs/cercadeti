'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Función para manejar cambios en el formulario
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Función para validar el formulario
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Ingresa un email válido';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'El asunto es requerido';
    }

    if (!formData.message.trim()) {
      errors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Función para manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}/api/contact-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            submitted_at: new Date().toISOString(),
            status: 'new'
          }
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || 'Error al enviar el mensaje');
      }

      setSuccess(true);

    } catch (error: any) {
      setError(error.message || 'Hubo un error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h3 className="text-2xl font-semibold text-green-800">¡Mensaje Enviado!</h3>
              <p className="text-gray-600">
                Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos pronto.
              </p>
              <div className="pt-4 space-y-2">
                <Link href="/">
                  <Button className="w-full">
                    Volver al Inicio
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSuccess(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: '',
                      message: ''
                    });
                  }}
                >
                  Enviar Otro Mensaje
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="mb-8">
              <Logo className="h-16 w-16 mx-auto mb-6" />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Contáctanos</h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
                ¿Tienes alguna pregunta o sugerencia? Estamos aquí para ayudarte
              </p>
            </div>
          </div>
        </div>

        {/* Contenido principal con dos columnas */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Columna izquierda - Información de contacto */}
          <div className="space-y-8">
            {/* Información de contacto */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">contacto@cercadeti.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-gray-600">+52 55 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium">Horario de Atención</p>
                    <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle>Preguntas Frecuentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">¿Cómo puedo registrar mi negocio?</h4>
                  <p className="text-sm text-gray-600">
                    Puedes registrar tu negocio desde nuestra página de registro. El proceso es gratuito y toma entre 1-3 días hábiles.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">¿Hay algún costo por aparecer en la plataforma?</h4>
                  <p className="text-sm text-gray-600">
                    El listado básico es gratuito. Ofrecemos planes premium con características adicionales.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">¿Cómo puedo actualizar la información de mi negocio?</h4>
                  <p className="text-sm text-gray-600">
                    Una vez aprobado tu negocio, podrás acceder a un panel de administración para actualizar tu información.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna derecha - Formulario */}
          <div className="lg:sticky lg:top-8">
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold">Envíanos un mensaje</CardTitle>
                <CardDescription>Completa el formulario y te responderemos pronto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Mostrar errores generales */}
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Nombre */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium flex items-center gap-1">
                      Nombre Completo
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Tu nombre completo"
                      className={`h-12 text-base ${fieldErrors.name ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.name && (
                      <p className="text-sm text-red-600">{fieldErrors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium flex items-center gap-1">
                      Email
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="tu@email.com"
                        className={`pl-10 h-12 text-base ${fieldErrors.email ? 'border-red-500' : ''}`}
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {fieldErrors.email && (
                      <p className="text-sm text-red-600">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-medium">
                      Teléfono
                      <span className="text-gray-400 text-sm ml-1">(opcional)</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+52 55 1234 5678"
                        className="pl-10 h-12 text-base"
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Asunto */}
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-base font-medium flex items-center gap-1">
                      Asunto
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="¿En qué podemos ayudarte?"
                      className={`h-12 text-base ${fieldErrors.subject ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.subject && (
                      <p className="text-sm text-red-600">{fieldErrors.subject}</p>
                    )}
                  </div>

                  {/* Mensaje */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base font-medium flex items-center gap-1">
                      Mensaje
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={5}
                      className={`text-base ${fieldErrors.message ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.message && (
                      <p className="text-sm text-red-600">{fieldErrors.message}</p>
                    )}
                  </div>

                  {/* Botón de envío */}
                  <div className="pt-6 border-t border-gray-200">
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium h-14 transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          Enviando mensaje...
                        </>
                      ) : (
                        'Enviar Mensaje'
                      )}
                    </Button>
                  </div>

                  {/* Información adicional */}
                  <div className="text-center pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        📧 Te responderemos en un plazo máximo de 24 horas
                      </p>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}