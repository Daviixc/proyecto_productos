# Proyecto: Sistema de Productos (API REST + Cliente Web con Vue 3)

### Autor: **David (Daviixc)**
**Materia:** Infraestructura de Servicios Digitales  
**Institución:** Tec Superior  
**Fecha:** Noviembre 2025  

---

## Descripción general

Este proyecto implementa un **sistema completo de gestión de productos**, desarrollado bajo una arquitectura **cliente-servidor**.

- El **backend** fue construido con **Node.js + Express** y **PostgreSQL**, completamente contenerizado con **Docker Compose**.  
- El **frontend** fue desarrollado con **Vue 3 + Vite**, consumiendo la API REST del backend mediante **Axios**.  

Permite realizar operaciones **CRUD** (crear, leer, actualizar y eliminar productos), además de **filtros por texto, categoría, marca y rango de precios**.

---

## ⚙️ Estructura general del proyecto
proyecto-productos/
├─ docker-api-productos/ # Backend contenerizado
│ ├─ backend/
│ │ ├─ app.js # Servidor Express
│ │ ├─ db.js # Conexión PostgreSQL
│ │ ├─ package.json # Dependencias y scripts
│ │ ├─ Dockerfile # Imagen del backend
│ ├─ init/init.sql # Creación de tabla y datos iniciales
│ ├─ docker-compose.yml # Orquestación de servicios
│ └─ .env # Variables de entorno
│
└─ cliente-api-productos/ # Frontend con Vue 3
├─ src/
│ ├─ main.js # Punto de entrada de la app
│ ├─ App.vue # Layout principal
│ ├─ pages/ProductosPage.vue # Lógica de interfaz
│ ├─ components/ # Formulario y tabla de productos
│ ├─ services/api.js # Conexión Axios con la API
│ └─ styles/main.css # Estilos globales
├─ .env # VITE_API_URL del backend
├─ package.json
└─ vite.config.js
---
Principales características
Característica	Descripción
🔹 CRUD completo	Alta, consulta, edición y eliminación de productos
🔹 Filtros dinámicos	Búsqueda por nombre, categoría, marca y rango de precios
🔹 Validaciones	Campos requeridos y precio no negativo
🔹 Interfaz reactiva	Vue 3 con Composition API y reactividad
🔹 Backend seguro	Validación de datos, CORS, PostgreSQL en red interna
🔹 Contenerización	Docker Compose con backend, DB y pgAdmin

Tecnologías utilizadas
Capa	Tecnologías
Frontend	Vue 3, Vite, Axios, HTML5, CSS3
Backend	Node.js, Express, PostgreSQL, CORS
Infraestructura	Docker, Docker Compose, pgAdmin
Herramientas	VS Code, Postman, GitHub

Flujo general del sistema
[ Usuario ]
     ↓
[ Frontend Vue ]
     ↓ (Axios HTTP)
[ API REST - Express ]
     ↓ (Query SQL)
[ PostgreSQL ]


1️⃣ El usuario interactúa desde la interfaz Vue.
2️⃣ Las peticiones HTTP son enviadas al backend Express.
3️⃣ El backend valida y ejecuta consultas en PostgreSQL.
4️⃣ Se devuelven respuestas JSON que Vue renderiza de forma reactiva.

Créditos

Proyecto desarrollado por David (Daviixc)
💻 Estudiante de Ingeniería en Sistemas Computacionales
🐈‍⬛ Con la compañía de Nubia y Zuki mientras se programaba este sistema 😺
