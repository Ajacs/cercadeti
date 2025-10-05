const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const STRAPI_URL = 'http://localhost:1337';
const ADMIN_EMAIL = 'ajacs1104@gmail.com';
const ADMIN_PASSWORD = '17dtv0027C';

async function login() {
  try {
    const response = await fetch(`${STRAPI_URL}/admin/auth/local`, {
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
      throw new Error(`Login failed: ${response.status}`);
    }

    const data = await response.json();
    return data.token;
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
    return data.roles;
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

    // Configurar permisos para pending-businesses
    await updatePermissions(token, publicRole.id, 'pending-business', {
      create: true,
      find: false,
      findOne: false,
      update: false,
      delete: false
    });

    await updatePermissions(token, authenticatedRole.id, 'pending-business', {
      create: true,
      find: true,
      findOne: true,
      update: false,
      delete: false
    });

    // Configurar permisos para contact-submissions
    await updatePermissions(token, publicRole.id, 'contact-submission', {
      create: true,
      find: false,
      findOne: false,
      update: false,
      delete: false
    });

    await updatePermissions(token, authenticatedRole.id, 'contact-submission', {
      create: true,
      find: true,
      findOne: true,
      update: true,
      delete: false
    });

    console.log('\n🎉 All permissions configured successfully!');
    console.log('\n📋 Summary:');
    console.log('   - pending-businesses: Public can create, Authenticated can read');
    console.log('   - contact-submissions: Public can create, Authenticated can manage');

  } catch (error) {
    console.error('❌ Error configuring permissions:', error);
  }
}

configurePermissions();
