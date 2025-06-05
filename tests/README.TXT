# 🧾 Proyecto CupónRed 

 

> Plataforma de fidelización cruzada entre comercios locales mediante cupones digitales generados automáticamente tras cada venta. Los clientes reciben descuentos de otros comercios asociados, incentivando el tráfico cruzado y la repetición de compras. 

 

--- 

 

## 🧱 Estructura del Sistema 

 

CupónRed  

├── Base de Datos (MySQL / PostgreSQL)  

├── Backend (Node.js / Python / PHP)  

├── Frontend Comerciante (Web App)  

├── Frontend Cliente (App Móvil + WhatsApp)  

├── Panel Admin (Web App)  

├── Integraciones (WhatsApp Business API, POS/Facturadores)  

└── Reportes y Estadísticas 

--- 

 

## 🗂️ 1. Plan de Acción General 

 

| Fase | Objetivo | Duración | 

|------|----------|----------| 

| 📝 Fase 0: Documentación y Diseño | Definir arquitectura, modelo de datos, wireframes |  

| 💻 Fase 1: Setup Técnico Inicial | Configurar repositorio, DB, backend básico |  
| 🛠️ Fase 2: Usuarios y Registro | Clientes y comerciantes se registran |  

| 🎟️ Fase 3: Generación de Cupones | Comerciantes crean cupones personalizados |  

| 🔄 Fase 4: Entrega Automática de Cupones | Asignar cupones tras ventas |  

| ✅ Fase 5: Canje de Cupones | Validación automática en comercio destino |  

| 📊 Fase 6: Estadísticas y Reportes | Dashboard de métricas para comerciantes y admin |  

| 📲 Fase 7: App Móvil Cliente | Aplicación móvil para clientes |  

| 📩 Fase 8: Integración WhatsApp | Enviar y validar cupones vía WhatsApp |  

| 🧪 Fase 9: Pruebas y Optimización | Testeo funcional, carga y seguridad | 

| 🚀 Fase 10: Lanzamiento Piloto | Despliegue con 5-10 comercios reales |  

 

--- 

 

## 🗃️ 2. Tecnologías Recomendadas 

 

| Componente | Tecnología | 

|-----------|------------| 

| Backend | Node.js + Express / Python Flask | 

| Base de Datos | PostgreSQL (mejor escalabilidad) o MySQL | 

| Autenticación | JWT / OAuth2 | 

| Hosting Backend | Vercel / Render / AWS Lambda / Heroku | 

| Frontend Web (Comerciantes/Admin) | React.js / Vue.js | 

| App Móvil (Clientes) | Flutter / React Native | 

| Envío de Mensajes | WhatsApp Business API / Twilio | 

| Almacenamiento | Firebase Storage / AWS S3 | 

| Monitorización | Sentry / Datadog | 

| CI/CD | GitHub Actions / GitLab CI | 

| Logs | Winston (Node) / Logtail | 

| Cache | Redis (opcional, para alto tráfico) | 

 

--- 

 

## 🗺️ 3. Modelo de Base de Datos Detallado 

 

### Tabla: `usuarios` (clientes) 

```sql 

id_usuario INT PRIMARY KEY AUTO_INCREMENT, 

nombre VARCHAR(100), 

apellido VARCHAR(100), 

telefono VARCHAR(20) UNIQUE NOT NULL, 

email VARCHAR(100) NULL, 

fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP, 

activo BOOLEAN DEFAULT TRUE 

Tabla: categorias 

sql 

id_categoria INT PRIMARY KEY AUTO_INCREMENT, 

nombre VARCHAR(50), 

descripcion TEXT 

Tabla: preferencias_clientes 

sql 

id_preferencia INT PRIMARY KEY AUTO_INCREMENT, 

id_usuario INT, 

id_categoria INT, 

FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario), 

FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) 

Tabla: comercios 

sql 

id_comercio INT PRIMARY KEY AUTO_INCREMENT, 

nombre VARCHAR(100), 

direccion VARCHAR(255), 

telefono VARCHAR(20), 

categoria_principal INT, 

usuario VARCHAR(50) UNIQUE, 

password_hash VARCHAR(255), 

fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP, 

activo BOOLEAN DEFAULT TRUE, 

FOREIGN KEY (categoria_principal) REFERENCES categorias(id_categoria) 

Tabla: cupones 

sql 

id_cupon INT PRIMARY KEY AUTO_INCREMENT, 

id_comercio_origen INT, 

tipo ENUM('porcentaje', 'monto', 'proxima_gratis', 'otro'), 

valor DECIMAL(10,2), 

descripcion VARCHAR(255), 

codigo VARCHAR(50) UNIQUE, 

estado ENUM('disponible', 'asignado', 'usado', 'vencido'), 

fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP, 

fecha_vencimiento DATE, 

FOREIGN KEY (id_comercio_origen) REFERENCES comercios(id_comercio) 

Tabla: cupones_asignados 

sql 

id_asignado INT PRIMARY KEY AUTO_INCREMENT, 

id_cupon INT, 

id_usuario INT, 

fecha_asignado DATETIME DEFAULT CURRENT_TIMESTAMP, 

FOREIGN KEY (id_cupon) REFERENCES cupones(id_cupon), 

FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) 

Tabla: transacciones_uso_cupon 

sql 

id_transaccion INT PRIMARY KEY AUTO_INCREMENT, 

id_cupon INT, 

monto_venta DECIMAL(10,2), 

descuento_aplicado DECIMAL(10,2), 

fecha_uso DATETIME DEFAULT CURRENT_TIMESTAMP, 

FOREIGN KEY (id_cupon) REFERENCES cupones(id_cupon) 

 

🧑‍💼 4. Funcionalidades del Administrador 

Crear/modificar usuarios (comerciantes/clientes). 

Ver todas las estadísticas del sistema. 

Ver listado de cupones usados/no usados. 

Gestionar categorías de comercios. 

Ver reportes de ROI por comercio. 

Enviar mensajes masivos a comerciantes o clientes. 

Configurar integraciones externas (facturadores, WhatsApp). 

 

🏬 5. Panel de Control del Comerciante 

Menú Principal: 

Perfil del comercio 

Generador de Cupones 

Gestión de Cupones Disponibles 

Historial de Ventas con Cupones 

Estadísticas de Uso 

Preferencias de Cupones Recibidos 

Configuración de Facturación 

Generador de Cupones: 

Seleccionar tipo de cupón (porcentaje, monto, próxima gratis, etc.) 

Ingresar valor y descripción 

Seleccionar cantidad de unidades 

Establecer fecha de vencimiento 

Confirmar creación → cupones pasan a estado “disponible” 

 

👥 6. Sistema del Cliente 

App Móvil o Web App (Cliente) 

Pantallas Principales: 

Inicio 

Cupones disponibles 

Cupones usados 

Cupones expirados 

Perfil 

Datos personales 

Preferencias de categorías 

Historial 

Lista de cupones obtenidos y usados 

Notificaciones 

Nuevos cupones 

Recordatorios de vencimientos 

Canje de Cupón 

Mostrar QR o código manualmente 

Registro: 

Requiere teléfono único 

Opcional: email y nombre 

Selección de categorías de interés 

 

📩 7. Sistema de Notificación: WhatsApp 

Usamos WhatsApp Business API para: 

Enviar cupones automáticamente tras una venta. 

Permitir validación de cupones por mensaje (ej: “VALIDAR CUPON 1234”). 

Enviar recordatorios de cupones próximos a vencer. 

Enviar notificaciones de nuevos cupones disponibles. 

Soporte automatizado por chatbot. 

 

📊 8. Estadísticas y Reportes 

Para Comerciantes: 

Cuántos cupones generó vs cuántos fueron usados 

Tráfico nuevo generado por cupones 

Porcentaje de conversión 

Monto total ahorrado por clientes 

ROI estimado por campaña 

Para Administrador: 

Total de usuarios activos 

Total de comercios activos 

Cupones más usados 

Mejores comercios en generación de tráfico 

Tasa de conversión promedio 

 

🔐 9. Seguridad y Escalabilidad 

Seguridad: 

Autenticación segura con tokens (JWT) 

Contraseñas encriptadas (bcrypt) 

HTTPS obligatorio 

Protección contra inyecciones SQL 

Limitación de solicitudes (rate limiting) 

Escalabilidad: 

Uso de Redis para cachear consultas frecuentes 

Separación de servicios: microservicios por módulos 

Uso de balanceadores de carga 

Bases de datos optimizadas con índices 

Uso de cola de tareas (ej: RabbitMQ) para alta concurrencia 

 

📦 10. Flujo de Interacción Completo 

[Cliente compra en Juan]  

↓ 

[Sistema busca cupones disponibles] 

↓ 

[Selecciona cupón de Diego] 

↓ 

[Genera registro en cupones_asignados] 

↓ 

[Envía cupón a cliente por WhatsApp/App] 

↓ 

[Cliente va a Diego y muestra el cupón] 

↓ 

[Diego valida el cupón en su sistema] 

↓ 

[Sistema marca cupón como usado] 

↓ 

[Registra transacción] 

↓ 

[Actualiza estadísticas] 

↓ 

[Notifica a Juan que su cupón fue usado] 

 

📋 11. Checklist de Finalización 

✅ Modelo de base de datos completo 
✅ Backend funcional con rutas CRUD 
✅ Panel web para comerciantes 
✅ App móvil para clientes 
✅ Integración con WhatsApp 
✅ Informes de uso de cupones 
✅ Validación automática de cupones 
✅ Seguridad básica implementada 
✅ Pruebas unitarias y de carga 
✅ Manual de usuario 
✅ Guía técnica para mantenimiento 