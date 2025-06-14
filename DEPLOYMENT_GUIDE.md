# 🚀 Guía de Despliegue - API REST + Frontend

## 🌟 **Mejores Opciones para tu Proyecto**

### 🥇 **VERCEL (Recomendada)**
- ✅ **Gratis** para proyectos personales
- ✅ **Fácil despliegue** desde GitHub
- ✅ **Soporte Node.js** nativo
- ✅ **HTTPS automático**
- ✅ **Dominio personalizado** gratis

### 🥈 **Railway**
- ✅ **Gratis** hasta $5/mes de uso
- ✅ **Base de datos** incluida
- ✅ **Muy fácil** de usar
- ✅ **Escalable**

### 🥉 **Render**
- ✅ **Gratis** con limitaciones
- ✅ **Fácil configuración**
- ✅ **Buena documentación**

---

## 🚀 **DESPLIEGUE EN VERCEL (Paso a Paso)**

### **1. Preparar el Proyecto**

#### Crear `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/src/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### Actualizar `package.json`:
```json
{
  "scripts": {
    "start": "node src/server.js",
    "build": "echo 'Build completed'",
    "dev": "nodemon src/server.js"
  },
  "engines": {
    "node": "18.x"
  }
}
```

### **2. Configurar Variables de Entorno**

En Vercel Dashboard → Settings → Environment Variables:
```
FIREBASE_PROJECT_ID=cursojs-c9f67
FIREBASE_PRIVATE_KEY=tu_private_key_aqui
FIREBASE_CLIENT_EMAIL=tu_client_email_aqui
```

### **3. Comandos de Despliegue**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Hacer login
vercel login

# Desplegar
vercel --prod
```

---

## 🚂 **DESPLIEGUE EN RAILWAY**

### **1. Crear `railway.json`:**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### **2. Comandos:**
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login y desplegar
railway login
railway init
railway up
```

---

## 🎨 **DESPLIEGUE EN RENDER**

### **1. Configuración:**
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Node Version:** 18

### **2. Variables de Entorno:**
Agregar las mismas variables de Firebase en el dashboard.

---

## 📁 **ESTRUCTURA RECOMENDADA PARA DESPLIEGUE**

```
proyecto/
├── src/                 # Backend API
├── frontend/           # Frontend estático
├── package.json        # Dependencias
├── vercel.json        # Configuración Vercel
├── railway.json       # Configuración Railway
└── README.md          # Documentación
```

---

## 🔧 **AJUSTES NECESARIOS**

### **1. CORS para Producción:**
```javascript
// src/app.js
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tu-dominio.vercel.app'] 
    : ['http://localhost:3000', 'http://127.0.0.1:5500'],
  credentials: true
}));
```

### **2. URL de API en Frontend:**
```javascript
// frontend/app.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://tu-api.vercel.app/api'
  : 'http://localhost:3000/api';
```

---

## 💰 **COSTOS**

| Plataforma | Gratis | Límites | Costo Pagado |
|------------|--------|---------|--------------|
| **Vercel** | ✅ | 100GB bandwidth | $20/mes |
| **Railway** | ✅ | $5 crédito/mes | $0.000463/GB-hora |
| **Render** | ✅ | 750 horas/mes | $7/mes |

---

## 🎯 **MI RECOMENDACIÓN**

### **Para tu proyecto:**
1. 🥇 **Vercel** - Perfecto para full-stack
2. 🥈 **Railway** - Si necesitas base de datos
3. 🥉 **Render** - Alternativa sólida

### **Pasos siguientes:**
1. Subir código a **GitHub**
2. Conectar con **Vercel**
3. Configurar **variables de entorno**
4. ¡Desplegar! 🚀

¿Quieres que te ayude a configurar el despliegue en alguna plataforma específica? 