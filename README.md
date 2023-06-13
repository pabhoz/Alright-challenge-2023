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

- POST /users/register: Este endpoint permite registrar un nuevo usuario. Recibe los datos de registro, como el correo electrónico y la contraseña, y crea un nuevo usuario en la base de datos.

- POST /users/login: Este endpoint permite a los usuarios iniciar sesión. Recibe las credenciales de inicio de sesión, como el correo electrónico y la contraseña, verifica si son válidas y devuelve un token de autenticación.

- GET /documents: Este endpoint devuelve una lista de todos los documentos almacenados en la base de datos. Proporciona información básica sobre cada documento, como su ID, nombre y estado.

- POST /documents: Este endpoint permite subir un nuevo documento. Recibe el archivo del documento y otros datos, como el título, y lo guarda en la base de datos.

- PUT /documents/:id: Este endpoint permite actualizar un documento existente. Recibe el ID del documento y los datos actualizados, como el nuevo título, y actualiza la información del documento en la base de datos.

- DELETE /documents/:id: Este endpoint permite eliminar un documento existente. Recibe el ID del documento y lo elimina de la base de datos.

- GET /users: Este endpoint devuelve una lista de todos los usuarios registrados en el sistema. Proporciona información básica sobre cada usuario, como su ID y correo electrónico.

- GET /users/:id: Este endpoint devuelve información detallada sobre un usuario específico. Recibe el ID del usuario y devuelve información adicional, como su nombre, apellido u otra información relevante.

- POST /users/:id/review: Este endpoint permite solicitar una revisión de un documento por parte de otro usuario. Recibe el ID del usuario que realizará la revisión y realiza la solicitud asociada al documento.

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

# FrontEnd con Angular - Document management System

Este frontend en Angular se conecta con un backend en NestJS para crear un sistema de gestión de documentos. Proporciona una interfaz de usuario intuitiva y fácil de usar para realizar diversas operaciones relacionadas con los documentos.

## Funcionalidades principales

- El frontend ofrece las siguientes funcionalidades principales:

- Registro de usuarios: Los usuarios pueden registrarse en el sistema proporcionando su correo electrónico y contraseña.

- Inicio de sesión: Los usuarios registrados pueden iniciar sesión en el sistema utilizando sus credenciales de registro.

- Dashboard: Después de iniciar sesión, los usuarios son redirigidos a un panel de control donde pueden acceder a las diferentes secciones y características del sistema.

- Mis documentos: Los usuarios pueden subir documentos en formato PDF con un tamaño máximo de 5 MB. Pueden asignar un título a cada documento que suben.

- Vista previa de documentos: Al seleccionar un documento de la lista de "Mis documentos", se muestra una vista previa del documento para que los usuarios puedan ver su contenido.

- Solicitud de revisión: Los usuarios tienen la opción de solicitar la revisión de un documento. Pueden seleccionar un revisor de una lista de usuarios registrados para que revise el documento.

- Comentarios y anotaciones: Durante el proceso de revisión, los usuarios pueden dejar comentarios y anotaciones en el documento. Estos comentarios y anotaciones pueden ser revisados y aceptados o rechazados por el revisor.

- Eliminación de documentos: Los usuarios pueden eliminar documentos de su lista de "Mis documentos" si ya no son necesarios.

- Estados de documentos: Los documentos tienen estados que indican su progreso en el proceso de revisión, como "En revisión", "Sin revisar", "Rechazado" o "Aceptado".

# Como funciona

1. Clonar el repositorio
2. Instalar dependencias
3. Configurar el backend: Asegúrate de que el backend en NestJS esté configurado y en ejecución en la URL correspondiente.
4. Configurar la URL del backend en el archivo `src/enviroments/enviroment.ts`, debemos asegurarnos que la propiedad `apiUrl` tenga la url del backend

```export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000', // Reemplaza con la URL de tu backend
};
```

5. iniciar la app: `ng serve`
6. Acceder a la aplicación: abre un navegador web y visita la url correspondiente
7. Registrar un nuevo usuario
8. Iniciar sesión
9. Explorar funcionalidades

## Tecnologías utilizadas

- Angular: Framework de desarrollo web utilizado para construir el frontend
- NestJS: Framework de desarrollo web utilizado para construir el backend
- TypeScript: Lenguaje de programación utilizado
- HTML/CSS: Lenguajes de marcado utilizados para la estructura y estilización de la interfaz de usuario.

## Requisitos del sistema

- Node.js v14 o superior
- Angular CLI v12 o superior
- Navegador web moderno compatible

## Notas

Asegúrate de tener el backend en ejecución antes de utilizar el frontend. Verifica que la URL del backend esté configurada correctamente en el archivo environment.ts del frontend. Si es necesario, ajusta las configuraciones de conexión según corresponda.

Este frontend fue desarrollado para funcionar en conjunto con un backend en NestJS, siguiendo las especificaciones y endpoints proporcionados. Asegúrate de tener el backend implementado correctamente para que el frontend funcione correctamente.

# Créditos

Este proyecto desarrollado en Angular y NestJS fue desarrollado por Juan Manuel Marin y se realiza para aspirar al cargo de desarrollador para la empresa Alright, siendo esta su prueba tecnica, este proyecto solo se permite para demostrar los conocimientos que poseo en el desarrollo web y no esta permitido su utilización directa por la empresa como producto directo, ya que esto es una prueba y no un desarrollo por la empresa.
