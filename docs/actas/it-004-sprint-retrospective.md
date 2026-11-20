# Acta de Sprint Retrospective — IT-004 (Sprint 4)

**Fecha:** 11/11/2026 (13:00 - 17:00)  
**Asistentes:** Sergio Jiménez (SM), Adolfo Lozano (Dev).  
**Esfuerzo de la ceremonia:** 2 h-p (1h por asistente).

## 1. ¿Qué ha ido bien?
- La reutilización de `modificarStock()` en la `US-008` ha ahorrado tiempo de desarrollo y ha evitado errores de regresiones.
- El modal de motivo de rechazo (`US-010`) se integró limpiamente con la tabla de almacén existente.

## 2. ¿Qué se puede mejorar?
- En el Sprint 5 se añadirán filtros y ordenación sobre la tabla del catálogo (`US-011` y `US-012`), por lo que debemos asegurar que ambas funciones actúen de forma combinada sin pisarse.

## 3. Acciones de Mejora para el Sprint 5
- **Acción 1:** Mantener variables de estado en memoria para la categoría seleccionada y la dirección de ordenación actual en `catalogo.html`, de modo que `buscarPiezas()`, `filtrarPiezas()` y `ordenarPorStock()` trabajen coordinadamente. (**Responsable:** Elena Cancho).
