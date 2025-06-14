import { bucket } from '../firebaseAdmin.js';
import path from 'path';

export const uploadImage = async (fileBuffer, fileName, mimetype) => {
  try {
    const file = bucket.file(`products/${fileName}`);

    const stream = file.createWriteStream({
      metadata: {
        contentType: mimetype
      }
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', async () => {
        try {
          // Hacer público el archivo
          await file.makePublic();
          
          // Obtener URL pública
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
          resolve(publicUrl);
        } catch (error) {
          reject(error);
        }
      });

      stream.end(fileBuffer);
    });
  } catch (error) {
    throw error;
  }
};
