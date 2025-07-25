# 🦷 Clínica Odontológica - Página Web + Dashboard Administrativo

Este proyecto es una solución completa para una **clínica odontológica**, desarrollada con **React + TypeScript + Vite**. Incluye una **página web pública** para los pacientes y un **panel administrativo (dashboard)** que permite al personal de la clínica gestionar servicios, especialistas, citas, preguntas frecuentes, redes sociales y más.

---

## 🚀 Tecnologías Utilizadas

- **React** + **TypeScript**
- **Vite** para desarrollo rápido
- **TailwindCSS** para estilos
- **React Router** para navegación
- **Sonner** para notificaciones (toasts)
- **Context API** para manejo de estado global
- **Zod** (opcional) para validaciones
- **React Icons** para íconos SVG modernos

---

## 🧭 Funcionalidades de la Página Web

- Página de **Inicio** con información general
- Página de **Servicios** disponibles
- Página de **Contacto** con redes sociales y detalles
- Página de **Citas** para agendar una consulta
- Testimonios de pacientes (seleccionables desde el dashboard)
- Preguntas frecuentes (FAQ)
- Diseño completamente **responsive**
- Footer dinámico con redes sociales configurables

---

## 🛠️ Funcionalidades del Dashboard (Admin)

Ruta protegida: `/admin/dashboard`

- **Gestión de Especialistas**

  - Crear, editar, eliminar
  - Agregar imágenes y descripción

- **Gestión de Servicios**

  - CRUD completo
  - Cambiar nombre, duración, imagen y descripción

- **Gestión de Comentarios**

  - Ver comentarios enviados por pacientes
  - Seleccionar cuáles se muestran en la página principal

- **Gestión de Citas**

  - Visualización de citas agendadas por fecha y hora
  - Estado de cita: completada o pendiente

- **Gestión de Preguntas Frecuentes (FAQ)**

  - Crear, editar y eliminar preguntas frecuentes
  - Se reflejan en la web pública

- **Gestión de Redes Sociales**

  - Agregar o eliminar enlaces a redes como Facebook, Instagram, WhatsApp, etc.
  - Reflejadas dinámicamente en el footer

- **Perfil de Usuario**
  - Ver o editar información del administrador (nombre, correo, etc.)

---

## 📦 Estructura de Carpetas

```
src/
├── assets/              # Imágenes y constantes
├── components/          # Componentes reutilizables (Navbar, Footer, Cards, Modales)
├── constants/           # Rutas, íconos, configuraciones estáticas
├── hooks/               # Hooks personalizados (ej. useUtils)
├── pages/               # Vistas principales: Inicio, Contacto, Servicios, Admin
├── provider/            # Context Providers (Servicios, Sociales)
├── types/               # Tipado global (interfaces y tipos)
├── utils/               # Funciones de utilidad (copiar al portapapeles, etc.)
└── App.tsx              # Enrutador principal y layout
```

# Instalar dependencias

npm install

# Ejecutar servidor de desarrollo

npm run dev

# Generar build para producción

npm run build

# Previsualizar build

npm run preview
