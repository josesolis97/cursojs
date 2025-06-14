// firebaseAdmin.js
import admin from 'firebase-admin';

// Configuración usando variables de entorno
const initializeFirebase = () => {
  if (admin.apps.length === 0) {
    try {
      // Configuración del service account usando variables de entorno
      const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID || 'cursojs-c9f67',
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.FIREBASE_CLIENT_EMAIL ? 
          `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}` : 
          undefined
      };

      // Verificar que las variables esenciales estén presentes
      if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
        throw new Error('Missing required Firebase environment variables');
      }

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`,
        storageBucket: `${serviceAccount.project_id}.firebasestorage.app`
      });

      console.log('✅ Firebase Admin initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing Firebase Admin:', error.message);
      
      // Inicialización mínima para que no falle completamente
      try {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: 'cursojs-c9f67',
            privateKey: 'dummy-key',
            clientEmail: 'dummy@email.com'
          })
        });
        console.log('⚠️ Firebase initialized with dummy credentials (limited functionality)');
      } catch (fallbackError) {
        console.error('❌ Complete Firebase initialization failure');
      }
    }
  }
};

// Inicializar Firebase
initializeFirebase();

// Exportar instancias
const db = admin.firestore();

// Exportar bucket de Storage con manejo de errores
let bucket = null;
try {
  bucket = admin.storage().bucket();
  console.log('✅ Firebase Storage bucket initialized');
} catch (error) {
  console.log('⚠️ Firebase Storage not available:', error.message);
}

export { admin, db, bucket };
