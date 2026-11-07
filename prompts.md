# Registro de Prompts del Proyecto: Sistema de Incidencias Técnicas

Este documento contiene la secuencia de instrucciones (*prompts*) utilizadas durante la interacción con la IA para la planeación, desarrollo, corrección de errores y documentación del proyecto.

---

## 1. Prompt Inicial: Definición de Requerimientos y Código Base

> **Prompt:**
> "Tengo que elaborar una aplicación web para registrar incidencias técnicas en un laboratorio con stack obligatorio de Node.js + Sequelize en el backend, React básico en el frontend y sesión mediante cookies.
> 
> Requisitos:
> - Login de usuario con sesión en cookie distinguiendo roles: `usuario` y `tecnico`.
> - Listado de equipos y formulario para registrar una incidencia con descripción.
> - Regla de negocio: una incidencia solo la puede cerrar el usuario que la registró o un usuario con el rol de técnico.
> - El endpoint de cierre debe verificar esta regla en el backend."

---

## 2. Prompt para solucionar el error de sesión al intentar cerrar una incidencia

> **Prompt:**
> "Oye, tengo un problema. Al hacer login todo parece ir bien, pero en cuanto intento dar clic al botón de 'Cerrar incidencia' o cambio de pantalla en React, el backend me devuelve error 401 Unauthorized y me saca del sistema.
> 
> Parece que el navegador no está enviando la cookie de sesión entre el puerto del frontend (5173) y el backend (4000). ¿Cómo se corrige este fallo tanto en Express/CORS como en los `fetch` de React para que la cookie no se pierda?"

---
## 3. Prompt para traducir los nombres de la BD al español

> **Prompt:**
> "El código inicial funciona, pero prefiero que todo el esquema de la base de datos esté en español. Por favor cambia las tablas y modelos para que se llamen `Usuario`, `Equipo` e `Incidencia`, y ajusta sus campos (`nombreUsuario`, `contrasena`, `rol`, `descripcion`, `estado`, `usuarioId`, `equipoId`)."

