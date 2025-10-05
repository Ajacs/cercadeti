const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const STRAPI_URL = 'http://localhost:1337';

async function configurePublicPermissions() {
  console.log('🔧 Configurando permisos públicos para nuevos content types...');
  
  // Configurar permisos para pending-businesses
  console.log('\n📋 Configurando permisos para pending-businesses:');
  console.log('   1. Ve a: http://localhost:1337/admin/settings/users-permissions/roles/public');
  console.log('   2. En la sección "Pending Businesses":');
  console.log('      ✅ Marca "create"');
  console.log('      ❌ Deja "find", "findOne", "update", "delete" sin marcar');
  
  // Configurar permisos para contact-submissions
  console.log('\n📋 Configurando permisos para contact-submissions:');
  console.log('   1. Ve a: http://localhost:1337/admin/settings/users-permissions/roles/public');
  console.log('   2. En la sección "Contact Submissions":');
  console.log('      ✅ Marca "create"');
  console.log('      ❌ Deja "find", "findOne", "update", "delete" sin marcar');
  
  // Configurar permisos para authenticated users
  console.log('\n🔐 Configurando permisos para usuarios autenticados:');
  console.log('   1. Ve a: http://localhost:1337/admin/settings/users-permissions/roles/authenticated');
  console.log('   2. Para "Pending Businesses":');
  console.log('      ✅ Marca "create", "find", "findOne"');
  console.log('      ❌ Deja "update", "delete" sin marcar');
  console.log('   3. Para "Contact Submissions":');
  console.log('      ✅ Marca "create", "find", "findOne", "update"');
  console.log('      ❌ Deja "delete" sin marcar');
  
  console.log('\n🎉 ¡Una vez configurados los permisos, podrás probar los formularios!');
  console.log('\n🧪 URLs para probar:');
  console.log('   - Formulario de registro: http://localhost:3001/registro-negocio');
  console.log('   - Formulario de contacto: http://localhost:3001/contacto');
}

configurePublicPermissions();
