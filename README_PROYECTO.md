# 🚀 API REST + Frontend - Sistema CRUD Completo

Un sistema completo de gestión de productos con autenticación JWT, desarrollado con Node.js, Express y Firebase.

## ✨ Características

- 🔐 **Autenticación JWT** con Firebase Auth
- 📦 **CRUD completo** de productos
- 🖼️ **Subida de imágenes** con Firebase Storage
- 🎨 **Frontend moderno** con Glass Morphism
- 📱 **Diseño responsivo**
- 🌐 **Listo para producción**

## 🛠️ Tecnologías

### Backend
- **Node.js** + **Express.js**
- **Firebase Admin SDK**
- **JWT** para autenticación
- **Multer** para archivos
- **CORS** configurado

### Frontend
- **HTML5** + **CSS3** + **JavaScript ES6**
- **Font Awesome** para iconos
- **Fetch API** para HTTP requests
- **LocalStorage** para persistencia

## 🚀 Instalación y Uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Firebase
1. Crear proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilitar Authentication y Firestore
3. Descargar service account key
4. Configurar variables de entorno

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

### 5. Abrir frontend
Abrir `frontend/index.html` en el navegador o usar Live Server.

## 🔑 Credenciales de Prueba

- **Email:** `josesolis97@gmail.com`
- **Contraseña:** `Admin123456`

## 📡 API Endpoints

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/products` | Listar productos | ❌ |
| `POST` | `/api/products` | Crear producto | ✅ |
| `PUT` | `/api/products/:id` | Actualizar producto | ✅ |
| `DELETE` | `/api/products/:id` | Eliminar producto | ✅ |
| `POST` | `/api/auth/register` | Registrar usuario | ❌ |
| `POST` | `/api/auth/login` | Iniciar sesión | ❌ |

## 🌐 Despliegue

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Railway
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

## 📁 Estructura del Proyecto

```
├── src/
│   ├── controllers/     # Controladores de la API
│   ├── routes/         # Rutas de la API
│   ├── services/       # Lógica de negocio
│   ├── middlewares/    # Middlewares (auth, etc.)
│   ├── app.js         # Configuración de Express
│   └── server.js      # Punto de entrada
├── frontend/
│   ├── index.html     # Interfaz principal
│   ├── styles.css     # Estilos
│   └── app.js         # Lógica del frontend
├── package.json       # Dependencias
├── vercel.json       # Configuración Vercel
└── README.md         # Este archivo
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Jose Antonio Solis**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: josesolis97@gmail.com

---

⭐ ¡Dale una estrella si te gustó el proyecto! 