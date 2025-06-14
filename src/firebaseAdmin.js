// firebaseAdmin.js
import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const serviceAccount = require('./config/serviceAccountKey.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'cursojs-c9f67.firebasestorage.app'
    });
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

export { admin, db, bucket };
