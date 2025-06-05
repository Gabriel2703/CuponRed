# 📚 Documentación del Backend - CupónRed

## Descripción General
Plataforma de fidelización cruzada entre comercios locales mediante cupones digitales. Este backend provee la API REST para la gestión de usuarios, comercios, cupones, asignaciones, reportes, administración y notificaciones.

---

## Estructura de Carpetas

- `src/controllers/` — Lógica de negocio de cada módulo
- `src/routes/` — Definición de rutas de la API
- `src/config/` — Configuración de la base de datos
- `src/middleware/` — Middlewares de autenticación y roles
- `src/models/` — (Reservado para lógica de modelos si se requiere)
- `public/` — (Reservado para archivos estáticos)

---

## Principales Endpoints y Funcionalidades

### Usuarios
- `POST /api/usuarios` — Crear usuario (registro por teléfono)
- `GET /api/usuarios` — Listar usuarios
- `GET /api/usuarios/:id` — Ver usuario por ID
- `PUT /api/usuarios/:id` — Actualizar usuario
- `DELETE /api/usuarios/:id` — Eliminar usuario (soft delete)

### Comercios
- `POST /api/comercios/register` — Registro de comercio (requiere aprobación admin)
- `POST /api/comercios/login` — Login de comercio (JWT)
- `GET /api/comercios` — Listar comercios (protegido)
- `PUT /api/comercios/:id/activo` — Activar/desactivar comercio (protegido)
- `DELETE /api/comercios/:id` — Eliminar comercio (soft delete)

### Cupones
- `GET /api/cupones` — Listar cupones (protegido)
- `GET /api/cupones/:id` — Ver cupón por ID
- `POST /api/cupones` — Crear cupón
- `PUT /api/cupones/:id` — Actualizar cupón
- `DELETE /api/cupones/:id` — Marcar cupón como vencido

### Asignación y Canje de Cupones
- `POST /api/cupones-asignados/asignar` — Asignar cupón a usuario
- `POST /api/cupones-asignados/canjear` — Canjear cupón (registra uso y transacción)
- `GET /api/cupones-asignados/usuario/:id_usuario` — Historial de cupones de un usuario

### Categorías y Preferencias
- `GET /api/categorias` — Listar categorías
- `POST /api/categorias` — Crear categoría
- `PUT /api/categorias/:id` — Editar categoría
- `DELETE /api/categorias/:id` — Eliminar categoría
- `GET /api/categorias/preferencias/:id_usuario` — Ver preferencias de usuario
- `POST /api/categorias/preferencias` — Agregar preferencia
- `DELETE /api/categorias/preferencias` — Quitar preferencia

### Reportes y Estadísticas
- `GET /api/reportes/cupones-usados` — Listar cupones usados
- `GET /api/reportes/cupones-disponibles` — Listar cupones disponibles
- `GET /api/reportes/cupones-asignados` — Listar cupones asignados
- `GET /api/reportes/estadisticas` — Estadísticas generales (usuarios, comercios, cupones, etc.)

### Administración (solo admin)
- `PUT /api/admin/aprobar-comercio/:id` — Aprobar comercio
- `GET /api/admin/usuarios` — Listar todos los usuarios
- `GET /api/admin/comercios` — Listar todos los comercios

### Notificaciones (simulado)
- `POST /api/notificaciones/whatsapp` — Simular envío de WhatsApp
- `POST /api/notificaciones/email` — Simular envío de email

---

## Seguridad y Autenticación
- **JWT**: Todas las rutas protegidas requieren el header `Authorization: Bearer <token>`
- **Roles**: Middleware para restringir acceso a rutas de admin

---

## Base de Datos
- MySQL, estructura definida en `database.sql`
- Tablas principales: `usuarios`, `comercios`, `cupones`, `cupones_asignados`, `transacciones_uso_cupon`, `categorias`, `preferencias_clientes`

---

## Notas y Consejos
- Para probar endpoints, usar Postman o similar
- El login de usuarios es solo por teléfono (sin contraseña, pensado para QR o WhatsApp en el futuro)
- El login de comercios es con usuario y contraseña (hash bcrypt)
- El admin debe tener el campo `rol` en la base de datos con valor `admin` para acceder a rutas protegidas
- Los endpoints de notificaciones son simulados, listos para conectar con servicios reales

---

## Próximos pasos sugeridos
- Crear el frontend (web y/o móvil)
- Integrar WhatsApp Business API o servicio de email real
- Mejorar lógica de aprobación y notificaciones automáticas
- Agregar logs y monitoreo

---

**¡Proyecto CupónRed listo para crecer!** 