Aquí tienes una versión mejorada, más clara, ordenada y profesional del `README.md` del **Datagen Frontend**, manteniendo toda la información útil y expandiéndola para una mejor comprensión:

---

# 🖼️ Datagen Frontend

**Datagen Frontend** es la interfaz web del proyecto Datagen, una plataforma SaaS para la generación y anotación de datasets mediante inteligencia artificial. Esta aplicación permite a los usuarios gestionar datasets, imágenes, anotaciones, usuarios y trabajos desde una experiencia gráfica moderna y responsiva.

Está desarrollado con **React**, **TypeScript**, **Vite** y **Tailwind CSS**.

---

## ✅ Requisitos

* **Node.js 20+**
* **pnpm** como gestor de paquetes ([https://pnpm.io/](https://pnpm.io/))

---

## 🚀 Instalación y uso

1. **Instalar dependencias**

   ```bash
   pnpm install
   ```

2. **Iniciar el servidor de desarrollo**

   ```bash
   pnpm dev
   ```

   El proyecto estará disponible en `http://localhost:5173`.

3. **Analizar el código con ESLint**

   ```bash
   pnpm lint
   ```

---

## 📦 Construcción para producción

Para generar una versión optimizada del proyecto:

```bash
pnpm build
```

Previsualizar el resultado compilado localmente:

```bash
pnpm preview
```

---

## 🐳 Uso con Docker

Se proporciona un `Dockerfile` que permite generar una imagen lista para producción. Para construir y correr localmente:

```bash
docker build -t datagen-frontend .
docker run -p 80:80 datagen-frontend
```

---

## 📁 Estructura de carpetas

```
datagen-frontend/
│
├── public/               # Archivos estáticos públicos
├── src/                  # Código fuente principal
│   ├── components/       # Componentes reutilizables
│   ├── features/         # Módulos de funcionalidad agrupados por entidad
│   ├── hooks/            # Custom React Hooks
│   ├── pages/            # Páginas principales de la aplicación
│   ├── routes/           # Rutas y navegación
│   ├── services/         # Llamadas a la API / servicios externos
│   └── utils/            # Utilidades generales
├── Dockerfile            # Imagen de producción
├── vite.config.ts        # Configuración de Vite
└── README.md
```

---

## 📐 Convenciones de componentes

El frontend sigue una estructura modular basada en formularios y diálogos reutilizables por entidad:

* `[Entity]CreateForm` – Formulario para crear entidades
* `[Entity]UpdateForm` – Formulario para editar entidades
* `[Entity]RemoveForm` – Confirmación y eliminación
* `[Entity][FormType]Dialog` – Diálogos modales para formularios específicos
* `Dialog` – Componente genérico de diálogo/modal
* `FormType` – Enum o tipo para representar tipos de formulario

Esto permite una extensión y mantenibilidad sencilla conforme crecen las entidades de negocio.

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas!

Antes de abrir una solicitud de incorporación de cambios (pull request):

1. Asegúrate de que tu código pase los análisis de estilo:

   ```bash
   pnpm lint
   ```

2. Sigue las convenciones de componentes y nomenclatura del proyecto.

---

¿Deseas que lo acompañe con un diagrama de estructura visual o un archivo `CONTRIBUTING.md` para nuevas personas desarrolladoras?
