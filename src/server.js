import express from 'express';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cors from 'cors';



const app = express();

// ...antes de las rutas
app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
    credentials: true
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // para formularios

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));