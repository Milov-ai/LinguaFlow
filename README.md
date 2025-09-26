# LinguaFlow: Traductor Multilingüe con IA

LinguaFlow es una aplicación web moderna que utiliza un Modelo de Lenguaje Grande (LLM) para ofrecer una experiencia de traducción fluida e inteligente. La aplicación detecta automáticamente el idioma del texto introducido y proporciona traducciones instantáneas a múltiples idiomas.

Este proyecto fue desarrollado como una demostración técnica, mostrando la integración de un frontend moderno en React con un backend de Node.js que consume servicios de IA a través del Vercel AI SDK.

## ✨ Características Principales

- **Detección Automática de Idioma:** No necesitas saber en qué idioma estás escribiendo; la aplicación lo detecta por ti.
- **Traducción Múltiple:** Obtén traducciones simultáneas en inglés, español y francés.
- **Interfaz Limpia y Reactiva:** Una UI minimalista y fácil de usar construida con las últimas tecnologías de React.
- **Copia con un Clic:** Copia cualquier traducción a tu portapapeles con un solo botón.

## 🛠️ Stack Tecnológico

El proyecto utiliza un conjunto de herramientas modernas y eficientes para asegurar una excelente experiencia de desarrollo y un rendimiento óptimo.

- **Frontend:**
  - **React:** Librería principal para la construcción de la interfaz.
  - **Vite:** Herramienta de desarrollo y empaquetado de alta velocidad.
  - **TypeScript:** Para un código más seguro y mantenible.
  - **Tailwind CSS:** Para un estilizado rápido y personalizable.
  - **TanStack Query:** Para la gestión del estado del servidor y las peticiones a la API.

- **Backend:**
  - **Node.js:** Entorno de ejecución para el servidor.
  - **Fastify:** Framework web de bajo overhead y alto rendimiento.
  - **Vercel AI SDK:** El kit de herramientas para conectar con modelos de IA.
  - **Google Gemini:** El modelo de lenguaje que potencia la detección y traducción.

## 🚀 Cómo Empezar

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [pnpm](https://pnpm.io/installation) (puedes instalarlo con `npm install -g pnpm`)

### 1. Clonar el Repositorio

```bash
git clone https://github.com/2025ccjrdsg/appinitAgentTranslator.git

```

### 2. Instalar Dependencias

Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

```bash
pnpm install
```

### 3. Configurar Variables de Entorno

Este proyecto necesita una clave de API de Google para funcionar.

1.  Crea una copia del archivo de ejemplo `.env.example` y renómbrala a `.env`.
    
    ```bash
    # En Windows (cmd)
    copy .env.example .env
    
    # En Linux/macOS
    cp .env.example .env
    ```
2.  Abre el nuevo archivo `.env` y añade tu clave de API de Google Gemini.
    
    ```env
    # .env
    GOOGLE_GENERATIVE_AI_API_KEY=TU_API_KEY_AQUI
    ```
    
    Puedes obtener una clave en [Google AI Studio](https://aistudio.google.com/app/apikey).

### 4. Ejecutar la Aplicación

Una vez configurado, inicia el servidor de desarrollo:

```bash
pnpm run dev
```

Esto iniciará dos procesos simultáneamente:
- El **frontend** en `http://localhost:3000`.
- El **backend** de la API en `http://localhost:4000`.

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura cliente-servidor desacoplada:

-   **Frontend (`/src`)**: Una Single-Page Application (SPA) construida con React. Se encarga de renderizar la interfaz, capturar la entrada del usuario y comunicarse con el backend a través de peticiones HTTP.
-   **Backend (`server.ts`)**: Un servidor ligero de Node.js con Fastify que expone un único endpoint (`/api/translate`). Este servidor recibe el texto del frontend, construye un prompt y utiliza el **Vercel AI SDK** para solicitar la detección y traducción al modelo **Gemini 2.5 Flash**. La comunicación entre el frontend y el backend durante el desarrollo se logra gracias al proxy configurado en Vite.