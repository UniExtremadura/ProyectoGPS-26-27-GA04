# Revisión del plan de ProjectLibre

## 1. Metadatos de ejecución

- **Proyecto:** Centinela.
- **Modo:** VALIDATION.
- **Plan revisado:** `docs/project/Planificación_Sprints.xml`, exportación XML de ProjectLibre/MS Project (`SaveVersion=14`).
- **Identidad almacenada:** nombre/título `Centinela`; inicio `2026-10-14T08:00:00`; fin `2026-11-02T13:45:00`; fecha actual `2026-10-14T09:05:00`.
- **Calendario del proyecto:** UID 1, `Estandar`; lunes no laborable, martes-sábado de 08:00-12:00 y 13:00-17:00, domingo no laborable.
- **Longitud de sprint de referencia:** una semana, según la configuración del agente; no se proporcionó un manifiesto adicional.
- **Alcance/baseline revisado:** el contenido del XML; no hay baseline almacenada (`Baseline`=0).
- **Entradas de planificación usadas:** ninguna. No se ejecutó CONSISTENCY y no se comparó con `Libro.xlsx` ni con un informe de planificación inicial.
- **Versión del informe:** `projectlibre-plan-review-v01`.
- **Limitación de extracción:** el intérprete Python requerido por el procedimiento no está instalado; el intento falló. Se utilizó el parser XML nativo de PowerShell para la misma extracción estructurada. No se modificó el plan.

## 2. Resumen

**Resultado asesor:** `INVALID`.

Se identifican **4 hallazgos bloqueantes**. El XML contiene 40 tareas y 60 asignaciones, pero cinco recursos apuntan a calendarios no declarados (UID 4-8), siete asignaciones apuntan al recurso inexistente `-65535`, el recurso SM aparece simultáneamente en tareas 2 y 4, y los seis sprints definidos no respetan de forma visible la cadencia semanal declarada. Estas condiciones impiden considerar fiables el calendario, la capacidad y parte de las fechas almacenadas.

El resultado es una revisión de integridad del archivo, no una aprobación del plan, del baseline ni de su viabilidad.

## 3. Inventario de evidencia y matriz de compatibilidad

| Dimensión | Estado | Evidencia | Límite |
|---|---|---|---|
| Formato e identidad | OK | XML con namespace MSPDI; proyecto `Centinela`; 40 tareas. | No se comprobó el fichero binario `.pod`. |
| Calendario | BLOQUEANTE | El proyecto usa calendario UID 1; recursos 1-5 referencian UID 4-8, que no aparecen en `Calendars` (solo 1, 2 y 3 están declarados). | Las fechas calculadas de recursos no son reproducibles con el XML disponible. |
| Tareas, WBS y nombres | OBSERVACIÓN | UID de tarea 1-40 únicos; hay resumen raíz, seis resúmenes `IT-001` a `IT-006` y tareas hoja de gestión/US. | El campo WBS está vacío en todos los elementos extraídos; no hay IDs WBS persistidos. |
| Fechas y duraciones | OBSERVACIÓN | Las fechas están ordenadas en una cadena continua; las duraciones usan ISO 8601. | Con calendarios de recursos faltantes, la interpretación de horas no es plenamente verificable. |
| Dependencias | PARCIALMENTE OK | Las tareas hoja posteriores enlazan con predecesoras FS (`Type=1`), sin referencias a UID de tarea inexistentes ni autoenlaces observados. | No se reconstruyó un calendario ni se recalculó el camino crítico. |
| Recursos y asignaciones | BLOQUEANTE | Cinco calendarios referenciados no existen; siete asignaciones usan `ResourceUID=-65535`, no declarado. | UID 0 es el recurso `No Asignado`; no se sustituyeron referencias. |
| Capacidad | BLOQUEANTE | Sergio Jiménez (SM, UID 2) está asignado a tarea 2 de 08:00-13:00 y tarea 4 de 08:00-13:00. | La comprobación es por intervalos almacenados y no resuelve calendarios ausentes. |
| Cadencia/horizonte | BLOQUEANTE | Seis sprints IT-001..IT-006 comienzan entre 14-oct y 30-oct y terminan el 02-nov; sus ventanas son de 2-4 días naturales, no una semana cada una. | Requiere confirmación humana de si “sprint” es una etiqueta o un compromiso semanal. |
| Baseline y progreso | OBSERVACIÓN | No hay nodos `Baseline`; todas las tareas tienen `PercentComplete=0`. | No se puede evaluar variación contra baseline ni avance real. |
| Costes | NO EVALUABLE | Existen tarifas estándar, pero el total extraído de asignaciones incluye asignaciones de resumen y hojas. | No se informa un coste agregado para evitar doble conteo y por la incertidumbre de calendarios. |

## 4. Hallazgos

### PPR-v01-001 — Calendarios de recursos no declarados

- **Categoría:** calendario/recursos.
- **Severidad:** CRITICAL.
- **Bloqueante:** YES.
- **Fuente/IDs:** recursos UID 1-5 (`Jorge Acedo (PO)`, `Sergio Jiménez (SM)`, `Alfonso Canal (TL)`, `Elena Cancho (QA/DevOps)`, `Adolfo Lozano (Dev)`).
- **Observación:** sus campos `CalendarUID` son 4, 5, 6, 7 y 8, respectivamente, pero el XML solo declara calendarios UID 1 (`Estandar`), 2 (`24 Hours`) y 3 (`Turno nocturno`).
- **Impacto:** no puede verificarse qué intervalos de trabajo aplican a las asignaciones ni si las fechas y duraciones almacenadas son compatibles con la disponibilidad declarada.
- **Acción recomendada:** reexportar el plan conservando las definiciones de los calendarios referenciados o confirmar documentalmente el calendario aplicable a cada recurso.
- **Pregunta/decisión requerida:** ¿cuáles son las definiciones vigentes de los calendarios UID 4-8?
- **Rol propietario sugerido:** responsable de planificación/ProjectLibre.

### PPR-v01-002 — Asignaciones con recurso inexistente

- **Categoría:** integridad de asignaciones.
- **Severidad:** CRITICAL.
- **Bloqueante:** YES.
- **Fuente/IDs:** asignaciones UID 1, 4, 14, 24, 33 y 43 y 53; tareas UID 1, 3, 9, 16, 22, 29 y 36.
- **Observación:** todas usan `ResourceUID=-65535`, que no aparece en `Resources`. El recurso no asignado declarado es UID 0 (`No Asignado`).
- **Impacto:** las asignaciones de la tarea resumen del proyecto y de los seis sprints no tienen un recurso resoluble; el trabajo y la capacidad agregados no son trazables a una entidad del XML.
- **Acción recomendada:** confirmar si son asignaciones deliberadamente no asignadas y, si lo son, exportarlas con la representación admitida por ProjectLibre; si no lo son, identificar el recurso real. No se corrige en esta revisión.
- **Pregunta/decisión requerida:** ¿`-65535` representa una asignación no asignada de esta exportación o es una referencia perdida?
- **Rol propietario sugerido:** responsable de planificación/ProjectLibre.

### PPR-v01-003 — Sobreasignación almacenada del SM

- **Categoría:** capacidad/asignaciones.
- **Severidad:** MAJOR.
- **Bloqueante:** YES.
- **Fuente/IDs:** recurso UID 2, `Sergio Jiménez (SM)`; tareas UID 2 y UID 4.
- **Observación:** UID 2 está asignado a `MGT. Tareas de inicio de proyecto` de 08:00 a 13:00 y a `MGT IT-001. Sprint planning` en el mismo intervalo, ambas con `Units=1`.
- **Impacto:** el XML representa dos dedicaciones simultáneas al 100% del mismo recurso. No puede aceptarse la capacidad de ese intervalo sin una decisión explícita de simultaneidad o corrección humana.
- **Acción recomendada:** revisar el solapamiento en ProjectLibre y reexportar cuando el equipo haya decidido si la concurrencia es intencionada.
- **Pregunta/decisión requerida:** ¿puede el SM participar en ambas tareas simultáneamente durante 08:00-13:00?
- **Rol propietario sugerido:** Scrum Master y responsable de planificación.

### PPR-v01-004 — Cadencia de sprints incompatible con la referencia semanal

- **Categoría:** horizonte/cadencia.
- **Severidad:** MAJOR.
- **Bloqueante:** YES.
- **Fuente/IDs:** tareas resumen UID 3, 9, 16, 22, 29 y 36 (`IT-001 (Sprint 1)` ... `IT-006 (Sprint 6)`).
- **Observación:** los sprints se encadenan entre 2026-10-14 y 2026-11-02; sus duraciones almacenadas son 16h15m para IT-001 y 20h para IT-002..IT-006, con ventanas de calendario que atraviesan fines de semana o fracciones de días. No hay seis ventanas semanales distinguibles.
- **Impacto:** no se puede saber si el horizonte, la cadencia o la etiqueta de sprint representa el compromiso aprobado. La comparación de entregas con una semana por sprint queda invalidada.
- **Acción recomendada:** confirmar el horizonte y la interpretación de cada tarea resumen; después reexportar sin que esta revisión elija nuevas fechas.
- **Pregunta/decisión requerida:** ¿deben ser seis sprints consecutivos de una semana o son iteraciones de otra duración dentro del horizonte 14-oct--02-nov?
- **Rol propietario sugerido:** Product Owner y responsable de planificación.

## 5. Observaciones aritméticas y de capacidad/recursos

- La extracción contiene 60 asignaciones y 40 tareas. Las tareas resumen reciben asignaciones con `ResourceUID=-65535`; por tanto, no se deben sumar indiscriminadamente las asignaciones de resumen y hoja.
- La suma mecánica de los campos `Work` de las 60 asignaciones es **224,5 horas**, pero no es un total de esfuerzo válido: incluye asignaciones de resumen y hojas y además contiene referencias de recurso irresolubles.
- En las tareas hoja no se observó ninguna sin asignación. Esto solo demuestra presencia de filas de asignación, no que el recurso sea válido ni que su calendario esté disponible.
- Las unidades de asignación son decimales; las asignaciones observadas usan `Units=1` (100%). `Work` está expresado en ISO 8601, por ejemplo `PT4H0M0S`.
- El calendario base declara `MinutesPerDay=480` y `MinutesPerWeek=2400`, equivalente a 8 horas por día y 40 horas por semana dentro de los días declarados; no se inventa disponibilidad adicional.
- No se pudo calcular un límite fiable de capacidad individual o de equipo porque faltan cinco calendarios de recurso. El solapamiento del SM se informa como comprobación acotada sobre las fechas almacenadas.

## 6. Dependencias y camino crítico

- Las predecesoras observadas en tareas hoja son enlaces `Type=1`, interpretados como FS; no se observaron referencias a tareas inexistentes ni autoenlaces en la extracción.
- La cadena de tareas hoja enlazadas no muestra ciclos en la comprobación acotada realizada.
- Los seis resúmenes de sprint no tienen predecesora propia; sus primeras tareas enlazan desde la tarea de gestión anterior, lo que produce una cadena temporal entre sprints a través de las tareas hoja.
- El XML marca como `Critical=1` la tarea raíz, los seis resúmenes de sprint y la mayoría de tareas de la cadena. Se informa como valor almacenado; no se recalculó el camino crítico.
- La ausencia de calendarios de recursos y las asignaciones `-65535` pueden volver no fiables las fechas y holguras calculadas. No se genera ni se reconstruye un calendario.

## 7. Resultado de costes

**N/A para una conclusión agregada.** El archivo contiene tarifas estándar (`$`, tarifa predeterminada 10; recursos con tarifas entre 28 y 42), pero no se proporciona presupuesto y las asignaciones no permiten separar con seguridad trabajo de resumen y de hoja. La suma de 224,5 horas no se convierte a dinero ni se presenta como coste.

## 8. Preguntas y siguientes acciones sugeridas

| Acción/pregunta | Rol sugerido | Disparador de validación | Bloqueante |
|---|---|---|---|
| Recuperar o confirmar calendarios UID 4-8. | Responsable de planificación/ProjectLibre | El XML declara cada calendario referenciado o se aporta evidencia equivalente. | YES |
| Resolver la semántica de `ResourceUID=-65535`. | Responsable de planificación/ProjectLibre | Todas las asignaciones apuntan a recursos declarados o quedan explícitamente no asignadas con el valor soportado. | YES |
| Revisar el solapamiento de Sergio Jiménez en tareas UID 2 y 4. | Scrum Master y responsable de planificación | Nueva exportación sin solapamiento no decidido o con decisión documentada. | YES |
| Confirmar la cadencia semanal frente a IT-001..IT-006. | Product Owner y responsable de planificación | Horizonte y duración de sprint declarados y reflejados en una nueva exportación. | YES |
| Decidir si se necesita baseline y registrar un nuevo estado de progreso. | Equipo del proyecto | Exportación posterior con baseline/progreso si forman parte del control del proyecto. | NO |

## 9. Disposición RECHECK

No aplica: no existe un informe previo en `docs/project/reviews/`.

## 10. Consejo final y límites

Para el archivo exacto `docs/project/Planificación_Sprints.xml`, la recomendación es **INVALID** hasta resolver los cuatro hallazgos bloqueantes. El XML conserva una estructura legible y dependencias FS aparentemente resolubles, pero eso no prueba que el plan sea ejecutable, que sus recursos estén disponibles o que el compromiso de seis sprints sea alcanzable.

No se modificaron requisitos, estimaciones, prioridades, dependencias, calendarios, asignaciones, fechas, baseline ni el XML. No se aprobó compromiso, plan, baseline ni quality gate. La única salida persistente creada por esta revisión es este informe.
