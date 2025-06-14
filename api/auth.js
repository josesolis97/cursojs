import { registerUser, loginUser } from '../src/controllers/auth.controller.js';

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
    const { method, url } = req;

    if (method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }

    // Extraer la ruta después de /api/auth
    const path = url.replace('/api/auth', '');

    switch (path) {
      case '/register':
        await registerUser(req, res);
        break;
      
      case '/login':
        await loginUser(req, res);
        break;
      
      default:
        res.status(404).json({ error: 'Endpoint not found' });
    }
  } catch (error) {
    console.error('Auth API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 