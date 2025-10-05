const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const STRAPI_URL = 'http://localhost:1337';
const ADMIN_EMAIL = 'ajacs1104@gmail.com';
const ADMIN_PASSWORD = '17dtv0027C';

async function getAuthToken() {
  try {
    const response = await fetch(`${STRAPI_URL}/admin/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    });

    if (!response.ok) {
      throw new Error(`Auth failed: ${response.status}`);
    }

    const data = await response.json();
    return data.data.token;
  } catch (error) {
    console.error('❌ Error obteniendo token:', error.message);
    throw error;
  }
}

async function getPublicRole(token) {
  try {
    const response = await fetch(`${STRAPI_URL}/admin/users-permissions/roles`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get roles: ${response.status}`);
    }

    const data = await response.json();
    const publicRole = data.data.find(role => role.type === 'public');
    
    if (!publicRole) {
      throw new Error('Public role not found');
    }

    return publicRole;
  } catch (error) {
    console.error('❌ Error obteniendo rol público:', error.message);
    throw error;
  }
}

async function updateRolePermissions(token, roleId, permissions) {
  try {
    const response = await fetch(`${STRAPI_URL}/admin/users-permissions/roles/${roleId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        permissions: permissions
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update permissions: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Error actualizando permisos:', error.message);
    throw error;
  }
}

async function fixPermissions() {
  try {
    console.log('🔧 Configurando permisos de Strapi...\n');

    // 1. Obtener token de autenticación
    console.log('1. 🔐 Obteniendo token de autenticación...');
    const token = await getAuthToken();
    console.log('   ✅ Token obtenido');

    // 2. Obtener rol público
    console.log('\n2. 👤 Obteniendo rol público...');
    const publicRole = await getPublicRole(token);
    console.log(`   ✅ Rol público encontrado: ${publicRole.name} (ID: ${publicRole.id})`);

    // 3. Configurar permisos para todos los content types
    console.log('\n3. ⚙️ Configurando permisos...');
    
    const contentTypes = [
      'business-plan',
      'zone', 
      'category',
      'business',
      'offer',
      'ad'
    ];

    const permissions = {};

    contentTypes.forEach(contentType => {
      permissions[`api::${contentType}.${contentType}`] = {
        controllers: {
          [contentType]: {
            find: { enabled: true },
            findOne: { enabled: true },
            create: { enabled: true },
            update: { enabled: true },
            delete: { enabled: true }
          }
        }
      };
    });

    // Actualizar permisos
    await updateRolePermissions(token, publicRole.id, permissions);
    console.log('   ✅ Permisos configurados para todos los content types');

    console.log('\n🎉 ¡Permisos configurados correctamente!');
    console.log('\n📋 Permisos habilitados:');
    contentTypes.forEach(contentType => {
      console.log(`   ✅ ${contentType}: find, findOne, create, update, delete`);
    });

    console.log('\n🧪 Ahora puedes probar:');
    console.log('   - http://localhost:1337/api/businesses/10?populate=*');
    console.log('   - http://localhost:3001/negocios/10');
    console.log('   - http://localhost:3001/zona/pedregal/supermercados');

  } catch (error) {
    console.error('\n❌ Error configurando permisos:', error.message);
    process.exit(1);
  }
}

fixPermissions();
