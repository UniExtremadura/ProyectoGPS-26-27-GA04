# Objetivos del proyecto

Este documento traduce la misión del servicio en algo que podamos medir de
verdad al final del proyecto: qué queremos conseguir, cómo sabremos si lo
hemos logrado, y qué hemos decidido dejar fuera para no perder el foco.

## Qué queremos conseguir

| ID | Objetivo | En qué se nota |
|---|---|---|
| G-01 | El técnico tiene independencia | Puede consultar si
una pieza está disponible y solicitarla sin llamar a nadie ni escribir
un correo. |
| G-02 | El almacén deja de gestionar a ciegas | Sabe en todo momento
qué stock tiene realmente y qué solicitudes tiene pendientes de
resolver. |
| G-03 | Sistema en tiempo real |
Las actualizaciones de inventario se hacen en tiempo real para evitar que varios técnicos realicen las mismas solicitudes solapándose. |

## Cómo sabremos que lo hemos conseguido

| ID | Objetivo | Umbral |
|---|---|---|
| M-01 | G-01 | 4 de cada 5 personas que probamos el sistema completan
una solicitud de pieza en menos de 5 minutos sin que nadie les ayude.
|
| M-02 | G-02 | 4 de cada 5 personas entienden correctamente en qué
estado está el stock y sus solicitudes. |
| M-03 | Todos | No queda abierto ningún defecto que bloquee el uso
normal del sistema en la revisión final. |

## Qué entra en esta primera versión
- Un recorrido completo y coherente para que un técnico consulte y solicite
  una pieza de repuesto, de principio a fin.
- Un catálogo de piezas e inventario inventado por nosotros, pero suficiente
  para que el escenario resulte creíble.
- Solo las funciones de almacén imprescindibles para mover ese flujo:
  recibir una solicitud, aceptarla o rechazarla, y marcarla como entregada.

## Qué queda fuera, de momento
- Cualquier conexión con sistemas reales de logística o
  proveedores externos: aquí todo vive dentro del servicio.
- Todo lo relacionado con compras, pagos o trámites formales de adquisición
  de material. Eso pertenece a otro problema, no al que estamos resolviendo.

## Lo que damos por hecho
- El catálogo de piezas es limitado y lo conocemos de antemano como equipo;
  no modelamos un inventario abierto o creciente sin control.
- Cada solicitud se refiere a una única pieza, no a varias a la vez.
- Damos por hecho que todo el personal usuario tiene acceso a un navegador
  desde algún dispositivo dentro de la base.

## Con lo que tenemos que ser cuidadosos
- No se usa ni se referencia ningún dato real de personal, unidades o
  equipamiento militar, bajo ningún concepto.
- Nos ceñimos a las tecnologías y convenciones que hemos acordado usar en
  la asignatura.

## Cómo se conecta todo esto
Seguimos siempre el mismo hilo: de la misión salen los objetivos, de los
objetivos las épicas, de las épicas las historias, de las historias las
tareas, y de las tareas el código, las pruebas y las evidencias de que
funciona. Si una épica aparece y no se puede enganchar a ninguno de estos
objetivos, la consideramos fuera de alcance hasta que decidamos
explícitamente cambiar este documento para incluirla.

## Si algo de esto cambia
Cambiar un objetivo, una métrica, el alcance, una exclusión, un supuesto o
una restricción no es algo que se decide de pasada. Implica:
1. Que el equipo lo revise conjuntamente.
2. Que el Product Owner tome la decisión de forma explícita.
3. Que quede registrada esa decisión.
4. Que revisemos si afecta al roadmap, a las especificaciones, a Jira o a
   la capacidad que tenemos calculada.
5. Que actualicemos todo lo que dependa de ello, para no dejar
referencias sueltas.

