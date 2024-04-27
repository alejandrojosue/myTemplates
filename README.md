# Proyecto Sistema de Inventario

## 🛠️ Instalación

1. Clona el repositorio

   ```sh
   git clone https://github.com/alejandrojosue/myTemplates.git
   ```

2. Instala los paquetes de NPM

   ```sh
   npm install
   ```

3. Ejecuta el proyecto
	 - Modo desarrollo 
   ```sh
   npm run dev
   ```
   - Modo producción (Proyecto ya desplegado)
   ```sh
   npm run start
   ```

## 🚀 Estructura del Proyecto

Dentro de su proyecto Astro, verá las siguientes carpetas y archivos:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── myIcon.svg
│   ├── auth/
│   │   └── ProtectedRouted.jsx
│   ├── components/
│   |   ├── backdrop/
│   |   |   ├── Loading.jsx
│   │   |   └── SimpleBackdrop.jsx
│   │   ├── cards/
│   |   |   ├── Card.jsx
│   |   |   ├── CardHome.jsx
│   |   |   ├── CardLoading.jsx
│   |   |   ├── Cards.jsx
│   │   |   └── cards.scss
│   │   ├── chart/
│   |   |   ├── Loading.jsx
│   │   |   └── SimpleBackdrop.jsx
│   │   ├── datatable/
│   |   |   ├── Loading.jsx
│   │   |   └── SimpleBackdrop.jsx
│   │   ├── DateRange/
│   |   |   ├── Loading.jsx
│   │   |   └── SimpleBackdrop.jsx
│   │   ├── error/
│   |   |   ├── Loading.jsx
│   │   |   └── SimpleBackdrop.jsx
│   │   ├── filters/
│   |   |   ├── Loading.jsx
│   │   |   └── SimpleBackdrop.jsx
│   │   ├── modal/
│   |   |   ├── Loading.jsx
│   │   |   └── SimpleBackdrop.jsx
│   │   ├── navbar/
│   |   |   ├── Loading.jsx
│   │   |   └── SimpleBackdrop.jsx
│   │   ├── sidebar/
│   |   |   ├── Loading.jsx
│   │   |   └── SimpleBackdrop.jsx
│   │   ├── table/
│   |   |   ├── Loading.jsx
│   │   |   └── SimpleBackdrop.jsx
│   │   └── widget/
│   |   |   ├── Loading.jsx
│   │   |   └── SimpleBackdrop.jsx
│   ├── css/
│   │   ├── config/
│   │   │   └── colors.css
│   │   ├── includes/
│   │   │   └── aside.css
│   │   └── style.css
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── home.astro
│   |   ├── index.astro
│   |   └── notifications.astro
│   ├── services/
│   |   └── redSocial.ts
│   └── types/
└── package.json
```

Astro busca archivos `.astro` o `.md` en el directorio `src/pages/`. Cada página se expone como una ruta según su nombre de archivo.

En `src/components/` es donde se colocan los componentes hechos con Astro/React/Vue/Svelte/Preact.

Cualquier activo estático, como imágenes, se puede colocar en el directorio `public/`.

Directorio `src/services/` es donde se crearan todas las conexiones a las apis que deba conectarse para mantener totalmente funcional el proyecto.

Todos los tipos de datos enviados u obtenidos por la api se encontrarán en `src/types/` 

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal.

| Command                   | Action                                                |
| :------------------------ | :-----------------------------------------------      |
| `npm install`             | Instalar dependencias                                 |
| `npm run dev`             | Iniciar servidor local dev en `localhost:4321`        |
| `npm run build`           | Contruye para producción tu proyecto `./dist/`        |
| `npm run preview`         | Vista previa de su compilación antes de implementarla |
| `npm run astro ...`       | Ejecute comandos CLI como `astro add`, `astro check`  |
| `npm run astro -- --help` | Obtenga ayuda para usar Astro CLI                     |
