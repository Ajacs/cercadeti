'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCategories } from '@/hooks/use-categories';
import { useBusinessRegistration } from '@/hooks/use-business-registration';
import {
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowLeft
} from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function RegistroNegocioPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

      // Estados del formulario
      const [formData, setFormData] = useState({
        businessName: '',
        description: '',
        categoryId: '',
        customCategoryName: '',
        phone: '',
        email: '',
        address: '',
        website: '',
        logo: null as File | null
      });

  // Cargar categorías y hook de registro
  const { categories, loading: categoriesLoading } = useCategories();
  const { submitRegistration, loading: registrationLoading, error: registrationError } = useBusinessRegistration();

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

  // Función para manejar subida de logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setFieldErrors(prev => ({
          ...prev,
          logo: 'Solo se permiten archivos de imagen'
        }));
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFieldErrors(prev => ({
          ...prev,
          logo: 'El archivo debe ser menor a 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        logo: file
      }));

      // Limpiar error
      if (fieldErrors.logo) {
        setFieldErrors(prev => ({
          ...prev,
          logo: ''
        }));
      }
    }
  };

  // Función para validar el formulario
  const validateForm = () => {
    const errors: Record<string, string> = {};

        if (!formData.businessName.trim()) {
          errors.businessName = 'El nombre del negocio es requerido';
        }

        if (!formData.description.trim()) {
          errors.description = 'La descripción del negocio es requerida';
        } else if (formData.description.length < 10) {
          errors.description = 'La descripción debe tener al menos 10 caracteres';
        }

        if (!formData.categoryId) {
          errors.categoryId = 'Selecciona una categoría';
        }

    if (formData.categoryId === 'other' && !formData.customCategoryName.trim()) {
      errors.customCategoryName = 'Especifica el nombre de tu categoría';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es requerido';
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      errors.phone = 'Ingresa un número de teléfono válido';
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Ingresa un email válido';
    }

    if (!formData.address.trim()) {
      errors.address = 'La dirección es requerida';
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      errors.website = 'Ingresa una URL válida (ej: https://www.ejemplo.com)';
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
          const registrationData = {
            name: formData.businessName,
            description: formData.description,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            website: formData.website,
            categoryId: formData.categoryId !== 'other' ? formData.categoryId : undefined,
            customCategoryName: formData.categoryId === 'other' ? formData.customCategoryName : undefined,
            logo: formData.logo
          };

      const result = await submitRegistration(registrationData);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.message);
      }

    } catch (error: any) {
      setError(error.message || 'Hubo un error al enviar el registro. Intenta de nuevo.');
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
              <h3 className="text-2xl font-semibold text-green-800">¡Registro Enviado!</h3>
              <p className="text-gray-600">
                Tu solicitud de registro ha sido enviada exitosamente.
                Te contactaremos pronto para validar tu información.
              </p>
              <div className="pt-4">
                <Link href="/">
                  <Button className="w-full">
                    Volver al Inicio
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4">
      <div className="max-w-6xl mx-auto pb-8">
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
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Registra tu Negocio</h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">Únete a nuestra plataforma y haz que más clientes encuentren tu negocio</p>
            </div>
          </div>
        </div>

        {/* Contenido principal con dos columnas */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Columna izquierda - Beneficios */}
          <div className="space-y-8">
            {/* Imagen principal */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h4a2 2 0 012 2v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Haz crecer tu negocio</h2>
                    <p className="text-blue-100 text-lg">Conecta con miles de clientes potenciales en tu zona</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de beneficios */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">¿Por qué registrar tu negocio?</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Mayor visibilidad online</h4>
                    <p className="text-gray-600 text-sm">Aparece en las búsquedas de clientes cercanos a tu ubicación</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Contacto directo</h4>
                    <p className="text-gray-600 text-sm">Los clientes pueden llamarte o escribirte directamente</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Ubicación precisa</h4>
                    <p className="text-gray-600 text-sm">Ayuda a los clientes a encontrar fácilmente tu negocio</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Presencia digital</h4>
                    <p className="text-gray-600 text-sm">Mejora tu presencia online sin necesidad de sitio web</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Columna derecha - Formulario */}
          <div className="lg:sticky lg:top-8">
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold">Información del negocio</CardTitle>
                <CardDescription>Completa los datos para registrar tu negocio</CardDescription>
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

                  {/* Nombre del Negocio */}
                  <div className="space-y-3">
                    <Label htmlFor="businessName" className="text-base font-medium flex items-center gap-1">
                      Nombre del Negocio
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                        placeholder="Ej: Sushi Central"
                        className={`pl-10 h-12 text-base ${fieldErrors.businessName ? 'border-red-500' : ''}`}
                      />
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    {fieldErrors.businessName && (
                      <p className="text-sm text-red-600 mt-1">{fieldErrors.businessName}</p>
                    )}
                  </div>

                  {/* Descripción del Negocio */}
                  <div className="space-y-3">
                    <Label htmlFor="description" className="text-base font-medium flex items-center gap-1">
                      Descripción del Negocio
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe tu negocio, qué servicios ofreces, qué te hace especial..."
                        rows={4}
                        className={`text-base resize-none ${fieldErrors.description ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {fieldErrors.description && (
                      <p className="text-sm text-red-600 mt-1">{fieldErrors.description}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Mínimo 10 caracteres. Esta descripción aparecerá en tu perfil público.
                    </p>
                  </div>

              {/* Categoría */}
              <div className="space-y-3">
                <Label htmlFor="categoryId" className="text-base font-medium flex items-center gap-1">
                  Categoría del Negocio
                  <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.categoryId} onValueChange={(value) => handleInputChange('categoryId', value)}>
                  <SelectTrigger className={`h-12 text-base ${fieldErrors.categoryId ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Selecciona la categoría de tu negocio" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesLoading ? (
                      <SelectItem value="loading" disabled>Cargando categorías...</SelectItem>
                    ) : (
                      <>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">Otra (especificar)</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                {fieldErrors.categoryId && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.categoryId}</p>
                )}

                {/* Campo para categoría personalizada */}
                {formData.categoryId === 'other' && (
                  <div className="mt-3">
                    <Label htmlFor="customCategoryName" className="text-base font-medium flex items-center gap-1">
                      Especifica tu categoría
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="customCategoryName"
                      value={formData.customCategoryName}
                      onChange={(e) => handleInputChange('customCategoryName', e.target.value)}
                      placeholder="Ej: Taller de bicicletas, Estética canina, etc."
                      className={`h-12 text-base ${fieldErrors.customCategoryName ? 'border-red-500' : ''}`}
                    />
                    {fieldErrors.customCategoryName && (
                      <p className="text-sm text-red-600 mt-1">{fieldErrors.customCategoryName}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Teléfono/WhatsApp */}
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-base font-medium flex items-center gap-1">
                  Teléfono/WhatsApp
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+52 55 1234 5678"
                    className={`pl-10 h-12 text-base ${fieldErrors.phone ? 'border-red-500' : ''}`}
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {fieldErrors.phone && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-3">
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
                    placeholder="contacto@negocio.com"
                    className={`pl-10 h-12 text-base ${fieldErrors.email ? 'border-red-500' : ''}`}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {fieldErrors.email && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>
                )}
              </div>

              {/* Dirección */}
              <div className="space-y-3">
                <Label htmlFor="address" className="text-base font-medium flex items-center gap-1">
                  Dirección
                  <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Av. Reforma 123, Col. Juárez, CDMX"
                    className={`pl-10 h-12 text-base ${fieldErrors.address ? 'border-red-500' : ''}`}
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {fieldErrors.address && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.address}</p>
                )}
              </div>

              {/* Sitio Web */}
              <div className="space-y-3">
                <Label htmlFor="website" className="text-base font-medium">
                  Sitio Web
                  <span className="text-gray-400 text-sm ml-1">(opcional)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://www.negocio.com"
                    className={`pl-10 h-12 text-base ${fieldErrors.website ? 'border-red-500' : ''}`}
                  />
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {fieldErrors.website && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.website}</p>
                )}
              </div>

              {/* Campo para subir logo */}
              <div className="space-y-4">
                <Label htmlFor="logo" className="text-base font-medium">
                  Logo del Negocio
                  <span className="text-gray-400 text-sm ml-1">(opcional)</span>
                </Label>
                <div className="space-y-3">
                  <input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <Label
                    htmlFor="logo"
                    className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="text-center p-4">
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                      <p className="text-base text-gray-600 mb-1">
                        {formData.logo ? formData.logo.name : 'Haz clic para subir tu logo'}
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG hasta 5MB
                      </p>
                    </div>
                  </Label>
                  {fieldErrors.logo && (
                    <p className="text-sm text-red-600 mt-2">{fieldErrors.logo}</p>
                  )}
                  {formData.logo && (
                    <div className="text-sm text-green-600 flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                      <CheckCircle className="h-4 w-4" />
                      Logo seleccionado: {formData.logo.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Botón de envío */}
              <div className="pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium h-14 transition-colors"
                  disabled={isSubmitting || registrationLoading}
                >
                  {(isSubmitting || registrationLoading) ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Enviando registro...
                    </>
                  ) : (
                    'Enviar Registro'
                  )}
                </Button>
              </div>

              {/* Información adicional */}
              <div className="text-center pt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    📋 El proceso de validación toma entre 1-3 días hábiles
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Te contactaremos por email o teléfono una vez validada tu información
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
