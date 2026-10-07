# EP-003 Gestión de solicitudes en almacén 
 
**Goals:** G-02 
**Baseline:** requirements-v1 
**Boundary:** El alcance se limita estrictamente a las funciones de almacén imprescindibles para gestionar el estado de las solicitudes (recibir, aceptar/rechazar, marcar como entregada) (S-03). No se incluye gestión avanzada de ubicaciones logísticas, ERPs corporativos ni inventarios externos (EX-01). 
 
## Epic outcome 
El personal de almacén visualiza las peticiones entrantes, toma decisiones documentadas sobre ellas y el inventario se actualiza automáticamente al confirmarse las entregas, manteniendo en todo momento el control y la visibilidad del stock real. 
 
## Stories 
 
### US-004 Ver listado de solicitudes pendientes en almacén 
> **Necesidad y Objetivo:** Como personal de almacén, quiero ver las solicitudes pendientes de forma centralizada para poder gestionarlas y evitar retrasos en el mantenimiento (G-02). 
**Priority:** Must have 
**Estimate:** 4,5 h-p 
**Uncertainty:** Low 
**Predecessors:** US-002 
**Initial plan:** IT-002 
 
#### Criterios de Aceptación 
- **US-004-AC-01:** El sistema debe mostrar un listado principal con todas las solicitudes cuyo estado sea "Pendiente". 
- **US-004-AC-02:** Cada fila del listado debe mostrar como mínimo: Referencia de solicitud, Nombre de la pieza, Tarea asociada y Fecha/Hora de creación. 
- **US-004-AC-03:** El listado debe estar ordenado por antigüedad (las más antiguas primero, método FIFO). 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** Si no hay solicitudes pendientes, el sistema debe mostrar una pantalla de "estado vacío" (Empty State) indicando "No hay solicitudes pendientes de gestión". 
- **Requisitos No Funcionales (NFRs):**  
  - *Usabilidad:* El listado debe ser fácil de leer, con un tamaño de fuente adecuado para entornos industriales o pantallas a cierta distancia. 
 
#### Ejemplos, Casos Límite y Supuestos 
- **Ejemplo:** El almacenero abre el sistema y ve una tabla con: `REQ-1042 | Rotor TR-99 | Tarea: MANT-77A | Hoy 10:15` en la primera línea. 
- **Casos Límite:**  
  - *Sobrecarga de datos:* Si hay más de 50 solicitudes pendientes tras un fin de semana, el sistema debe paginar los resultados para no sobrecargar la vista ni la base de datos (mostrando 20 por página). 
- **Supuestos:** Se asume que el personal de almacén revisa este listado de forma activa durante su jornada. 
 
--- 
 
### US-005 Aceptar o rechazar una solicitud pendiente 
> **Necesidad y Objetivo:** Como personal de almacén, quiero poder aceptar o rechazar las solicitudes pendientes para confirmar la disponibilidad real o denegar peticiones erróneas (G-02). 
**Priority:** Must have 
**Estimate:** 3,0 h-p 
**Uncertainty:** Low 
**Predecessors:** US-004 
**Initial plan:** IT-002 
 
#### Criterios de Aceptación 
- **US-005-AC-01:** En la vista de detalle de una solicitud "Pendiente", deben existir dos acciones claras: "Aceptar" (verde) y "Rechazar" (rojo). 
- **US-005-AC-02:** Al pulsar "Aceptar", el estado de la solicitud cambia a "Aceptada" y la pieza queda virtualmente reservada. 
- **US-005-AC-03:** Al pulsar "Rechazar", el estado pasa a "Rechazada". 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** Una solicitud "Rechazada" es un estado final. No puede volver a abrirse. 
- **Restricciones:** Un usuario no administrador no puede saltarse este paso; el ciclo de vida de la solicitud es estricto. 
- **Requisitos No Funcionales (NFRs):** *Trazabilidad:* Toda acción de aceptación o rechazo debe registrar la hora exacta y el usuario de almacén que la ejecutó. 
 
#### Ejemplos, Casos Límite y Supuestos 
- **Ejemplo:** Entra una petición de "Junta tórica". El almacenero verifica físicamente que está, pulsa "Aceptar". El técnico ve en su pantalla que su pieza está lista. 
- **Casos Límite:**  
  - *Cancelación cruzada:* El técnico cancela la petición (US-009) en el milisegundo anterior al que el almacenero pulsa "Aceptar". El sistema debe rechazar la acción del almacenero mostrando: "La solicitud ya ha sido cancelada por el solicitante". 
- **Supuestos:** Se asume que el almacenero comprueba visualmente el stock físico antes de darle a "Aceptar". 
 
--- 
 
### US-006 Marcar solicitud como entregada y descontar stock 
> **Necesidad y Objetivo:** Como personal de almacén, quiero marcar una solicitud como entregada una vez el técnico recoge la pieza, para reflejar el consumo real del stock y mantener el inventario cuadrado (G-02). 
**Priority:** Must have 
**Estimate:** 4,5 h-p 
**Uncertainty:** Medium 
**Predecessors:** US-005 
**Initial plan:** IT-003 
 
#### Criterios de Aceptación 
- **US-006-AC-01:** Solo las solicitudes en estado "Aceptada" pueden mostrar el botón "Marcar como Entregada". 
- **US-006-AC-02:** Al confirmar la entrega, el estado de la solicitud pasa a "Entregada" (estado final). 
- **US-006-AC-03:** El sistema debe restar automáticamente 1 unidad al stock disponible de la pieza correspondiente en la base de datos de inventario. 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** El stock nunca puede llegar a ser un número negativo tras una entrega. 
- **Requisitos No Funcionales (NFRs):** *Integridad:* La actualización del estado de la solicitud y el descuento del stock deben realizarse en una única transacción de base de datos. Si una falla, la otra se revierte (Rollback). 
 
#### Ejemplos, Casos Límite y Supuestos 
- **Ejemplo:** El técnico recoge el Rotor en la ventanilla. El almacenero pulsa "Entregada". El stock de Rotores pasa automáticamente de 4 a 3. 
- **Casos Límite:**  
  - Alguien ajustó manualmente el stock a 0 (US-008) por un inventario sorpresa, pero el almacenero intenta entregar una pieza aceptada previamente. El sistema debe bloquear la entrega y avisar de la discrepancia física/virtual. 
- **Supuestos:** La entrega de la pieza es física (mano a mano) en la ventanilla del almacén del Escuadrón 12. 
 
--- 
 
### US-007 Dar de alta manualmente una nueva pieza ficticia en el inventario 
> **Necesidad y Objetivo:** Como personal de almacén, quiero añadir nuevas piezas al catálogo del sistema para reflejar nuevos componentes de repuesto adquiridos. 
**Priority:** Should have 
**Estimate:** 7,5 h-p 
**Uncertainty:** Medium 
**Predecessors:** Ninguno 
**Initial plan:** IT-003 
 
#### Criterios de Aceptación 
- **US-007-AC-01:** El sistema debe tener un formulario con campos para Nombre, Código único, Categoría, Ubicación y Cantidad inicial. 
- **US-007-AC-02:** El Código de la pieza debe ser único; si se introduce uno existente, se muestra error. 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** Todos los campos son obligatorios para evitar piezas fantasma en el sistema. 
- **Requisitos No Funcionales (NFRs):** *Seguridad:* Todas las entradas de texto deben sanitizarse antes de guardarse para prevenir inyecciones. 
 
--- 
 
### US-008 Ajustar manualmente la cantidad de stock de una pieza 
> **Necesidad y Objetivo:** Como personal de almacén, quiero corregir la cantidad de stock de una pieza (por rotura, pérdida o inventario físico) para que el sistema refleje la realidad del almacén. 
**Priority:** Should have 
**Estimate:** 4,5 h-p 
**Uncertainty:** Low 
**Predecessors:** US-007 
**Initial plan:** Por definir 
 
#### Criterios de Aceptación 
- **US-008-AC-01:** En la vista de detalle de la pieza en almacén, se permite editar el número de stock. 
- **US-008-AC-02:** El sistema debe solicitar un motivo obligatorio (ej. "Inventario físico", "Pieza defectuosa") al realizar un ajuste manual. 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** No se permite ajustar el stock a un valor negativo. 
- **Restricciones:** Acción restringida exclusivamente al personal de almacén (los técnicos no pueden ver este botón). 
 
--- 
 
### US-010 Añadir nota explicativa obligatoria al rechazar una solicitud 
> **Necesidad y Objetivo:** Como personal de almacén, quiero incluir un motivo al rechazar una petición para que el técnico sepa por qué se le denegó la pieza (ej. "Pieza descatalogada", "Usar repuesto alternativo"). 
**Priority:** Should have 
**Estimate:** 3,0 h-p 
**Uncertainty:** Low 
**Predecessors:** US-005 
**Initial plan:** Por definir 
 
#### Criterios de Aceptación 
- **US-010-AC-01:** Al pulsar "Rechazar" (US-005), se abre un cuadro de diálogo requiriendo un texto explicativo. 
- **US-010-AC-02:** No se puede completar el rechazo si el cuadro de texto está vacío. 
 
#### Verificación y Restricciones 
- **Requisitos No Funcionales (NFRs):** *Usabilidad:* El texto de rechazo debe ser visible para el técnico en su pantalla de seguimiento (US-003). 
 
--- 
 
### US-015 Filtrar solicitudes en almacén por fecha de creación 
> **Necesidad y Objetivo:** Como personal de almacén, quiero filtrar el listado de solicitudes para ver únicamente las de "Hoy", "Últimos 7 días", etc., para gestionar mejor la carga de trabajo. 
**Priority:** Could have 
**Estimate:** 3,0 h-p 
**Uncertainty:** Low 
**Predecessors:** US-004 
**Initial plan:** Descartado para Release 1 
 
#### Criterios de Aceptación 
- **US-015-AC-01:** El listado de almacén incluye un filtro por rango de fechas (Desde - Hasta) o por rangos predefinidos (Hoy, Semana). 
- **US-015-AC-02:** Al aplicar el filtro, solo se muestran las solicitudes cuya fecha de creación coincida con el criterio. 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** El filtro por defecto al entrar a la pantalla debe ser "Todas las pendientes". 