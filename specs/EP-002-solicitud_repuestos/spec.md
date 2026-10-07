# EP-002 Solicitud de repuestos 
 
**Goals:** G-01 
**Baseline:** requirements-v1 
**Boundary:** El alcance se limita a la solicitud interna de piezas en stock. Quedan expresamente fuera del proyecto la integración con sistemas reales de logística, compras, pagos, contratos o procesos formales de adquisición con proveedores externos (EX-01, EX-02). Se asume que cada solicitud corresponde a una única pieza de repuesto. 
 
## Epic outcome 
Un técnico de mantenimiento puede solicitar de manera autónoma un repuesto disponible, vinculándolo a una tarea específica y obteniendo una referencia única que asegura la trazabilidad y el inicio del proceso de entrega. 
 
## Stories 
 
### US-002 Solicitar pieza indicando tarea de mantenimiento asociada 
> **Necesidad y Objetivo:** Como técnico de mantenimiento, quiero solicitar una pieza disponible indicando la tarea de mantenimiento asociada, para iniciar el proceso de entrega sin depender de llamadas o correos, asegurando la trazabilidad (G-01). 
**Priority:** Must have 
**Estimate:** 7,5 h-p 
**Uncertainty:** Medium 
**Predecessors:** US-001 
**Initial plan:** IT-001 
 
#### Criterios de Aceptación 
- **US-002-AC-01:** El sistema debe requerir obligatoriamente la selección de una pieza del inventario y la introducción de un código o identificador de la tarea de mantenimiento asociada. 
- **US-002-AC-02:** El sistema debe bloquear el envío de la solicitud si la cantidad requerida es mayor que el stock actualmente disponible. 
- **US-002-AC-03:** Al enviarse y guardarse con éxito, el sistema genera y muestra una referencia alfanumérica única (ej. `REQ-1042`) y el estado inicial es "Pendiente". 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** Una solicitud no reserva el stock de forma definitiva hasta que es aceptada por el almacén, pero el sistema debe alertar si el stock es crítico. 
- **Restricciones:** No se usarán datos reales de unidades o tareas militares clasificadas; toda entrada de tarea será tratada como texto libre o ficticio. 
- **Requisitos No Funcionales (NFRs):**  
  - *Fiabilidad:* La generación del código de referencia debe ser transaccional (no pueden existir dos solicitudes con la misma referencia). 
  - *Usabilidad:* Si falla el envío por falta de datos, el formulario no debe borrarse, permitiendo al usuario corregir el error sin empezar de cero (experiencia "Recuperable"). 
 
#### Ejemplos, Casos Límite y Supuestos 
- **Ejemplo de éxito:** El técnico selecciona "Junta tórica (Cant: 2)", introduce la tarea "MANT-77A", pulsa solicitar y el sistema devuelve "Solicitud enviada correctamente. Su referencia es REQ-1042". 
- **Casos Límite (Edge Cases):**  
  - *Condición de carrera (Concurrencia):* ¿Qué ocurre si la pieza tiene stock de 1, y dos técnicos envían la solicitud en el mismo milisegundo? El sistema procesará primero la transacción que llegue antes a la base de datos, y al segundo técnico le mostrará el error: "Lo sentimos, el stock se acaba de agotar". 
- **Supuestos:** Se asume que todo el personal usuario tiene acceso a un dispositivo con navegador web dentro de la base y ha iniciado sesión previamente. 
 
--- 
 
### US-009 Cancelar una solicitud propia antes de ser gestionada por almacén 
> **Necesidad y Objetivo:** Como técnico de mantenimiento, quiero cancelar una solicitud que he creado por error o que ya no necesito, siempre que el almacén no la haya procesado, para evitar desplazamientos innecesarios y liberar el stock virtual (G-01). 
**Priority:** Should have 
**Estimate:** 4,5 h-p 
**Uncertainty:** Low 
**Predecessors:** US-002 
**Initial plan:** IT-002 
 
#### Criterios de Aceptación 
- **US-009-AC-01:** El técnico debe visualizar un botón o acción de "Cancelar" únicamente en las solicitudes propias que se encuentren en estado "Pendiente". 
- **US-009-AC-02:** Al pulsar "Cancelar", el sistema debe pedir una confirmación de seguridad (ej. "¿Seguro que desea cancelar la solicitud REQ-1042?"). 
- **US-009-AC-03:** Tras confirmar, el estado de la solicitud pasa a "Cancelada" y desaparece de la vista principal de solicitudes pendientes del almacén. 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** Si el estado de la solicitud es "Aceptada", "Rechazada" o "Entregada", la opción de cancelar debe estar deshabilitada o ser invisible para el técnico. 
- **Requisitos No Funcionales (NFRs):** *Feedback:* El sistema debe mostrar una notificación visual en verde confirmando la cancelación exitosa. 
 
#### Ejemplos, Casos Límite y Supuestos 
- **Ejemplo:** El técnico pide una pieza, se da cuenta de que se equivocó de tarea de mantenimiento, va a sus peticiones pendientes, pulsa cancelar, confirma, y la solicitud queda anulada. 
- **Casos Límite:**  
  - *Cruce de acciones:* El técnico pulsa "Cancelar" exactamente en el mismo momento en que el almacenero pulsa "Aceptar". El sistema debe evaluar la concurrencia: si el almacén ya la aceptó en la base de datos, se le mostrará al técnico el mensaje: "No se puede cancelar, la solicitud ya ha sido procesada por almacén". 
- **Supuestos:** Se asume que la cancelación no requiere validación por parte de un superior, otorgando autonomía total al técnico sobre sus errores. 
 
--- 
 
### US-014 Duplicar una solicitud anterior para agilizar pedidos recurrentes 
> **Necesidad y Objetivo:** Como técnico de mantenimiento, quiero duplicar una solicitud antigua para autocompletar el formulario con los mismos datos (pieza y tarea), agilizando pedidos que realizo habitualmente. 
**Priority:** Could have 
**Estimate:** 4,5 h-p 
**Uncertainty:** Low 
**Predecessors:** US-003 
**Initial plan:** Por definir 
 
#### Criterios de Aceptación 
- **US-014-AC-01:** En el detalle de cualquier solicitud histórica, debe existir la acción "Duplicar". 
- **US-014-AC-02:** Al accionarla, el sistema redirige al formulario de nueva solicitud (US-002) con los campos de "Pieza" y "Tarea" ya rellenados con los datos originales. 
- **US-014-AC-03:** El sistema debe evaluar automáticamente el stock disponible actual de esa pieza antes de permitir enviar la nueva solicitud duplicada. 
 
#### Verificación y Restricciones 
- **Reglas de negocio:** Duplicar una solicitud no la envía directamente; solo pre-rellena el formulario para que el usuario valide y decida enviarla. 
- **Requisitos No Funcionales (NFRs):** *Eficiencia:* La acción debe reducir los clics necesarios para pedidos recurrentes a un máximo de dos clics. 