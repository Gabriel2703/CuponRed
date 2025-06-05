-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS cuponred;
USE cuponred;

-- Tabla de usuarios (clientes)
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    telefono VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100) NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    descripcion TEXT
);

-- Tabla de preferencias de clientes
CREATE TABLE IF NOT EXISTS preferencias_clientes (
    id_preferencia INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_categoria INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- Tabla de comercios
CREATE TABLE IF NOT EXISTS comercios (
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
);

-- Tabla de cupones
CREATE TABLE IF NOT EXISTS cupones (
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
);

-- Tabla de cupones asignados
CREATE TABLE IF NOT EXISTS cupones_asignados (
    id_asignado INT PRIMARY KEY AUTO_INCREMENT,
    id_cupon INT,
    id_usuario INT,
    fecha_asignado DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cupon) REFERENCES cupones(id_cupon),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabla de transacciones de uso de cupones
CREATE TABLE IF NOT EXISTS transacciones_uso_cupon (
    id_transaccion INT PRIMARY KEY AUTO_INCREMENT,
    id_cupon INT,
    monto_venta DECIMAL(10,2),
    descuento_aplicado DECIMAL(10,2),
    fecha_uso DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cupon) REFERENCES cupones(id_cupon)
); 