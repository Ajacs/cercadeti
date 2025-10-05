'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  X, 
  MapPin, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  RefreshCw
} from 'lucide-react';

interface SimpleRegistrationFormProps {
  onClose?: () => void;
}

export function SimpleRegistrationForm({ onClose }: SimpleRegistrationFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    restaurantName: '',
    foodType: '',
    address: '',
    phonePrefix: '+52',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = 'El nombre del restaurante es requerido';
    }

    if (!formData.foodType.trim()) {
      newErrors.foodType = 'El tipo de comida es requerido';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'El número de teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Ingresa un número de teléfono válido (10 dígitos)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Aquí iría la lógica para enviar los datos al backend
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('¡Registro enviado exitosamente! Te contactaremos pronto para validar tu información.');
      onClose?.();
    } catch (error) {
      alert('Hubo un error al enviar el registro. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para manejar cambios en los campos
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Opciones para el tipo de comida
  const foodTypes = [
    'Comida Mexicana',
    'Comida Italiana',
    'Comida China',
    'Comida Japonesa',
    'Comida Árabe',
    'Comida India',
    'Pizza',
    'Hamburguesas',
    'Tacos',
    'Sushi',
    'Mariscos',
    'Carnes',
    'Vegetariana',
    'Vegana',
    'Postres',
    'Café',
    'Otro'
  ];

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

  // Función para convertir coordenadas a dirección con múltiples fuentes
  const getAddressFromCoords = async (lat: number, lng: number) => {
    // Intentar con OpenStreetMap primero
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&zoom=18`
      );
      const data = await response.json();


      if (data && data.display_name) {
        return {
          address: data.display_name,
          source: 'OpenStreetMap',
          details: data.address
        };
      }
    } catch (error) {
      // Error handled silently
    }

    // Fallback: Usar una API de geocoding más precisa (gratuita)
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=es`
      );
      const data = await response.json();

      if (data && data.localityInfo) {
        const address = [
          data.principalSubdivision,
          data.city,
          data.locality,
          data.countryName
        ].filter(Boolean).join(', ');

        return {
          address: address || data.locality || 'Ubicación no identificada',
          source: 'BigDataCloud',
          details: data
        };
      }
    } catch (error) {
      // Error handled silently
    }

    // Último fallback: Usar coordenadas aproximadas
    return {
      address: `Ubicación: ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
      source: 'Coordenadas',
      details: { lat, lng }
    };
  };

  // Función para determinar zona con mayor precisión
  const determineZone = (addressData: any) => {
    const address = addressData.address || '';
    const details = addressData.details || {};
    const addressLower = address.toLowerCase();
    
    // Zonas con keywords más específicos
    const zones = {
      'pedregal': [
        'pedregal', 'san ángel', 'pedregal de san ángel',
        'pedregal de carrillo puerto', 'pedregal de santa ursula',
        'pedregal de carrillo puerto', 'pedregal de santa ursula'
      ],
      'condesa': [
        'condesa', 'hipódromo', 'condesa del valle',
        'hipódromo condesa', 'colonia condesa', 'condesa del valle'
      ],
      'roma norte': [
        'roma norte', 'roma', 'colonia roma norte',
        'colonia roma', 'roma-cuauhtémoc', 'roma norte'
      ],
      'polanco': [
        'polanco', 'anáhuac', 'polanco v', 'polanco iv',
        'colonia polanco', 'polanco chapultepec', 'polanco'
      ],
      'roma sur': [
        'roma sur', 'doctores', 'colonia roma sur',
        'colonia doctores', 'centro histórico', 'roma sur'
      ]
    };
    
    // Buscar en la dirección completa
    for (const [zone, keywords] of Object.entries(zones)) {
      if (keywords.some(keyword => addressLower.includes(keyword))) {
        return zone;
      }
    }
    
    // Buscar en detalles específicos de OpenStreetMap
    if (details) {
      const searchFields = [
        details.suburb,
        details.neighbourhood,
        details.quarter,
        details.city_district,
        details.district,
        details.city,
        details.town,
        details.village
      ].filter(Boolean);
      
      for (const field of searchFields) {
        const fieldLower = field.toLowerCase();
        for (const [zone, keywords] of Object.entries(zones)) {
          if (keywords.some(keyword => fieldLower.includes(keyword))) {
            return zone;
          }
        }
      }
    }
    
    // Buscar por coordenadas aproximadas (CDMX)
    if (addressData.coordinates) {
      const { lat, lng } = addressData.coordinates;
      
      // Coordenadas aproximadas de las zonas en CDMX
      const zoneBounds = {
        'pedregal': { lat: [19.3, 19.35], lng: [-99.25, -99.15] },
        'condesa': { lat: [19.4, 19.42], lng: [-99.18, -99.15] },
        'roma norte': { lat: [19.41, 19.43], lng: [-99.16, -99.13] },
        'polanco': { lat: [19.43, 19.45], lng: [-99.2, -99.17] },
        'roma sur': { lat: [19.4, 19.42], lng: [-99.16, -99.13] }
      };
      
      for (const [zone, bounds] of Object.entries(zoneBounds)) {
        if (lat >= bounds.lat[0] && lat <= bounds.lat[1] &&
            lng >= bounds.lng[0] && lng <= bounds.lng[1]) {
          return zone;
        }
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
      } else if (error.message?.includes('permissions policy') || error.message?.includes('disabled')) {
        errorMessage = 'La geolocalización está deshabilitada en tu navegador. Por favor, ingresa tu dirección manualmente.';
      }
      
      setLocationError(errorMessage);
      setShowManualInput(true);
    } finally {
      setIsValidating(false);
    }
  };

  // Función para obtener sugerencias de direcciones (versión gratuita)
  const getAddressSuggestions = async (input: string) => {
    if (!input.trim() || input.length < 3) {
      setAddressSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    
    try {
      // Usar OpenStreetMap Nominatim para autocomplete (gratuito)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&countrycodes=mx&limit=5&addressdetails=1`
      );
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        // Convertir formato de OpenStreetMap a formato similar a Google Places
        const suggestions = data.map((item: any) => ({
          description: item.display_name,
          place_id: item.place_id,
          structured_formatting: {
            main_text: item.name || item.display_name.split(',')[0],
            secondary_text: item.display_name.split(',').slice(1).join(',').trim()
          },
          geometry: {
            location: {
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon)
            }
          },
          address_components: item.address
        }));
        
        setAddressSuggestions(suggestions);
        setShowSuggestions(true);
      } else {
        setAddressSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      setAddressSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Función para manejar la selección de una sugerencia
  const handleAddressSelection = async (suggestion: any) => {
    setManualAddress(suggestion.description);
    setShowSuggestions(false);
    setAddressSuggestions([]);
    
    try {
      // Crear objeto de datos para la función determineZone
      const addressData = {
        address: suggestion.description,
        details: suggestion.address_components,
        coordinates: suggestion.geometry?.location
      };
      
      const zone = determineZone(addressData);
      
      if (zone) {
        setLocation({
          address: suggestion.description,
          zone,
          coordinates: suggestion.geometry?.location,
          source: 'OpenStreetMap',
          details: suggestion.address_components
        });
      } else {
        setLocationError('Por el momento no contamos con cobertura para tu zona. Estamos trabajando para expandir nuestro servicio a más áreas.');
      }
    } catch (error) {
      setLocationError('No pudimos validar esa dirección. Intenta de nuevo.');
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
      // Crear objeto de datos para la función determineZone
      const addressData = {
        address: manualAddress,
        details: {}
      };
      
      const zone = determineZone(addressData);
      
      if (!zone) {
        setLocationError('Por el momento no contamos con cobertura para tu zona. Estamos trabajando para expandir nuestro servicio a más áreas.');
        return;
      }
      
      setLocation({
        address: manualAddress,
        zone,
        coordinates: null,
        source: 'Manual',
        details: {}
      });
      
    } catch (error) {
      setLocationError('No pudimos validar esa dirección. Verifica que esté completa y correcta.');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Registra tu Negocio</CardTitle>
            <CardDescription>
              Paso {step} de 3
            </CardDescription>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">Verificando Ubicación</h3>
                <p className="text-gray-600">
                  Estamos verificando tu ubicación para completar el registro
                </p>
              </div>

              {/* Estado de validación automática */}
              {isValidatingOnLoad && (
                <div className="text-center py-8">
                  <Loader2 className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
                  <p className="text-gray-600">Verificando tu ubicación...</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Por favor, permite el acceso a tu ubicación si se te solicita
                  </p>
                </div>
              )}

              {/* Ubicación verificada exitosamente */}
              {location && !isValidatingOnLoad && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-green-800">¡Ubicación verificada!</p>
                        <p className="text-sm text-green-700 mt-1">
                          <strong>Dirección:</strong> {location.address}
                        </p>
                        <p className="text-sm text-green-700">
                          <strong>Zona:</strong> {location.zone}
                        </p>
                        {location.source && (
                          <p className="text-xs text-green-600 mt-1">
                            Fuente: {location.source}
                          </p>
                        )}
                        {location.coordinates && (
                          <p className="text-xs text-green-600">
                            Coordenadas: {location.coordinates.lat.toFixed(6)}, {location.coordinates.lng.toFixed(6)}
                          </p>
                        )}
                        <details className="mt-2">
                          <summary className="text-xs text-green-600 cursor-pointer hover:text-green-800">
                            Ver detalles técnicos
                          </summary>
                          <div className="mt-2 p-2 bg-green-100 rounded text-xs text-green-800">
                            <pre>{JSON.stringify(location.details, null, 2)}</pre>
                          </div>
                        </details>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      className="w-full"
                    >
                      Continuar con el Registro
                    </Button>
                  </div>
                </div>
              )}

              {/* Error en validación automática */}
              {locationError && !isValidatingOnLoad && (
                <div className="space-y-4">
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

                  {/* Opción manual solo si hay error */}
                  <div className="space-y-3">
                    <Label htmlFor="manual-address">
                      Ingresa tu dirección para verificar:
                    </Label>
                    <div className="relative">
                      <Input
                        id="manual-address"
                        placeholder="Ej: Av. Reforma 123, Col. Juárez, CDMX"
                        value={manualAddress}
                        onChange={(e) => {
                          setManualAddress(e.target.value);
                          getAddressSuggestions(e.target.value);
                        }}
                        onFocus={() => {
                          if (addressSuggestions.length > 0) {
                            setShowSuggestions(true);
                          }
                        }}
                        onBlur={() => {
                          // Delay para permitir clic en sugerencias
                          setTimeout(() => setShowSuggestions(false), 200);
                        }}
                      />
                      {isLoadingSuggestions && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                        </div>
                      )}
                      
                      {/* Dropdown de sugerencias */}
                      {showSuggestions && addressSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                          {addressSuggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => handleAddressSelection(suggestion)}
                            >
                              <div className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {suggestion.structured_formatting?.main_text || suggestion.description}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate">
                                    {suggestion.structured_formatting?.secondary_text}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <Button
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

                  {/* Botón para reintentar validación automática */}
                  <Button
                    onClick={() => {
                      setLocationError(null);
                      setManualAddress('');
                      setIsValidatingOnLoad(true);
                      validateLocationOnLoad();
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Intentar Verificación Automática
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información Básica</h3>
              <p className="text-gray-600">
                Cuéntanos sobre tu negocio
              </p>
              <Button 
                onClick={() => setStep(3)}
                className="w-full"
              >
                Continuar
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">¡Listo!</h3>
              <p className="text-gray-600">
                Formulario completado (versión de prueba)
              </p>
              <Button 
                onClick={onClose}
                className="w-full"
              >
                Cerrar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
