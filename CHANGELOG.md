# Changelog

Todas las modificaciones notables de este proyecto se documentarán en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), y este proyecto sigue las [versiones semánticas](https://semver.org/lang/es/).

## [0.5.0] - 2025-02-XX

### 🚀 Añadido
- Se crearon las pantallas **Login** y **Registro** utilizando *react-hook-form* y *zod* para la validación de formularios.
- Se configuró **Redux Toolkit** para la gestión de usuario, implementando acciones asíncronas de login y registro, y se integró **AsyncStorage** para persistir la sesión.
- Se implementaron **rutas protegidas** mediante la lógica en el layout global de expo-router, redirigiendo a la pantalla de Login para usuarios no autenticados.
- Se reorganizó la estructura de rutas de la aplicación utilizando grupos (por ejemplo, la carpeta `(auth)`) para no romper la navegación existente.


## [0.4.0] - 2025-02-26

### 🚀 Añadido
- Se integró la carga de datos de ciudades desde una **API web**, reemplazando la fuente estática.
- Se actualizó la lógica de obtención de datos utilizando un servicio y un hook personalizado en TypeScript.
- Se incorporó un campo de búsqueda (TextInput) en la pantalla de **Ciudades** para filtrar la lista de ciudades según el nombre ingresado.

## [0.3.0] - 2025-02-10

### 🚀 Añadido
- Se implementó una **animación Lottie** en el **Splash Screen** en lugar del texto "Cargando...".
- Se agregó la librería `lottie-react-native` para manejar animaciones en la pantalla de carga.
- La animación se reproduce automáticamente y se repite en bucle hasta que finaliza el splash.
- Luego de **5 segundos**, la animación desaparece y la app redirige a la pantalla de pestañas (`/tabs`).

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
