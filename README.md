# Proyecto XYZ

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## 📌 Versionado Semántico

Este proyecto sigue el estándar de **Versionado Semántico** ([SemVer](https://semver.org/lang/es/)) para gestionar las versiones del software.  

El esquema de versionado es:

- **MAJOR (`X.0.0`)**: Se incrementa cuando se realizan **cambios incompatibles** en la API.
- **MINOR (`0.Y.0`)**: Se incrementa cuando se añaden **nuevas funcionalidades** de manera retrocompatible.
- **PATCH (`0.0.Z`)**: Se incrementa cuando se realizan **correcciones de errores** de manera retrocompatible.

📌 **Ejemplo de versiones:**
- `2.1.3` → Mayor `2`, menor `1`, parche `3`.
- `1.4.0` → Se agregó una nueva funcionalidad de forma compatible.
- `3.0.0` → Se hicieron cambios incompatibles con versiones anteriores.

Para más información, visita la documentación oficial de [SemVer](https://semver.org/lang/es/).

---

## 📌 Formato de Commits

Seguimos la convención de **[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)** para los mensajes de commit. Esto garantiza un historial de cambios claro y estructurado.

### **📜 Formato de Commit**
```
<tipo>(<ámbito opcional>): <descripción>

[cuerpo opcional]

[pie de página opcional]
```

### **🔹 Tipos de Commits**
| Tipo    | Descripción |
|---------|------------|
| `feat`  | 🚀 Nueva funcionalidad |
| `fix`   | 🐛 Corrección de errores |
| `docs`  | 📖 Cambios en la documentación |
| `style` | 🎨 Cambios de formato o estilo (sin afectar la lógica) |
| `refactor` | 🔧 Refactorización sin cambios en la funcionalidad |
| `perf`  | ⚡ Mejora de rendimiento |
| `test`  | 🧪 Adición o modificación de pruebas |
| `chore` | 🔄 Actualización de herramientas o configuración |

---

### **📌 Ejemplos de Commits Correctos**
#### ✅ Nueva Funcionalidad
```
feat(autenticación): añade soporte para OAuth2
```

#### ✅ Corrección de Error
```
fix(carrito): corrige error al actualizar cantidad de productos
```

#### ✅ Documentación
```
docs(README): actualiza instrucciones de instalación
```

#### ✅ Cambio que rompe compatibilidad
```
feat(api)!: elimina el endpoint obsoleto /api/v1/usuarios

BREAKING CHANGE: Se ha eliminado el endpoint /api/v1/usuarios. Utilice /api/v2/usuarios en su lugar.
```

Para más detalles sobre este estándar, revisa [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

---

## 📌 Cómo Hacer un Commit Correcto
Ejemplo de uso en terminal:
```sh
git commit -m "feat(perfil): añade opción para subir foto de perfil"
```

Si necesitas incluir un cuerpo de mensaje más detallado:
```sh
git commit -m "fix(login): soluciona problema de autenticación con Google" -m "El error ocurría cuando el usuario ingresaba credenciales incorrectas. Se añadió manejo de errores."
```

---

## 📌 Flujo de Versionado y Commits en el Proyecto
1. 🛠️ **Desarrollar una nueva funcionalidad o corrección.**
2. ✅ **Hacer commits siguiendo el estándar de Conventional Commits.**
3. 📌 **Actualizar `CHANGELOG.md` con los cambios realizados.**
4. 🔖 **Actualizar la versión en `package.json` siguiendo SemVer.**
5. 🚀 **Subir los cambios y abrir un Pull Request.**

---

🎯 **Siguiendo estas convenciones, mantenemos un historial claro, ordenado y automatizable para futuras versiones.**  
💡 **Si tienes dudas o sugerencias, contribuye al proyecto o revisa la documentación oficial.**

🚀 **[¡Ahora puedes documentar fácilmente nuevas funcionalidades con GIFs en tus PRs!](docs/GIF_GUIDE.md)** 🎉

