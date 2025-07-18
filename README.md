# 🐾 AdoptMe – Entrega Final Backend

Este proyecto forma parte del curso de **Backend en Coderhouse**. Se trata de una plataforma para la adopción de mascotas con funcionalidades completas: carga de mascotas, gestión de usuarios, sistema de adopciones, autenticación, tests, documentación Swagger, logger y dockerización.

---

## 🚀 Tecnologías

- Node.js
- Express.js
- MongoDB + Mongoose
- Docker
- Mocha + Chai + Supertest
- Multer
- Winston
- Swagger

---

## 📦 Instalación

```bash
git clone https://github.com/danieljj95/adoptme-backend.git
cd adoptme-backend
npm install
```

---

## ⚙️ Variables de entorno
Crea un archivo .env con el siguiente contenido:
```js
PORT=8080
MONGO_URL=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombreDB>
JWT_SECRET=example_secret
COOKIE_SECRET=example_cookie
```

---

## 🧪 Tests
```bash
npm test
```
Incluye pruebas funcionales para:
- GET /api/adoptions → 200 + array
- GET /api/adoptions/:aid → 200 (si existe) y 404 (si no)
- POST /api/adoptions/:uid/:pid → 200 (éxito), 400 (ya adoptado), 404 (usuario o mascota inexistente)
- POST /api/sessions/register y /login → Registro y login de usuario
- GET /api/sessions/current → Usuario autenticado

---

## 📄 Documentación Swagger
Disponible en:
👉 [http://localhost:8080/api/docs](http://localhost:8080/api/docs)

---

## 🐳 Docker

**Construir la imagen:**
```bash
docker build -t adoptme-backend:v1.0.0 .
```

**Ejecutar el contenedor:**
```bash
docker run -d -p 8080:8080 adoptme-backend:v1.0.0
```

---

## 📤 Imagen en DockerHub
La imagen del proyecto está publicada en DockerHub:
enlace 🔗 [https://hub.docker.com/r/danieljj95/adoptme-backend](https://hub.docker.com/r/danieljj95/adoptme-backend)
```bash
docker pull danieljj95/adoptme-backend:v1.0.0
docker run -d -p 8080:8080 danieljj95/adoptme-backend:v1.0.0
```

---

## Estructura del proyecto
```arduino
src/
├── controllers/
├── dao/
├── dto/
├── models/
├── repository/
├── routes/
├── services/
├── utils/
├── public/
├── config/
├── middlewares/
└── app.js
```

---

## 🔐 Funcionalidades principales
- Registro y login de usuarios con JWT + cookies
- Subida de imágenes y documentos con Multer
- Logger avanzado con Winston (niveles, consola y archivos)
- Documentación Swagger de todos los endpoints
- Dockerfile listo para despliegue
- Ruta de mockeo en /api/mocks
- Tests funcionales con cobertura de sesiones y adopciones

---

## Autor
👤 Daniel Jaimes
💻 GitHub: [@DanielDAJJ](https://github.com/DanielDAJJ)