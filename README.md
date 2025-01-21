Tecnologías

React
Axios (para hacer peticiones HTTP)
React Router (para manejo de rutas)
CSS/SCSS (o algún framework como TailwindCSS)
JWT (JSON Web Tokens) para autenticación en el cliente

Requisitos Previos
Node.js y npm
Al igual que en el backend, también necesitarás Node.js y npm instalados en tu máquina.

Editor de texto
Usa un editor como VSCode para editar tu código.


1. Clona el repositorio del frontend
git clone 
cd - para cambiar a la carpeta o ruta deseada
2. Instala las dependencias del frontend
npm install
3. Crea un archivo .env en la raíz del frontend para configurar la URL de tu API backend
REACT_APP_API_URL=http://localhost:5000/api
4. Ejecuta la aplicación en desarrollo
npm start / npm run dev
Esto iniciará el frontend en http://localhost:3000.

Funcionalidades
1. Registro de Usuario
 El usuario ingresa su nombre de usuario, correo electrónico y contraseña.
2. Autenticación de Usuario (Login)
 El usuario ingresa su correo electrónico y contraseña.
3. Publicar Tuits
El usuario puede escribir un tuit y enviarlo al backend.
4. Seguir/Dejar de Seguir a Usuarios
El usuario puede hacer clic en un botón para seguir a otro usuario.
5. Feed de Tuits
 El usuario ve una lista de tuits de las personas que sigue.


