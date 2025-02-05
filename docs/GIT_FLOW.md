# 🚀 Estrategia de Git

Este documento describe la estrategia de ramas y flujo de trabajo en Git para el desarrollo del proyecto.  

## 📌 Rama Principal (`master`)
- **`master` representa la versión en producción** y es un reflejo de lo que está disponible en la tienda.  
- **Cada commit en `master` es candidato para un lanzamiento.**  

## 📌 Tipos de Ramas
Cada desarrollo debe hacerse en una rama específica según el tipo de cambio:

| Tipo de Rama | Convención | Propósito |
|-------------|------------|-----------|
| `feature/` | `feature/nueva-funcionalidad` | Nuevas funcionalidades |
| `fix/` | `fix/error-login` | Corrección de errores |
| `hotfix/` | `hotfix/crash-ios` | Corrección urgente en producción |
| `structure/` | `structure/mejora-arquitectura` | Refactorización o cambios en arquitectura |
| `spike/` | `spike/prueba-tecnologia` | Exploración de tecnologías o pruebas técnicas |

## 📌 Flujo de Desarrollo

1️⃣ **Crear una rama desde `master`**
```sh
git checkout master
git pull origin master
git checkout -b feature/nueva-funcionalidad
```

2️⃣ **Desarrollar la funcionalidad y confirmar cambios**
```sh
git add .
git commit -m "feat(login): implementar autenticación con OAuth2"
```

3️⃣ **Subir cambios al repositorio**
```sh
git push origin feature/nueva-funcionalidad
```

4️⃣ **Crear un Pull Request (PR)**
- El PR ejecuta pruebas automáticas en **GitHub Actions**.
- Si todo pasa, QA prueba la app en **Firebase App Distribution**.

5️⃣ **Si QA y el equipo de desarrollo aprueban, hacer merge en `master`**
```sh
git checkout master
git merge feature/nueva-funcionalidad
git push origin master
```

6️⃣ **El pipeline de `master` ejecuta pruebas UI y publica la app en Play Store & TestFlight.**

---
📌 **Reglas Clave:**  
✅ Todo cambio pasa por un PR antes de llegar a `master`.  
✅ QA valida las nuevas funcionalidades en **Firebase App Distribution** antes del release.  
✅ Los hotfixes se crean desde `master` y se fusionan directamente tras la corrección.  
