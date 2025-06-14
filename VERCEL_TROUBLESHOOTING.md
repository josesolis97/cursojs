# 🔧 Solución de Problemas en Vercel

## 🚨 **Error: FUNCTION_INVOCATION_FAILED**

### **Causas Comunes:**
1. ❌ **Variables de entorno faltantes**
2. ❌ **Estructura de archivos incorrecta**
3. ❌ **Imports incompatibles con serverless**
4. ❌ **Firebase configuration issues**

---

## ✅ **Soluciones Implementadas**

### **1. Nueva Estructura de API:**
```
api/
├── index.js      # Función principal
├── products.js   # CRUD productos
└── auth.js       # Autenticación
```

### **2. Variables de Entorno Requeridas:**
En Vercel Dashboard → Settings → Environment Variables:
```
FIREBASE_PROJECT_ID=cursojs-c9f67
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@cursojs-c9f67.iam.gserviceaccount.com
```

### **3. URLs de Prueba:**
- ✅ `https://tu-proyecto.vercel.app/api` → Status
- ✅ `https://tu-proyecto.vercel.app/api/products` → Lista productos
- ✅ `https://tu-proyecto.vercel.app/api/auth/login` → Login

---

## 🔍 **Cómo Debuggear**

### **1. Ver Logs en Vercel:**
1. Ve a tu proyecto en Vercel Dashboard
2. Click en "Functions" tab
3. Click en cualquier función
4. Ve los logs en tiempo real

### **2. Probar Localmente:**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Ejecutar localmente
vercel dev
```

### **3. Probar Endpoints:**
```bash
# Test API status
curl https://tu-proyecto.vercel.app/api

# Test productos
curl https://tu-proyecto.vercel.app/api/products

# Test login
curl -X POST https://tu-proyecto.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

---

## 🚨 **Errores Específicos y Soluciones**

### **Error: "Cannot find module"**
- ✅ Verificar que todos los imports usen rutas relativas correctas
- ✅ Asegurar que `package.json` tenga `"type": "module"`

### **Error: "Firebase Admin not initialized"**
- ✅ Verificar variables de entorno en Vercel
- ✅ Asegurar que `FIREBASE_PRIVATE_KEY` tenga `\n` correctos

### **Error: "CORS"**
- ✅ Verificar que el dominio esté en `corsOptions`
- ✅ Usar headers CORS en funciones serverless

### **Error: "Function timeout"**
- ✅ Optimizar consultas a Firebase
- ✅ Reducir dependencias innecesarias

---

## 💡 **Tips para Vercel**

### **1. Estructura Recomendada:**
```
proyecto/
├── api/           # Serverless functions
├── frontend/      # Static files
├── src/           # Shared code
├── vercel.json    # Configuration
└── package.json   # Dependencies
```

### **2. Mejores Prácticas:**
- ✅ Usar funciones pequeñas y específicas
- ✅ Minimizar dependencias
- ✅ Cachear respuestas cuando sea posible
- ✅ Manejar errores apropiadamente

### **3. Límites de Vercel (Free):**
- ⏱️ **Timeout**: 10 segundos por función
- 💾 **Memory**: 1024 MB
- 📦 **Size**: 50 MB por función
- 🔄 **Invocations**: 100GB-hours/mes

---

## 🎯 **Pasos Siguientes**

1. **Subir cambios** a GitHub
2. **Redeploy** en Vercel
3. **Configurar variables** de entorno
4. **Probar endpoints** uno por uno
5. **Revisar logs** si hay errores

¿Necesitas ayuda con algún paso específico? 