# EP-001 Consulta de inventario 
 
**Goals:** G-02 
**Baseline:** requirements-v1 
**Boundary:** El catálogo de piezas es limitado, conocido de antemano por el equipo y completamente ficticio. Existe una prohibición estricta de utilizar datos personales, de unidades o de equipamiento militar reales (EX-01). 
 
## Epic outcome 
El personal técnico y de almacén puede localizar de forma unívoca una pieza en el sistema para conocer su ubicación y la cantidad disponible de stock real. 
 
## Stories 
 
### US-001 Buscar pieza por nombre o código para ver disponibilidad 
> **Necesidad y Objetivo:** Como técnico de mantenimiento, quiero buscar una pieza por nombre o código para saber si está disponible en el almacén antes de desplazarme o iniciar una solicitud (G-02). 
**Priority:** Must have 
**Estimate:** 4,5 h-p 
**Uncertainty:** Low 
**Predecessors:** Ninguno 
**Initial plan:** IT-001 
 
#### Criterios de Aceptación 
- **US-001-AC-01:** El sistema debe proporcionar un campo de búsqueda que acepte texto libre y códigos alfanuméricos. 
- **US-001-AC-02:** Los resultados de la búsqueda deben mostrar: nombre de la pieza, código único, cantidad de stock disponible y ubicación física en el almacén. 
- **US-001-AC-03:** Si la búsqueda no arroja ningún resultado, el sistema debe mostrar claramente el mensaje "Pieza no encontrada en el catálogo". 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** La cantidad de stock disponible mostrada debe calcularse en tiempo real, descontando aquellas unidades que ya se encuentren comprometidas en otras solicitudes aceptadas. 
- **Restricciones:** Los datos devueltos por el buscador deben provenir exclusivamente de la base de datos de inventario sintético (ficticio). 
- **Requisitos No Funcionales (NFRs):**  
  - *Rendimiento:* La búsqueda debe devolver los resultados en menos de 1 segundo. 
  - *Accesibilidad:* El campo de búsqueda y los resultados deben ser accesibles y navegables mediante teclado. 
 
#### Ejemplos, Casos Límite y Supuestos 
- **Ejemplo:** El técnico introduce "Rotor" en el buscador. El sistema devuelve "Rotor principal TR-99 | Stock: 4 | Ubicación: Hangar 2, Estante A". 
- **Casos Límite:**  
  - El usuario introduce caracteres especiales no válidos (ej. `<script>`). El sistema debe sanitizar la entrada y mostrar "Búsqueda inválida", evitando cualquier vulnerabilidad de inyección. 
  - Si el stock de la pieza es exactamente 0, la pieza debe aparecer en los resultados, pero con un indicador visual (ej. color rojo) que resalte la falta de stock. 
- **Supuestos:** Se asume que el usuario técnico conoce la nomenclatura o parte del código de las piezas de mantenimiento utilizadas en el Escuadrón 12. 
 
--- 
 
### US-011 Filtrar catálogo de inventario por categoría de la pieza 
> **Necesidad y Objetivo:** Como técnico de mantenimiento, quiero filtrar el inventario por categoría (ej. motor, aviónica, estructural) para explorar piezas de una misma familia cuando no conozco el nombre exacto. 
**Priority:** Could have 
**Estimate:** 3,0 h-p 
**Uncertainty:** Low 
**Predecessors:** US-001 
**Initial plan:** Por definir 
 
#### Criterios de Aceptación 
- **US-011-AC-01:** La interfaz de consulta debe proporcionar un selector desplegable con todas las categorías predefinidas del catálogo. 
- **US-011-AC-02:** Al seleccionar una categoría, el listado de inventario debe actualizarse instantáneamente mostrando únicamente las piezas correspondientes a dicha categoría. 
- **US-011-AC-03:** Debe existir una opción para "Borrar filtros" que devuelva la vista al listado completo del catálogo. 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** Cada pieza del inventario está asociada a una y solo una categoría principal.  
- **Restricciones:** Las categorías mostradas en el filtro deben generarse dinámicamente basándose en las piezas que realmente existen en la base de datos. 
- **Requisitos No Funcionales (NFRs):** *Usabilidad:* La actualización del listado tras aplicar el filtro debe realizarse sin necesidad de recargar completamente la página. 
 
--- 
 
### US-012 Ordenar las piezas de inventario por cantidad de stock disponible 
> **Necesidad y Objetivo:** Como personal de almacén o técnico, quiero ordenar los resultados del inventario por cantidad de stock disponible (de mayor a menor, y viceversa) para identificar rápidamente qué piezas abundan o escasean. 
**Priority:** Could have 
**Estimate:** 3,0 h-p 
**Uncertainty:** Low 
**Predecessors:** US-001 
**Initial plan:** Por definir 
 
#### Criterios de Aceptación 
- **US-012-AC-01:** Los encabezados de las columnas del listado de resultados (específicamente "Stock") deben ser interactivos. 
- **US-012-AC-02:** Al hacer clic en "Stock", el listado se ordena de forma ascendente; al hacer clic nuevamente, se ordena de forma descendente. 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** La ordenación debe aplicarse sobre el total de los resultados de la consulta actual, incluso si los resultados están divididos en varias páginas de navegación. 
- **Requisitos No Funcionales (NFRs):** *Visualización:* El sistema debe mostrar un icono (flecha arriba/abajo) indicando el criterio de ordenación activo en ese momento. 
 
--- 
 
### US-017 Marcar una pieza como "stock bajo" automáticamente 
> **Necesidad y Objetivo:** Como personal de almacén, quiero que el sistema marque automáticamente una pieza como "stock bajo" cuando su cantidad caiga por debajo de un umbral, para prevenir roturas de stock. 
**Priority:** Won't have 
**Estimate:** 7,5 h-p 
**Uncertainty:** Medium 
**Predecessors:** US-006, US-008 
**Initial plan:** Descartado para Release 1 
 
#### Criterios de Aceptación 
- **US-017-AC-01:** El sistema debe evaluar el nivel de stock cada vez que se marca una solicitud como entregada (US-006) o se ajusta el stock (US-008). 
- **US-017-AC-02:** Si el stock resultante es inferior a 5 unidades, el estado de la pieza cambia automáticamente a "Stock Bajo". 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** El umbral de "stock bajo" se fija inicialmente en 5 unidades para todas las piezas del catálogo de forma global. 
- **Restricciones:** Al estar clasificada como *Won't have*, esta funcionalidad no será implementada en las iteraciones iniciales, limitándose su diseño a posibles expansiones futuras. 

 