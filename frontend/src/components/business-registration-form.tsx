'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  X
} from 'lucide-react';

interface BusinessRegistrationFormProps {
  onClose?: () => void;
}

export function BusinessRegistrationForm({ onClose }: BusinessRegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isValidating, setIsValidating] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualAddress, setManualAddress] = useState('');

  // Estados del formulario
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    hours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    images: [] as File[]
  });

  // Función para obtener ubicación actual
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no soportada'));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    });
  };

  // Función para convertir coordenadas a dirección
  const getAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        return data.display_name;
      }
      throw new Error('No se pudo obtener la dirección');
    } catch (error) {
      throw error;
    }
  };

  // Función para determinar zona
  const determineZone = (address: string) => {
    const zones = {
      'pedregal': ['pedregal', 'san ángel'],
      'condesa': ['condesa', 'hipódromo'],
      'roma norte': ['roma norte', 'roma'],
      'polanco': ['polanco', 'anáhuac'],
      'roma sur': ['roma sur', 'doctores']
    };
    
    const addressLower = address.toLowerCase();
    
    for (const [zone, keywords] of Object.entries(zones)) {
      if (keywords.some(keyword => addressLower.includes(keyword))) {
        return zone;
      }
    }
    
    return null;
  };

  // Función para validar ubicación
  const validateLocation = async () => {
    setIsValidating(true);
    setLocationError(null);
    
    try {
      const coords = await getCurrentLocation();
      const address = await getAddressFromCoords(coords.lat, coords.lng);
      const zone = determineZone(address);
      
      if (!zone) {
        setLocationError('Por el momento no contamos con cobertura para tu zona. Estamos trabajando para expandir nuestro servicio a más áreas.');
        return;
      }
      
      setLocation({
        address,
        zone,
        coordinates: coords
      });


    } catch (error: any) {
      let errorMessage = 'No pudimos verificar tu ubicación. Intenta de nuevo o ingresa tu dirección manualmente.';
      
      if (error.code === 1) {
        errorMessage = 'Necesitamos tu ubicación para completar el registro. Por favor, permite el acceso a la ubicación.';
      } else if (error.code === 2) {
        errorMessage = 'No se pudo obtener tu ubicación. Intenta de nuevo.';
      } else if (error.code === 3) {
        errorMessage = 'La verificación tardó demasiado. Intenta de nuevo.';
      }
      
      setLocationError(errorMessage);
      setShowManualInput(true);
    } finally {
      setIsValidating(false);
    }
  };

  // Función para validar dirección manual
  const validateManualAddress = async () => {
    if (!manualAddress.trim()) {
      setLocationError('Por favor ingresa una dirección válida');
      return;
    }
    
    setIsValidating(true);
    setLocationError(null);
    
    try {
      const zone = determineZone(manualAddress);
      
      if (!zone) {
        setLocationError('Por el momento no contamos con cobertura para tu zona. Estamos trabajando para expandir nuestro servicio a más áreas.');
        return;
      }
      
      setLocation({
        address: manualAddress,
        zone,
        coordinates: null
      });
      
    } catch (error) {
      setLocationError('No pudimos validar esa dirección. Verifica que esté completa y correcta.');
    } finally {
      setIsValidating(false);
    }
  };

  // Función para manejar cambios en el formulario
  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Función para manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí implementarías el envío del formulario
  };

  // Función para manejar archivos de imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Registra tu Negocio</CardTitle>
            <CardDescription>
              Completa la información para aparecer en nuestro directorio
            </CardDescription>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Paso 1: Validación de Ubicación */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Verificar Ubicación</h3>
                  <p className="text-gray-600">
                    Para completar tu registro, necesitamos verificar tu ubicación
                  </p>
                </div>

                {!location ? (
                  <div className="space-y-4">
                    <Button
                      type="button"
                      onClick={validateLocation}
                      disabled={isValidating}
                      className="w-full"
                    >
                      {isValidating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Verificando...
                        </>
                      ) : (
                        <>
                          <MapPin className="h-4 w-4 mr-2" />
                          Verificar Mi Ubicación
                        </>
                      )}
                    </Button>

                    {locationError && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          {locationError}
                          {locationError.includes('cobertura') && (
                            <div className="mt-3">
                              <p className="text-sm mb-2">¿Te interesa que te notifiquemos cuando lleguemos a tu zona?</p>
                              <Button variant="outline" size="sm">
                                Sí, notifícame
                              </Button>
                            </div>
                          )}
                        </AlertDescription>
                      </Alert>
                    )}

                    {showManualInput && (
                      <div className="space-y-3">
                        <Label htmlFor="manual-address">O ingresa tu dirección manualmente:</Label>
                        <Input
                          id="manual-address"
                          placeholder="Ej: Av. Reforma 123, Col. Juárez, CDMX"
                          value={manualAddress}
                          onChange={(e) => setManualAddress(e.target.value)}
                        />
                        <Button
                          type="button"
                          onClick={validateManualAddress}
                          disabled={isValidating || !manualAddress.trim()}
                          variant="outline"
                          className="w-full"
                        >
                          {isValidating ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Validando...
                            </>
                          ) : (
                            'Validar Dirección'
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-green-800">Ubicación verificada</p>
                        <p className="text-sm text-green-700 mt-1">
                          <strong>Dirección:</strong> {location.address}
                        </p>
                        <p className="text-sm text-green-700">
                          <strong>Zona:</strong> {location.zone}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={() => setLocation(null)}
                      variant="outline"
                      size="sm"
                      className="mt-3"
                    >
                      Cambiar Ubicación
                    </Button>
                  </div>
                )}

                {location && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      disabled={!location}
                    >
                      Continuar
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Paso 2: Información Básica */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Información Básica</h3>
                  <p className="text-gray-600">
                    Cuéntanos sobre tu negocio
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Nombre del Negocio *</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      placeholder="Ej: Sushi Central"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Categoría *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Selecciona una categoría</option>
                      <option value="restaurantes">Restaurantes</option>
                      <option value="supermercados">Supermercados</option>
                      <option value="servicios-hogar">Servicios Hogar</option>
                      <option value="mascotas">Mascotas</option>
                      <option value="transporte">Transporte</option>
                      <option value="salud">Salud</option>
                      <option value="belleza">Belleza</option>
                      <option value="deportes">Deportes</option>
                      <option value="educacion">Educación</option>
                      <option value="entretenimiento">Entretenimiento</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe tu negocio, qué servicios ofreces, qué te hace especial..."
                    rows={3}
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    Atrás
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    disabled={!formData.businessName || !formData.category || !formData.description}
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {/* Paso 3: Información de Contacto */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Información de Contacto</h3>
                  <p className="text-gray-600">
                    Cómo pueden contactarte tus clientes
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+52 55 1234 5678"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="contacto@negocio.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Sitio Web</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://www.negocio.com"
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                  >
                    Atrás
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    disabled={!formData.phone || !formData.email}
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {/* Paso 4: Horarios y Fotos */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Horarios y Fotos</h3>
                  <p className="text-gray-600">
                    Horarios de atención y fotos de tu negocio
                  </p>
                </div>

                <div>
                  <Label>Horarios de Atención</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {Object.entries(formData.hours).map(([day, hours]) => (
                      <div key={day} className="flex items-center gap-2">
                        <Label className="w-20 text-sm capitalize">{day}:</Label>
                        <Input
                          value={hours}
                          onChange={(e) => handleInputChange(`hours.${day}`, e.target.value)}
                          placeholder="9:00 - 18:00"
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="images">Fotos del Negocio</Label>
                  <div className="mt-2">
                    <input
                      id="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Label
                      htmlFor="images"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
                    >
                      <div className="text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Haz clic para subir fotos
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG hasta 10MB
                        </p>
                      </div>
                    </Label>
                  </div>
                  {formData.images.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-2">
                        {formData.images.length} foto(s) seleccionada(s)
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(3)}
                  >
                    Atrás
                  </Button>
                  <Button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Enviar Registro
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}




