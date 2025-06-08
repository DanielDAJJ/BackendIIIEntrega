# 🐾 AdoptMe – Preentrega Backend (Mocking System)

Este proyecto forma parte del curso de Backend en Coderhouse. La entrega consiste en la implementación de un sistema de generación de datos mock para pruebas y desarrollo de endpoints personalizados en una plataforma de adopción de mascotas.

---

## 📦 Contenido de la entrega

- ✅ **`mocks.router.js`** bajo la ruta `/api/mocks`
- ✅ Endpoint `GET /mockingpets`: genera 100 mascotas falsas
- ✅ Endpoint `GET /mockingusers`: genera 50 usuarios con formato MongoDB
- ✅ Endpoint `POST /generateData`: inserta datos simulados en la base de datos
- ✅ Módulos de mocking (`mockUsers.js`, `mockPets.js`)
- ✅ Servicio de inserción (`mockService.js`)
- ✅ Usuarios generados con:
  - Contraseña `"coder123"` encriptada con bcrypt
  - Rol aleatorio: `"user"` o `"admin"`
  - Array vacío de mascotas (`pets: []`)

---