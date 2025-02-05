# 📹 Guía para Crear y Subir GIFs en Pull Requests

Para mejorar la revisión de cambios, podemos incluir **GIFs en los Pull Requests** para mostrar visualmente nuevas funcionalidades o mejoras en la interfaz.

---

## 📌 Instalación de Herramientas Necesarias

### 🖥️ **Instalar Homebrew (Requerido en macOS)**
Si usas macOS y aún no tienes `brew`, instálalo ejecutando en la Terminal:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Luego, verifica que Homebrew está instalado correctamente con:

```sh
brew --version
```

### **1️⃣ Instalar `ffmpeg` con Homebrew**
```sh
brew install ffmpeg
```

---

## **📌 Convertir Video a GIF con `ffmpeg`**

Ejecuta el siguiente comando para convertir un video en un GIF:

```sh
ffmpeg -i video.mov -vf "fps=15,scale=600:-1" output.gif
```

✅ **Ventajas**:  
- Rápido y sencillo.  
- No requiere instalación de aplicaciones gráficas.  

🚀 **Recomendaciones**:  
- Usa **FPS entre 10 y 15** para un buen balance entre fluidez y peso del archivo.  
- Mantén un **ancho máximo de 600px** para evitar archivos pesados.  
- **Evita GIFs de más de 5 segundos** en los PRs para no hacerlos muy largos.  

---

## 📌 Cómo Agregar un GIF en un Pull Request

1. **Genera el GIF con `ffmpeg` usando los pasos anteriores.**
2. **Sube el archivo GIF al Pull Request** arrastrándolo en la caja de comentarios de GitHub.
3. **GitHub generará automáticamente una vista previa** del GIF en la conversación.

Ejemplo de cómo se verá en un PR:
```
![Descripción del GIF](https://github.com/tu-repo/assets/demo.gif)
```

🚀 ¡Ahora puedes documentar fácilmente nuevas funcionalidades en tus PRs con GIFs! 🎉
