import express from 'express';
import cors from 'cors';

// Importar rutas
import authRoutes from '../src/routes/auth.routes.js';
import productRoutes from '../src/routes/product.routes.js';

const app = express();

// Configuración de CORS para Vercel
const corsOptions = {
  origin: [
    'https://cursojs-c9f67.vercel.app',
    'https://tu-dominio.vercel.app',
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
    message: 'API funcionando correctamente en Vercel',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Ruta de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    service: 'API REST',
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Para Vercel, exportamos la app
export default app; 