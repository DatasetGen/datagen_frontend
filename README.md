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
├── src/                            # Código fuente principal
│   ├── api/                        # Llamadas a servicios REST (Datagen backend)
│   ├── assets/                     # Imágenes, íconos y otros archivos estáticos
│   ├── business_components/        # Componentes específicos del dominio (features)
│   ├── component_library/          # Componentes reutilizables y genéricos (UI library)
│   ├── pages/                      # Vistas principales y rutas asociadas
│   ├── stores/                     # Estados globales (Zustand u otro state manager)
│   ├── types/                      # Definiciones de tipos y modelos (TypeScript)
│
├── public/                         # Archivos estáticos públicos
├── Dockerfile                      # Imagen de producción
├── vite.config.ts                  # Configuración de Vite
└── README.md
```

### 🧩 ¿Cómo se organizan los componentes?

* **`component_library/`** contiene los bloques reutilizables estilo UI kit: botones, inputs, modales, tooltips, etc.
* **`business_components/`** agrupa componentes funcionales con lógica de negocio, como formularios, tablas con lógica, o flujos relacionados a datasets, usuarios, anotaciones, etc.
* **`pages/`** usa estos componentes para formar pantallas completas.


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
