import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const businessName = formData.get('businessName') as string;
    const categoryId = formData.get('categoryId') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;
    const website = formData.get('website') as string | null;
    const logo = formData.get('logo') as File | null;

    // Validación básica
    if (!businessName || !categoryId || !phone || !email || !address) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Aquí puedes integrar con Strapi o enviar un email
    // TODO: Integrar con Strapi para crear un registro pendiente de aprobación
    // o enviar un email al administrador

    return NextResponse.json(
      { success: true, message: 'Registro enviado exitosamente' },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Error al procesar el registro' },
      { status: 500 }
    );
  }
}
