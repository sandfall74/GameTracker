# GameTracker

GameTracker es una aplicación web para descubrir videojuegos, explorar su información detallada y organizar una biblioteca personal de juegos en un solo lugar.

La idea del proyecto es ofrecer una experiencia visual, rápida y entretenida para los usuarios que quieren seguir lo que juegan, lo que quieren probar y lo que ya completaron.

## ✨ Características principales

- Explora juegos populares y tendencias recientes
- Busca títulos por nombre y filtra por género o plataforma
- Visualiza detalles completos de cada juego: descripción, capturas, puntuación, fecha de lanzamiento y más
- Gestiona una biblioteca personal con estados como:
  - Jugando
  - Completado
  - Pendiente
  - Abandonado
- Diseño responsive 

## 🛠️ Tecnologías utilizadas

- React 19 + TypeScript
- Vite
- React Router DOM
- TanStack Query
- Axios
- Tailwind CSS
- shadcn/ui
- Lucide Icons

## 🚀 Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/sandfall74/GameTracker.git
cd gametracker
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto y agrega tu clave de la API de RAWG:

```env
VITE_RAWG_API_KEY=tu_clave_aqui
```

4. Inicia la aplicación en modo desarrollo:

```bash
npm run dev
```

## 🧪 Build de producción

```bash
npm run build
```

## 📁 Estructura del proyecto

```text
src/
  components/     # Componentes reutilizables y UI
  context/        # Estado global de la biblioteca
  hooks/          # Hooks personalizados
  pages/          # Páginas principales de la app
  services/       # Integración con la API RAWG
  types/          # Tipados TypeScript
```

## 🎯 Objetivo del proyecto

GameTracker busca combinar la exploración de videojuegos con la organización personal, creando una herramienta sencilla pero atractiva para fans de los videojuegos que desean tener todo en un solo lugar.

## 👤 Autor

Proyecto desarrollado como una aplicación de presentación y práctica frontend, con enfoque en experiencia de usuario, diseño y consumo de APIs.

