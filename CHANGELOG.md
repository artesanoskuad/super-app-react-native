# Changelog

Todas las modificaciones notables de este proyecto se documentarán en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), y este proyecto sigue las [versiones semánticas](https://semver.org/lang/es/).

## [0.2.0] - 2025-02-XX

### 🚀 Añadido
- Implementación de la **navegación de pestañas** con **Expo Router**.
- Configuración de `_layout.tsx` para manejar la navegación con `<Tabs>`.
- Creación de las pestañas **"Inicio"** y **"Ciudades"**.
- Se movieron los componentes `Hero` y `Carousel` a la pantalla de inicio.
- Implementación de la pantalla **"Ciudades"**, mostrando una lista de ciudades con `FlatList`.
- Creación del componente `CityCard` que muestra el nombre e imagen de cada ciudad.
- Implementación de la pantalla **"Detalle de ciudad"**, usando rutas dinámicas `[name]`.
- Se agregó la navegación desde `CityCard` hacia el detalle de la ciudad.
- Ahora la barra de navegación (toolbar) muestra el **nombre de la ciudad** en lugar de `[name]`.


## [0.1.0] - 2025-02-04
### 🏗️ Primera versión

- **Funcionalidad "Itinerario":**
  - Implementación de la pantalla principal con el componente `Hero` que muestra el título "MyTinerary" y el subtítulo "Encuentra tu itinerario de viaje perfecto".
  - Creación del componente `Carousel` que muestra una serie de imágenes relacionadas con destinos de viaje, cada una con su nombre correspondiente.
  - Configuración inicial del proyecto con TypeScript y estructura de carpetas organizada.
