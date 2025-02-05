# 🚀 Estrategia de Releases

Este documento describe cómo se publican las versiones en **Google Play (Track Interno)** y **iOS TestFlight**, asegurando calidad y estabilidad.

## 📌 Flujo de Publicación

### 🔹 **Ramas de Desarrollo**
- **Todas las ramas (`feature/`, `fix/`, `structure/`, `spike/`) deben ser validadas antes de mergearse en `master`.**  
- **Las pruebas manuales de QA se hacen con Firebase App Distribution antes del release.**  

### 🔹 **Publicación en `master`**
1. **Merge en `master` activa el pipeline de release en GitHub Actions.**  
2. **Se ejecutan las siguientes validaciones:**  
   - ✅ Check Style (ESLint, Prettier)  
   - ✅ Pruebas Unitarias con Jest (`jest --coverage`)  
   - ✅ Análisis Estático (TypeScript + SonarCloud)  
   - ✅ Pruebas UI/Snapshot con Detox  
3. **Si todo pasa, se publican las apps:**  
   - 🚀 **Google Play (Track Interno)**
   - 🚀 **iOS TestFlight**

### 🔹 **Gestión de Versiones y Tags**
- **Se usa `tag` solo para versiones públicas (Ejemplo: `v1.0.0`)**  
- **Las versiones en Internal Track NO llevan tag, solo la última build de `master`.**  
- **El versionado sigue SemVer (MAJOR.MINOR.PATCH).**

### 🔹 **Manejo de Credenciales**
- Los secretos de API se guardan en **GitHub Secrets en Base64**  
- Se decodifican en el primer paso del pipeline (`setup`)  

```sh
echo "$GOOGLE_PLAY_KEY" | base64 --decode > google-play-key.json
```

### 🔹 **Corrección de Errores en `master`**
- **Si las pruebas de UI fallan en `master`, el release se bloquea.**  
- **Se crea un `hotfix/` para corregirlo antes de liberar la versión.**  

📌 **Reglas Clave:**  
✅ **Nada se publica sin aprobación de QA y validaciones automáticas.**  
✅ **Los releases en Internal Track NO necesitan tag.**  
✅ **Los secretos están cifrados y solo se usan en GitHub Actions.**  
