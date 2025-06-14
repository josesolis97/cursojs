import { admin } from '../firebaseAdmin.js';
import fetch from 'node-fetch'; // Asegurate de instalarlo: npm install node-fetch

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y password son obligatorios' });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    res.status(201).json({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔥 Login Real con Firebase REST API
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y password son obligatorios' });
  }

  try {
    // Cambiar esta API KEY por la de tu proyecto Firebase
    const apiKey = 'AIzaSyDXWWqltYjx5Sghe7InU8nmIVaWsc_U06c';

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    // Si todo sale bien, devolvemos el token
    res.status(200).json({
      uid: data.localId,
      email: data.email,
      token: data.idToken, // Cambiar 'idToken' por 'token' para que coincida con el frontend
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
