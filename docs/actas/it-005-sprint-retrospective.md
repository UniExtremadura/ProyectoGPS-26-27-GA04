# Acta de Sprint Retrospective — IT-005 (Sprint 5)

**Fecha:** 18/11/2026 (13:00 - 17:00)  
**Asistentes:** Sergio Jiménez (SM), Alfonso Canal (TL).  
**Esfuerzo de la ceremonia:** 2 h-p (1h por asistente).

## 1. ¿Qué ha ido bien?
- La combinación de búsqueda por texto, filtro por categoría y ordenación por stock funciona sin fricciones gracias al diseño modular acordado en la retrospectiva anterior.
- La conexión entre `modificarStock()` y `registrarMovimiento()` se implementó de forma limpia y transparente.

## 2. ¿Qué se puede mejorar?
- Estamos en la recta final del proyecto; es importante verificar que todas las ramas integradas en `develop` pasen sin advertencias por el análisis estático antes del merge final a `main`.

## 3. Acciones de Mejora para el Sprint 6
- **Acción 1:** Ejecutar una revisión global de calidad del código al finalizar la `US-014` antes de abrir el Pull Request de `develop` a `main`. (**Responsable:** Alfonso Canal).
