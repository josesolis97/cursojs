# 🔐 Variables de Entorno para Vercel

## 📋 **Variables Requeridas**

### **En Vercel Dashboard → Settings → Environment Variables:**

```
FIREBASE_PROJECT_ID=cursojs-c9f67
```

```
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
-----END PRIVATE KEY-----
```

```
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@cursojs-c9f67.iam.gserviceaccount.com
```

---

## 🔧 **Cómo Obtener las Variables**

### **1. Ir a Firebase Console:**
1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto `cursojs-c9f67`
3. Ve a **Settings** → **Project Settings**
4. Ve a la pestaña **Service Accounts**
5. Click en **Generate new private key**
6. Descarga el archivo JSON

### **2. Extraer Variables del JSON:**
Del archivo descargado, toma estos valores:

```json
{
  "type": "service_account",
  "project_id": "cursojs-c9f67",           // → FIREBASE_PROJECT_ID
  "private_key_id": "abc123...",           // → FIREBASE_PRIVATE_KEY_ID
  "private_key": "-----BEGIN PRIVATE...", // → FIREBASE_PRIVATE_KEY
  "client_email": "firebase-adminsdk...", // → FIREBASE_CLIENT_EMAIL
  "client_id": "123456789..."             // → FIREBASE_CLIENT_ID
}
```

---

## ⚠️ **Importante para FIREBASE_PRIVATE_KEY**

### **Formato Correcto:**
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
(múltiples líneas)
...xyz123
-----END PRIVATE KEY-----
```

### **En Vercel, pegar TODO en una línea con \\n:**
```
-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\\n-----END PRIVATE KEY-----\\n
```

---

## 🧪 **Probar la Configuración**

### **1. Después de configurar las variables:**
1. Redeploy en Vercel
2. Ve a Functions → Logs
3. Busca el mensaje: `✅ Firebase Admin initialized successfully`

### **2. Probar endpoints:**
```bash
# Test básico
curl https://tu-proyecto.vercel.app/api

# Test productos
curl https://tu-proyecto.vercel.app/api/products
```

---

## 🚨 **Errores Comunes**

### **Error: "Missing required Firebase environment variables"**
- ✅ Verificar que todas las variables estén configuradas
- ✅ Verificar que no haya espacios extra

### **Error: "Invalid private key"**
- ✅ Verificar formato del FIREBASE_PRIVATE_KEY
- ✅ Asegurar que tenga \\n correctos

### **Error: "Service account not found"**
- ✅ Verificar FIREBASE_CLIENT_EMAIL
- ✅ Verificar que el service account exista en Firebase

---

## 💡 **Tips**

1. **No incluir comillas** en los valores en Vercel
2. **Copiar y pegar** directamente desde el JSON
3. **Redeploy** después de cambiar variables
4. **Revisar logs** para confirmar inicialización

¿Necesitas ayuda para obtener alguna variable específica? 