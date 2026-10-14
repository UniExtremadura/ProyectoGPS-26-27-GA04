# Revisión del plan de ProjectLibre

## 1. Metadatos de ejecución

- **Proyecto:** Centinela.
- **Modo:** VALIDATION.
- **Plan revisado:** `docs/project/Planificación_Epicas.xml`, exportación XML de ProjectLibre/MS Project (`SaveVersion=14`).
- **Identidad almacenada:** nombre/título `Centinela`; inicio `2026-10-14T08:00:00`; fin `2026-11-20T08:30:00`; fecha actual `2026-10-14T13:00:00`.
- **Calendario base:** UID 1, `Estandar`; lunes no laborable, martes-sábado de 08:00-12:00 y 13:00-17:00, domingo no laborable.
- **Longitud de sprint de referencia:** una semana, según la configuración del agente.
- **Alcance/baseline revisado:** contenido del XML; no hay baseline almacenada (`Baseline`=0).
- **Entradas de planificación usadas:** ninguna. No se ejecutó CONSISTENCY ni se comparó con `Libro.xlsx` o con un informe de planificación inicial.
- **Versión del informe:** `projectlibre-plan-review-v02`.
- **Informe previo para RECHECK:** `projectlibre-plan-review-v01.md`, pero corresponde a otra entrada de plan (`Planificación_Sprints.xml`); no se utiliza como una reconsulta de este XML.
- **Limitación de extracción:** el intérprete Python requerido por el procedimiento no está instalado. Se utilizó el parser XML nativo de PowerShell para la extracción estructurada equivalente; esta limitación no impidió acceder a las entidades revisadas.

## 2. Resumen

**Resultado asesor:** `VALID_WITH_NON_BLOCKING_FINDINGS`.

No se han identificado defectos bloqueantes en la comprobación estructural acotada. El XML contiene 38 tareas, 58 asignaciones y cinco enlaces SS con lag positivo, sin ciclos, referencias a tareas inexistentes, fechas invertidas, tareas hoja sin asignación ni solapamientos de recursos humanos detectables en los intervalos almacenados.

Quedan tres observaciones no bloqueantes: no existe baseline y todo el progreso almacenado es 0%; el campo WBS está vacío aunque los nombres contienen identificadores de épica/historia; y conviene confirmar que los enlaces SS con `LinkLag=24000` expresan intencionadamente 40 horas de separación. La validez estructural no demuestra que el alcance sea alcanzable ni que las estimaciones o la cadencia hayan sido aprobadas.

## 3. Inventario de evidencia y matriz de compatibilidad

| Dimensión | Estado | Evidencia | Límite |
|---|---|---|---|
| Formato e identidad | OK | XML MSPDI con namespace correcto; proyecto `Centinela`; 38 tareas. | No se comprobó un fichero binario `.pod`. |
| Calendario | OK | Calendario base UID 1 `Estandar`, con 8 h/día de martes a sábado. | Se aplican las excepciones del agente para calendarios personales UID 4-8 generados por ProjectLibre. |
| Tareas y jerarquía | OK | UID de tarea 1-38 únicos; resumen raíz, cuatro resúmenes `EP-001`..`EP-004` y gestión de ceremonias; no hay fechas fin anteriores a inicio. | El análisis no decide si la descomposición representa el alcance aprobado. |
| Trazabilidad | OBSERVACIÓN | Los nombres contienen `EP-001`..`EP-004` y `US-001`..`US-014`; el campo WBS está vacío en las tareas extraídas. | No se proporcionó manifiesto ni matriz de requisitos para comprobar cobertura. |
| Dependencias | OK CON OBSERVACIÓN | No hay referencias a tareas inexistentes ni autoenlaces; enlaces observados son FS (`Type=1`) y SS (`Type=3`). | No se reconstruyó ni optimizó el calendario. Debe confirmarse la intención de los lags SS. |
| Recursos y asignaciones | OK | Cinco recursos humanos, unidades `1` (100%), asignaciones a tareas hoja; `ResourceUID=-65535` solo aparece en tareas resumen y se ignora por la excepción explícita del agente. | No se valida disponibilidad externa al XML. |
| Capacidad | OK EN COMPROBACIÓN ACOTADA | No se observaron solapamientos entre asignaciones de un mismo recurso humano en los intervalos almacenados. | La comprobación no sustituye una revisión de capacidad o calendario personal. |
| Horizonte/cadencia | OBSERVACIÓN | Inicio 14-oct y fin 20-nov; seis planificaciones de sprint separadas por enlaces SS con lag de 40 horas. | La compatibilidad con una semana por sprint no se evalúa contra inputs no suministrados. |
| Baseline y progreso | OBSERVACIÓN | No hay nodos `Baseline`; todas las tareas tienen `PercentComplete=0`. | No se puede analizar variación ni avance real. |
| Costes | N/A | Hay tarifas en recursos, pero no se suministró presupuesto. | No se presenta un coste total sin presupuesto y alcance de costes declarado. |

## 4. Hallazgos

### PPR-v02-001 — No hay baseline ni progreso registrado

- **Categoría:** baseline/progreso.
- **Severidad:** MINOR.
- **Bloqueante:** NO.
- **Fuente/IDs:** proyecto raíz UID 1; `Baseline`=0; `PercentComplete=0` en las 38 tareas.
- **Observación:** el archivo representa un plan sin baseline y sin avance almacenado.
- **Impacto:** no permite comparar el estado actual con una línea base ni distinguir un plan todavía no iniciado de un plan cuyo progreso no se ha registrado.
- **Acción recomendada:** confirmar si la ausencia de baseline y el 0% son intencionados para esta exportación.
- **Pregunta/decisión requerida:** ¿se requiere baseline y seguimiento de progreso para este control del proyecto?
- **Rol propietario sugerido:** responsable de planificación/ProjectLibre.

### PPR-v02-002 — Campo WBS no persistido

- **Categoría:** trazabilidad de alcance.
- **Severidad:** MINOR.
- **Bloqueante:** NO.
- **Fuente/IDs:** tareas UID 1-38; nombres con `EP-001`..`EP-004` y `US-001`..`US-014`; campo `<WBS>` vacío en la extracción.
- **Observación:** los identificadores funcionales están en los nombres, pero no hay códigos WBS almacenados.
- **Impacto:** una matriz externa que dependa del WBS no puede enlazarse automáticamente con el XML; la trazabilidad disponible queda limitada al texto del nombre.
- **Acción recomendada:** confirmar si los identificadores de los nombres son la única clave de trazabilidad aceptada.
- **Pregunta/decisión requerida:** ¿debe el plan conservar códigos WBS explícitos o basta con los IDs incluidos en los nombres?
- **Rol propietario sugerido:** Product Owner y responsable de planificación.

### PPR-v02-003 — Lags SS positivos entre planificaciones de sprint

- **Categoría:** dependencias/cadencia.
- **Severidad:** MINOR.
- **Bloqueante:** NO.
- **Fuente/IDs:** UID 6 depende de UID 3; UID 9 de UID 6; UID 12 de UID 9; UID 15 de UID 12; UID 18 de UID 15. Todos son `Type=3` (SS) con `LinkLag=24000`.
- **Observación:** `LinkLag` está expresado en décimas de minuto; `24000` equivale a 2400 minutos, es decir, 40 horas. Los enlaces SS mantienen la separación almacenada entre planificaciones.
- **Impacto:** si el lag no representa la cadencia intencionada, un cambio de duración o calendario puede mover las ceremonias de sprint de forma distinta a la esperada. No se considera defecto porque las fechas guardadas son coherentes y no hay ciclo.
- **Acción recomendada:** confirmar la semántica del lag y reexportar solo si la intención humana difiere de lo almacenado.
- **Pregunta/decisión requerida:** ¿las 40 horas de lag SS entre planificaciones consecutivas representan la cadencia semanal acordada?
- **Rol propietario sugerido:** Scrum Master y responsable de planificación.

## 5. Observaciones aritméticas y de capacidad/recursos

- Se extrajeron 58 asignaciones para 38 tareas. Las asignaciones con `ResourceUID=-65535` pertenecen a tareas resumen y se excluyen de advertencias de capacidad conforme a la excepción explícita del agente.
- La suma mecánica de `Work` de las asignaciones con recursos humanos, excluyendo las asignaciones estructurales `-65535`, es **168,5 horas**. Es un total de filas de asignación, no una estimación independiente del alcance; no se deduplicó contra ninguna fuente externa.
- Todas las tareas hoja tienen al menos una asignación en el XML extraído. Esto acredita presencia de asignación, no suficiencia de capacidad o aceptación del alcance.
- Las unidades de asignación observadas son `1` (100%). `Work` usa ISO 8601, por ejemplo `PT4H0M0S`.
- No se observaron solapamientos de intervalos entre asignaciones del mismo recurso humano en la comprobación acotada. No se infiere disponibilidad fuera de los calendarios declarados.
- No se calcula un límite de capacidad del equipo: no se proporcionan disponibilidad, vacaciones, foco ni restricciones de dedicación adicionales.

## 6. Dependencias y camino crítico

- Los enlaces `Type=1` se interpretan como FS y los `Type=3` como SS, conforme al contrato de revisión. No se observaron enlaces FF o SF.
- No hay referencias a UID de tarea inexistentes, autoenlaces ni ciclos en la comprobación acotada.
- Los enlaces SS con `LinkLag=24000` aparecen entre las tareas de planificación UID 3, 6, 9, 12, 15 y 18. Se informa el valor almacenado; no se ha generado ni reconstruido un calendario.
- La tarea raíz UID 1 y varias tareas de gestión tienen `Critical=1`; otras tareas de épica e historia tienen `Critical=0`. Estos son valores calculados almacenados por ProjectLibre y no se recalculan.
- La ausencia de baseline limita el análisis de variación, pero no constituye por sí sola un defecto estructural.

## 7. Resultado de costes

**N/A.** El XML contiene tarifas estándar para recursos, pero no contiene un presupuesto ni una regla de alcance de costes suministrada para esta revisión. No se convierte el total de 168,5 horas a dinero ni se presenta una cifra presupuestaria.

## 8. Preguntas y siguientes acciones sugeridas

| Acción/pregunta | Rol sugerido | Disparador de validación | Bloqueante |
|---|---|---|---|
| Confirmar si baseline y progreso 0% son intencionados. | Responsable de planificación/ProjectLibre | Exportación posterior o decisión documentada sobre el estado de control. | NO |
| Confirmar si la trazabilidad por nombres sustituye al WBS persistido. | Product Owner y responsable de planificación | Matriz de trazabilidad o XML posterior con WBS. | NO |
| Validar la intención de los cinco lags SS de 40 horas. | Scrum Master y responsable de planificación | Revisión de dependencias o nueva exportación con la semántica confirmada. | NO |
| Comparar posteriormente con alcance, prioridades, estimaciones y capacidad declarados. | Equipo del proyecto | Disponibilidad de `Libro.xlsx` y/o informe de planificación inicial versionado. | NO |

## 9. Disposición RECHECK

No aplica: no existe un informe previo específico de este XML en `docs/project/reviews/project-libre/`.

## 10. Consejo final y límites

Para el archivo exacto `docs/project/Planificación_Epicas.xml`, la recomendación es **VALID_WITH_NON_BLOCKING_FINDINGS**. La estructura revisada es internamente coherente dentro de los límites indicados: no se observaron defectos bloqueantes de tareas, referencias, fechas, dependencias o solapamientos de recursos humanos.

La revisión no determina que las épicas sean alcanzables, que las estimaciones sean correctas, que la capacidad sea suficiente ni que la cadencia sea un compromiso aprobado. Se respetaron las excepciones del agente para calendarios personales UID 4-8 y asignaciones estructurales `ResourceUID=-65535`.

No se modificaron requisitos, estimaciones, prioridades, dependencias, calendarios, asignaciones, fechas, baseline ni el XML. No se aprobó compromiso, plan, baseline ni quality gate. La única salida persistente creada por esta revisión es este informe.
