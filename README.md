# Proyecto Sistema de Inventario y Facturación

<details>
<summary>Tabla de contenidos</summary>

- [📋 Descripción](#descripción)
- [🛠️ Instalación](#instalación)
- [🏗️ Estructura del Proyecto](#estructura-del-proyecto)
- [📁 Carpetas](#carpetas)
- [💻 Comandos](#️comandos)

</details>

## 📋 Descripción

El proyecto de sistema de facturación es una plataforma diseñada para simplificar el proceso de facturación y gestión financiera para individuos y empresas. Esta aplicación proporciona una interfaz intuitiva y potentes funcionalidades para generar facturas de manera eficiente, llevar el inventario del producto e incluso visualizar datos importantes que describan las ganancias de la empresa.

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

## 🏗️ Estructura del Proyecto

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
│   │   ├── widget/
│   |   |   ├── Loading.jsx
│   │   |   └── SimpleBackdrop.jsx
│   ├── config/
│   │   └── apiConfig.js
│   ├── helpers/
│   ├── hooks/
│   ├── languages/
│   |   ├── en.json
│   │   └── es.json
│   ├── layout/
│   │   └── Layout.jsx
│   ├── mapper/
│   ├── models/
│   ├── pages/
│   ├── repositories/
│   ├── scss/
│   │   ├── config/
│   │   │   └── colors.css
│   │   ├── includes/
│   │   │   └── aside.css
│   │   └── style.css
│   ├── types/
│   │   └── validation-type.ts
│   └── util/
│   ├── dataFetching.ts
|   ├── ErrorFetch.ts
|   └── main.ts
├── app.jsx
├── main.jsx
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.js
```

## 📁 Carpetas

Cualquier activo estático, como imágenes, se puede colocar en el directorio `public/` o en `src/assets/`.

Las validaciones para los permisos de accesos serán validados en el directorio `src/auth/`.

En `src/components/` es donde se colocan los componentes hechos con React basados en formato `.jsx`.

Las configuraciones controladas en `src/config` son aquellas que hacen referencia a la conexión con la api, como ser la url según el modo del proyecto (desarrollo | producción).

En `src/helpers` se almacenan aquellas funciones que nos permiten repetir funciones disponibles en el sistemas, tales como exportar PDF o graficar reportes.

Los Hooks personalizados se encontrarán usados en el proyecto en `src/hooks`.

Todos los idiomas del sistema, se configurarán en formato `.json` en la carpeta `src/languages`.

Los modelos que representarán los datos enviados y recibidos de la api se almacenarán en la carpeta `/src/models`.

Directorio `src/repositories/` es donde se crearan todas las conexiones a la api que deba conectarse para mantener totalmente funcional el proyecto usando el patrón repositorio.

Todos los tipos de datos enviados u obtenidos por la api se encontrarán en `src/types/` 

En `src/util` estarán las conexiones directas con la api usando fetch y algunos archivos de errores.

## 💻 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal.

| Command                   | Action                                                |
| :------------------------ | :-----------------------------------------------      |
| `npm install`             | Instalar dependencias                                 |
| `npm run dev`             | Iniciar servidor local dev en `localhost:3001`        |
| `npm run build`           | Contruye para producción tu proyecto `./dist/`        |
| `npm run lint`            | Ejecuta ESLint para analizar y encontrar errores      |
| `npm run lint:fix`        | Ejecuta ESLint para corregir errores y Stylelint para corregir estilos |
| `npm run preview`         | Vista previa de su compilación antes de implementarla |
| `npm run test`            | Ejecuta pruebas unitarias                             |
| `npm run eject`           | Extrae la configuración de react-scripts              |
