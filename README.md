# Backend con NestJS para gestión de documentos y autenticación de usuarios

Este proyecto es un backend desarrollado con NestJS que permite la gestión de documentos en formato PDF y la autenticación de usuarios mediante registro e inicio de sesión. Los documentos y la información de los usuarios se almacenan en una base de datos MySQL. Este proyecto es creado para aspirar al puesto de desarrollador junior en la empresa Alright. Esta prueba es creada por Juan Manuel Marin.
LinkedIn: https://www.linkedin.com/in/juanmanuelmaring/

## Requisitos previos

Antes de ejecutar este backend, asegúrate de tener instalado lo siguiente:

- Node.js: [Descargar Node.js](https://nodejs.org)
- MySQL: [Descargar MySQL](https://www.mysql.com/downloads/)

## Instalación

1. Clona este repositorio en tu máquina local:

git clone https://github.com/jujanma/Alright-challenge-2023/tree/tecnica

2. Navega hasta el directorio del proyecto

3. Instala las dependencias del proyecto:

npm install

## Configuración de la base de datos

1. Crea una base de datos en MySQL para el proyecto.

2. Abre el archivo `ormconfig.json` y actualiza los valores de configuración de la base de datos con los datos de tu entorno:

```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "pruebaAlright",
  "password": "prueba",
  "database": "bd_prueba_alright",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```

## Uso

1. Inicia el servidor de desarrollo:

npm run start:dev

2. El backend estará disponible en `http://localhost:3000`

### Endpoints

- POST /documents/upload: Permite cargar un documento PDF al servidor.
- GET /documents/:id: Obtiene la información de un documento específico.
- PUT /documents/:id: Actualiza la información de un documento específico.
- DELETE /documents/:id: Elimina un documento específico.
- POST /users/register: Registra un nuevo usuario.
- POST /users/login: Inicia sesión de un usuario existente.

## Las Querys para crear las tablas y vistas de la base de datos

```
<!-- -- Creación de la tabla 'users' para almacenar la información de los usuarios -->
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

<!-- -- Creación de la tabla 'documents' para almacenar la información de los documentos -->
CREATE TABLE documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  file VARCHAR(255) NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

<!-- -- Creación de la vista 'document_view' para obtener información de documentos y usuarios relacionados -->
CREATE VIEW document_view AS
SELECT d.id AS document_id, d.name AS document_name, d.file AS document_file, u.id AS user_id, u.email AS user_email
FROM documents d
JOIN users u ON d.user_id = u.id;

```
