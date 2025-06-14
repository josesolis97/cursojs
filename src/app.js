import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';

const app = express();

// Configuración de CORS para desarrollo y producción
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://cursojs-c9f67.vercel.app',
        'https://tu-dominio.vercel.app'
      ]
    : [
        'http://localhost:3000',
        'http://127.0.0.1:5500',
        'http://localhost:5500'
      ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ 
    message: 'API funcionando correctamente',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

export default app;
