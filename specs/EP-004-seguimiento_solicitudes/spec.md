# EP-004 Seguimiento y trazabilidad de solicitudes 
 
**Goals:** G-01, G-02 
**Baseline:** requirements-v1 
**Boundary:** La trazabilidad se limita al registro de cambios de estado dentro del propio sistema "Centinela". No se incluyen notificaciones externas (SMS, integraciones con correo militar) ni seguimiento por GPS de las piezas. Los datos personales asociados a las unidades serán ficticios (EX-01). 
 
## Epic outcome 
El técnico dispone de continuidad informativa, sabiendo en todo momento el estado exacto de su solicitud para planificar sus tareas de mantenimiento, mientras que el almacén mantiene un registro histórico inmutable de los movimientos de inventario. 
 
## Stories 
 
### US-003 Consultar el estado (pendiente/aceptada/entregada) de mis solicitudes 
> **Necesidad y Objetivo:** Como técnico de mantenimiento, quiero consultar el estado de mis solicitudes anteriores, para saber si la pieza ya está aprobada y puedo ir a recogerla para continuar mi tarea (G-01). 
**Priority:** Must have 
**Estimate:** 4,5 h-p 
**Uncertainty:** Low 
**Predecessors:** US-002 
**Initial plan:** IT-001 
 
#### Criterios de Aceptación 
- **US-003-AC-01:** El sistema debe proporcionar al técnico una vista de "Mis Solicitudes". 
- **US-003-AC-02:** El listado debe mostrar la referencia de la solicitud, la pieza solicitada, la tarea asociada y una etiqueta visual con el estado actual (Pendiente, Aceptada, Rechazada, Entregada, Cancelada). 
- **US-003-AC-03:** Si el estado es "Rechazada", debe mostrarse el motivo introducido por el personal de almacén (vinculado a la US-010). 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** El listado debe estar ordenado de forma cronológica inversa (las peticiones más recientes primero). Un técnico solo puede ver las solicitudes creadas por él mismo. 
- **Requisitos No Funcionales (NFRs):** *Usabilidad:* Los estados deben tener un código de colores claro (ej. Pendiente en gris, Aceptada en verde, Rechazada en rojo) para facilitar la lectura rápida. 

 

#### Ejemplos, Casos Límite y Supuestos 
- **Ejemplo:** El técnico entra a "Mis Solicitudes" y ve en primer lugar `REQ-1042 | Rotor principal TR-99 | Tarea: MANT-77A | Estado: Aceptada` (etiqueta verde), y debajo `REQ-1038 | Junta tórica | Estado: Rechazada` (etiqueta roja) con el motivo "Pieza descatalogada, usar repuesto alternativo REF-220". 
- **Casos Límite:**  
  - *Sin solicitudes:* Si el técnico todavía no ha creado ninguna solicitud, el sistema debe mostrar una pantalla de estado vacío con el mensaje "Aún no has realizado ninguna solicitud", en lugar de una tabla vacía sin contexto.  

  - *Cambio de estado en tiempo real:* Si el almacén acepta o rechaza la solicitud mientras el técnico tiene la pantalla abierta, al refrescar o volver a entrar a "Mis Solicitudes" debe verse siempre el estado actualizado, nunca uno desfasado.  

  - *Solicitudes canceladas:* Una solicitud cancelada por el propio técnico (US-009) debe seguir apareciendo en el listado con la etiqueta "Cancelada", no desaparecer sin dejar rastro, para mantener la trazabilidad completa de todas sus peticiones. 
- **Supuestos:** Se asume que el técnico solo necesita consultar sus propias solicitudes, no las del resto de compañeros; una vista consolidada para un posible rol de supervisor queda fuera del alcance actual. 

 
 
--- 
 
### US-013 Ver histórico de movimientos (entradas/salidas) de una pieza específica 
> **Necesidad y Objetivo:** Como personal de almacén, quiero ver el histórico de movimientos de una pieza específica para auditar el consumo, detectar pérdidas o revisar quién autorizó un ajuste de stock (G-02). 
**Priority:** Could have 
**Estimate:** 6,0 h-p 
**Uncertainty:** Medium 
**Predecessors:** US-006, US-008 
**Initial plan:** Por definir 
 
#### Criterios de Aceptación 
- **US-013-AC-01:** En la vista de detalle de cualquier pieza en el almacén, debe existir una pestaña o botón de "Histórico de Movimientos". 
- **US-013-AC-02:** El histórico debe mostrar un registro en forma de tabla con cada cambio de stock, indicando: Fecha/Hora, Tipo de movimiento (Entrega o Ajuste manual), Cantidad (+/-) y Usuario responsable. 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** El registro histórico es de solo lectura. Ningún usuario (ni siquiera el administrador) puede modificar o borrar una entrada del histórico de movimientos. 
- **Restricciones:** El registro solo comienza a guardar datos desde la implementación de esta historia; no se pueden deducir movimientos previos a su despliegue. 
 
--- 
 
### US-016 Recibir alerta visual en el sistema cuando cambie el estado de mi solicitud 
> **Necesidad y Objetivo:** Como técnico de mantenimiento, quiero recibir una notificación visual dentro de la aplicación cuando mi solicitud pase a estado "Aceptada" o "Rechazada", para no tener que refrescar manualmente la lista de solicitudes. 
**Priority:** Won't have 
**Estimate:** 7,5 h-p 
**Uncertainty:** Medium 
**Predecessors:** US-005 
**Initial plan:** Descartado para Release 1 
 
#### Criterios de Aceptación 
- **US-016-AC-01:** El sistema mostrará un icono de "campana" en la barra de navegación superior con un contador numérico de notificaciones no leídas. 
- **US-016-AC-02:** Al hacer clic en la campana, se despliega una lista con los avisos de cambio de estado. 
- **US-016-AC-03:** Al hacer clic en un aviso, este se marca como leído y redirige al detalle de la solicitud. 
 
#### Verificación y Restricciones 
- **Restricciones:** Al ser un requisito *Won't have*, su implementación queda totalmente excluida del alcance del MVP y de la asignatura. 
- **Requisitos No Funcionales (NFRs):** *Rendimiento:* La consulta de notificaciones no debe sobrecargar la base de datos con peticiones constantes. 
 
--- 
 
### US-018 Exportar el justificante de entrega de una solicitud a formato PDF 
> **Necesidad y Objetivo:** Como técnico de mantenimiento o personal de almacén, quiero poder descargar un justificante en PDF de una solicitud "Entregada" para adjuntarlo al parte de mantenimiento o archivarlo físicamente. 
**Priority:** Won't have 
**Estimate:** 6,0 h-p 
**Uncertainty:** Low 
**Predecessors:** US-006 
**Initial plan:** Descartado para Release 1 
 
#### Criterios de Aceptación 
- **US-018-AC-01:** Las solicitudes en estado "Entregada" deben mostrar un botón de "Exportar a PDF". 
- **US-018-AC-02:** Al pulsar el botón, el sistema genera y descarga un archivo PDF que incluye el logo ficticio del Escuadrón 12, la referencia de la solicitud, la pieza, la tarea y la fecha de entrega. 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** El justificante solo puede emitirse una vez que el ciclo de vida de la solicitud ha finalizado (estado "Entregada"). 
- **Restricciones:** Funcionalidad descartada temporalmente (Won't have) para proteger la capacidad efectiva del equipo durante las primeras iteraciones. 