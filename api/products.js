import { getProducts, createProduct, updateProduct, deleteProduct } from '../src/controllers/product.controller.js';
import verifyToken from '../src/middlewares/auth.middleware.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { method } = req;

    switch (method) {
      case 'GET':
        await getProducts(req, res);
        break;
      
      case 'POST':
        // Verificar token para POST
        await new Promise((resolve, reject) => {
          verifyToken(req, res, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
        
        // Simular multer para Vercel
        req.file = null; // Por ahora sin archivos
        await createProduct(req, res);
        break;
      
      case 'PUT':
        await new Promise((resolve, reject) => {
          verifyToken(req, res, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
        
        req.file = null;
        await updateProduct(req, res);
        break;
      
      case 'DELETE':
        await new Promise((resolve, reject) => {
          verifyToken(req, res, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
        
        await deleteProduct(req, res);
        break;
      
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 