import { db } from '../firebaseAdmin.js';
import { uploadImage } from './firebaseStorage.service.js';

// No uses collection del SDK cliente
const productsCollection = db.collection('products');

export const getAllProducts = async () => {
  const snapshot = await productsCollection.get();
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return products;
};

export const createProduct = async (productData, file) => {
  try {
    if (file) {
      try {
        const imageUrl = await uploadImage(file.buffer, file.originalname, file.mimetype);
        productData.imageUrl = imageUrl;
      } catch (storageError) {
        console.log('⚠️ Firebase Storage no disponible, creando producto sin imagen');
        // Continuar sin imagen si Firebase Storage no está disponible
        productData.imageUrl = null;
      }
    }

    // Agregar timestamp
    productData.createdAt = new Date().toISOString();
    
    const docRef = await productsCollection.add(productData);
    const result = { id: docRef.id, ...productData };
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, productData, file) => {
  try {
    // Si hay un archivo nuevo, subirlo
    if (file) {
      try {
        const imageUrl = await uploadImage(file.buffer, file.originalname, file.mimetype);
        productData.imageUrl = imageUrl;
      } catch (storageError) {
        console.log('⚠️ Firebase Storage no disponible, actualizando producto sin cambiar imagen');
        // Si falla la subida, no cambiar la imagen existente
      }
    }

    // Agregar timestamp de actualización
    productData.updatedAt = new Date().toISOString();
    
    const docRef = productsCollection.doc(id);
    await docRef.update(productData);
    
    // Obtener el producto actualizado
    const updatedDoc = await docRef.get();
    if (!updatedDoc.exists) {
      throw new Error('Producto no encontrado');
    }
    
    return { id: updatedDoc.id, ...updatedDoc.data() };
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const docRef = productsCollection.doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      throw new Error('Producto no encontrado');
    }
    
    await docRef.delete();
    return { message: 'Producto eliminado exitosamente' };
  } catch (error) {
    throw error;
  }
};

