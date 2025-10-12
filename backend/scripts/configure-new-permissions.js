const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const STRAPI_URL = 'http://localhost:1337';
const ADMIN_EMAIL = 'ajacs1104@gmail.com';
const ADMIN_PASSWORD = '17dtv0027C';

async function login() {
  try {
    const response = await fetch(`${STRAPI_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.data.token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

async function getRoles(token) {
  try {
    const response = await fetch(`${STRAPI_URL}/admin/users-permissions/roles`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get roles: ${response.status}`);
    }

    const data = await response.json();
    // Strapi puede devolver roles en data.roles o data.data
    return data.roles || data.data || data;
  } catch (error) {
    console.error('Error getting roles:', error);
    throw error;
  }
}

async function updatePermissions(token, roleId, contentType, permissions) {
  try {
    const response = await fetch(`${STRAPI_URL}/admin/users-permissions/roles/${roleId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        permissions: {
          [contentType]: permissions
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update permissions for ${contentType}: ${response.status}`);
    }

    console.log(`✅ Permissions updated for ${contentType}`);
  } catch (error) {
    console.error(`Error updating permissions for ${contentType}:`, error);
    throw error;
  }
}

async function configurePermissions() {
  try {
    console.log('🔐 Logging in to Strapi admin...');
    const token = await login();

    console.log('📋 Getting roles...');
    const roles = await getRoles(token);
    const publicRole = roles.find(role => role.type === 'public');
    const authenticatedRole = roles.find(role => role.type === 'authenticated');

    if (!publicRole || !authenticatedRole) {
      throw new Error('Required roles not found');
    }

    console.log('🔧 Configuring permissions for new content types...');

    // Configurar permisos para pending-businesses (público puede crear)
    await updatePermissions(token, publicRole.id, 'api::pending-business.pending-business', {
      create: { enabled: true },
      find: { enabled: false },
      findOne: { enabled: false },
      update: { enabled: false },
      delete: { enabled: false }
    });

    // Autenticados pueden leer y crear
    await updatePermissions(token, authenticatedRole.id, 'api::pending-business.pending-business', {
      create: { enabled: true },
      find: { enabled: true },
      findOne: { enabled: true },
      update: { enabled: true },
      delete: { enabled: false },
      approve: { enabled: true },
      reject: { enabled: true }
    });

    // Configurar permisos para contact-submissions
    await updatePermissions(token, publicRole.id, 'api::contact-submission.contact-submission', {
      create: { enabled: true },
      find: { enabled: false },
      findOne: { enabled: false },
      update: { enabled: false },
      delete: { enabled: false }
    });

    await updatePermissions(token, authenticatedRole.id, 'api::contact-submission.contact-submission', {
      create: { enabled: true },
      find: { enabled: true },
      findOne: { enabled: true },
      update: { enabled: true },
      delete: { enabled: false }
    });

    console.log('\n🎉 All permissions configured successfully!');
    console.log('\n📋 Summary:');
    console.log('   - pending-businesses: Public can create, Authenticated can read and manage');
    console.log('   - contact-submissions: Public can create, Authenticated can manage');

  } catch (error) {
    console.error('❌ Error configuring permissions:', error);
  }
}

configurePermissions();
