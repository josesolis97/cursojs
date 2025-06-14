import express from 'express';
import multer from 'multer';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // para recibir archivo en memoria

// GET productos - PÚBLICO (sin autenticación)
router.get('/', getProducts);

// Todas las demás rutas requieren autenticación
router.post('/', verifyToken, upload.single('image'), createProduct);
router.put('/:id', verifyToken, upload.single('image'), updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export default router;
