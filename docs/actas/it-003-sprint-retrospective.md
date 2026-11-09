# Acta de Sprint Retrospective — IT-003 (Sprint 3)

**Fecha:** 04/11/2026 (13:00 - 17:00)  
**Asistentes:** Sergio Jiménez (SM), Alfonso Canal (TL).  
**Esfuerzo de la ceremonia:** 2 h-p (1h por asistente).

## 1. ¿Qué ha ido bien?
- La función centralizada `modificarStock()` en `US-006` ha simplificado notablemente la lógica de negocio y mantiene el código limpio.
- Las validaciones por campo en el formulario de alta (`US-007`) ofrecen mensajes muy claros al usuario.

## 2. ¿Qué se puede mejorar?
- A medida que crece `app.js`, conviene mantener comentarios de bloque claros por cada Historia de Usuario para facilitar las revisiones de código y la legibilidad en SonarQube.

## 3. Acciones de Mejora para el Sprint 4
- **Acción 1:** Encabezar cada sección nueva de `app.js` con un bloque de comentario indicando el identificador de la Historia de Usuario (`// === US-XXX ===`). (**Responsable:** Adolfo Lozano).
