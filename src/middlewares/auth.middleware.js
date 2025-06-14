import { admin } from '../firebaseAdmin.js';  // Importar la instancia ya inicializada

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  // Extraer el token después de "Bearer "
  const token = authHeader.substring(7);

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
};

export default verifyToken;
