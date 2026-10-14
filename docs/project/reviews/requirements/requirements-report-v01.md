# Requirements review v01

## 1. Metadatos de la ejecución

- **Modo:** INITIAL.
- **Alcance revisado:** product backlog completo localizado en `specs/`: EP-001,
  EP-002, EP-003 y EP-004, incluyendo sus historias `US-001` a `US-018`.
- **Baseline declarada en las épicas:** `requirements-v1`.
- **Snapshot/commit:** no suministrado.
- **Fecha/hora:** 2026-10-07 (fecha de la ejecución; no se conoce la hora del
  snapshot de las fuentes).
- **Agente:** `requirements-reviewer.agent.md`; versión del agente no indicada.
- **Modelo/herramientas:** no indicados.
- **Idioma:** español.

## 2. Manifiesto de fuentes y limitaciones

### Fuentes leídas

| Fuente | Rol | Evidencia de versión/alcance |
|---|---|---|
| `.specify/memory/constitution.md` | Gobierno y principios obligatorios | Constitución del proyecto, sin versión visible |
| `docs/organization/quality/definition-of-ready.md` | DoR compartido | DoR de Centinela |
| `docs/organization/quality/definition-of-done.md` | DoD compartido | DoD de Centinela |
| `specs/EP-001-consulta_inventario/spec.md` | Épica de consulta de inventario | `requirements-v1`; US-001, US-011, US-012, US-017 |
| `specs/EP-002-solicitud_repuestos/spec.md` | Épica de solicitudes | `requirements-v1`; US-002, US-009, US-014 |
| `specs/EP-003-gestion_almacen/spec.md` | Épica de gestión de almacén | `requirements-v1`; US-004, US-005, US-006, US-007, US-008, US-010, US-015 |
| `specs/EP-004-seguimiento_solicitudes/spec.md` | Épica de seguimiento | `requirements-v1`; US-003, US-013, US-016, US-018 |

### Fuentes no accesibles o no encontradas en lo revisado

- `goals.md`, requerido explícitamente por el DoR: **no encontrado en las
  fuentes y directorios revisados**. Por ello la trazabilidad Goal de todas las
  historias es `NOT_ASSESSABLE`, aunque las épicas declaren G-01/G-02.
- Documento de misión/stakeholders: **no encontrado en las fuentes y
  directorios revisados**.
- Decisiones humanas, catálogo de prioridades/estimaciones y reportes previos:
  **no encontrados en la carpeta de calidad revisada**.
- No se revisaron código, planes, tareas, Wiki ni implementación. El DoD no se
  puede evaluar como cumplimiento de producto.

## 3. Evaluación acotada

**Recomendación: NEEDS_REFINEMENT.**

El alcance revisado contiene historias identificadas, priorizadas, estimadas y
con criterios de aceptación en las cuatro épicas, pero hay bloqueos de
interpretación en el flujo cantidad-stock-reserva-entrega y en el rechazo con
motivo. Además, la trazabilidad contra los objetivos no puede comprobarse sin
`goals.md`. Estos bloqueos afectan al núcleo Must have: US-001, US-002, US-003,
US-004, US-005 y US-006. Las historias `Won't have` se revisan para coherencia
del backlog, no como trabajo listo para el MVP.

## 4. Matriz de cobertura

| Dimensión | Elementos inspeccionados | Resultado | Hallazgos |
|---|---|---|---|
| Claridad y consistencia | Todas las US y AC | Bloqueada | F-01, F-02, F-03 |
| Cobertura y alcance | Límites de las cuatro EP y US | Parcial | F-04, Q-01 |
| Elementos de especificación | AC, reglas, NFR, errores y límites | Parcial | F-01, F-02, F-04 |
| Tamaño/granularidad | Todas las US | Parcial | F-05 |
| Aceptación y DoR | Todas las US contra DoR | Bloqueada | F-06 |
| Dependencias y supuestos | Campo `Predecessors` y referencias cruzadas | Parcial | F-02, F-03, F-07 |

## 5. Índice de hallazgos

| ID | Severidad | Confianza | Estado | Tema |
|---|---|---|---|---|
| F-01 | CRITICAL | HIGH | Bloqueante | Cantidad solicitada y descuento de entrega no tienen una semántica única |
| F-02 | MAJOR | HIGH | Bloqueante | Reserva, stock disponible y concurrencia no están alineados |
| F-03 | MAJOR | HIGH | Bloqueante | Rechazo con motivo y dependencia US-005/US-010 son inconsistentes |
| F-04 | MAJOR | HIGH | Bloqueante | La trazabilidad a Goals no es verificable sin `goals.md` |
| F-05 | MINOR | MEDIUM | No bloqueante | Hay historias demasiado amplias o con resultado observable incompleto |
| F-06 | MAJOR | HIGH | Bloqueante | Varios criterios DoR no se pueden demostrar o quedan abiertos |
| F-07 | MINOR | HIGH | No bloqueante | Estados y referencias cruzadas no son completamente uniformes |

### F-01 — Cantidad solicitada y descuento de entrega

- **Categoría:** consistencia / regla de negocio.
- **Fuente e ID:** EP-002, US-002-AC-01/02; EP-003, US-006-AC-03; frontera de
  EP-002 y regla de cantidad de EP-003.
- **Extracto:** US-002 exige seleccionar pieza e introducir tarea y bloquea si
  “la cantidad requerida” supera el stock; US-006 resta “1 unidad”.
- **Observación:** se valida una cantidad que no aparece como campo ni se define
  si una solicitud puede contener una o varias unidades. La entrega siempre
  descuenta una unidad, por lo que no se puede saber si una solicitud de dos
  unidades se entrega de una vez, en varias entregas o no está permitida.
- **Impacto:** stock, reserva, histórico y disponibilidad pueden quedar
  incorrectos; impide una interpretación común del flujo Must have.
- **Acción sugerida:** decidir y documentar cardinalidad de unidades por
  solicitud, campo y límites, y hacer coherentes AC, reserva, entrega,
  cancelación y concurrencia. Añadir escenarios de éxito, cantidad cero,
  cantidad máxima y entrega parcial si aplica.
- **Confianza:** HIGH; contradicción textual directa.
- **Bloqueador:** sí.

### F-02 — Reserva, stock disponible y concurrencia

- **Categoría:** consistencia / dependencia de datos.
- **Fuente e ID:** EP-002, US-002, regla de negocio; EP-003, US-005-AC-02 y
  US-006; EP-001, US-001, regla de stock disponible.
- **Extracto:** US-002 dice que una solicitud no reserva definitivamente hasta
  ser aceptada; US-005 dice que al aceptar la pieza queda “virtualmente
  reservada”; US-001 descuenta solicitudes aceptadas; US-002 describe
  concurrencia en el envío antes de la aceptación.
- **Observación:** no se define si “stock disponible” significa stock físico
  menos reservas aceptadas, ni si el envío pendiente consume capacidad para
  evitar sobreasignación. Tampoco se define qué ocurre al aceptar cuando la
  reserva ya no es posible.
- **Impacto:** dos técnicos pueden obtener resultados distintos y el almacén
  puede aceptar una solicitud que no puede entregar; los AC de búsqueda,
  solicitud y aceptación no son verificables de forma consistente.
- **Acción sugerida:** establecer el modelo de inventario con invariantes
  explícitos (físico, comprometido, disponible), el momento exacto de la
  reserva y transacciones para enviar/aceptar/cancelar/entregar, incluyendo
  carreras entre aceptación, cancelación y ajuste.
- **Confianza:** HIGH; varias reglas explícitas usan términos distintos.
- **Bloqueador:** sí.

### F-03 — Rechazo con motivo y dependencia

- **Categoría:** claridad / dependencias.
- **Fuente e ID:** EP-003, US-005-AC-03; EP-003, US-010-AC-01/02; EP-004,
  US-003-AC-03.
- **Extracto:** US-005 permite pulsar “Rechazar” y cambiar a Rechazada; US-010
  exige un texto antes de completar el rechazo; US-003 muestra el motivo.
- **Observación:** el flujo obligatorio del motivo está definido en una historia
  separada cuya predecesora es US-005, aunque US-005 depende funcionalmente de
  ella para completarse. US-005 tampoco especifica qué ocurre si el texto está
  vacío ni cómo se persiste el motivo.
- **Impacto:** una implementación de US-005 puede producir rechazos sin motivo,
  contradiciendo US-010 y US-003; la dependencia declarada no representa la
  dependencia funcional.
- **Acción sugerida:** decidir si US-010 es parte de US-005, un requisito
  previo, o un flujo separado; reflejar la relación en `Predecessors` y añadir
  AC de persistencia, error de texto vacío y visualización del motivo.
- **Confianza:** HIGH; referencias directas entre historias.
- **Bloqueador:** sí para el flujo de rechazo.

### F-04 — Trazabilidad a Goals no verificable

- **Categoría:** trazabilidad / alcance.
- **Fuente e ID:** `docs/organization/quality/definition-of-ready.md`,
  Identificación y trazabilidad; todas las cabeceras `Goals` de EP-001 a EP-004.
- **Extracto:** el DoR exige un Goal definido en `goals.md`; las épicas
  referencian G-01 y G-02, pero el archivo requerido no está en las fuentes
  revisadas.
- **Observación:** no se puede comprobar qué significan G-01/G-02, si cubren
  todo el backlog o si las exclusiones EX-01/EX-02 pertenecen a un alcance
  aprobado.
- **Impacto:** no puede certificarse el criterio de Ready ni detectar
  historias fuera del MVP.
- **Acción sugerida:** proporcionar la versión autoritativa de `goals.md` y
  confirmar la relación de cada épica/historia con sus Goals; no asumir que la
  etiqueta de la épica sustituye al documento.
- **Confianza:** HIGH; archivo requerido explícitamente y no encontrado.
- **Bloqueador:** sí para la evaluación global; no demuestra por sí solo que
  una historia esté mal alineada.

### F-05 — Granularidad y verificabilidad local

- **Categoría:** tamaño / aceptación.
- **Fuente e ID:** EP-001, US-012-AC-02 y regla de paginación; EP-004,
  US-013-AC-02; EP-003, US-007 y US-008.
- **Observación:** US-012 combina ordenación, estado visual y resultados
  paginados sin definir la interacción con filtros; US-013 incluye auditoría,
  identidad del responsable e histórico, pero no define orden, vacío ni
  paginación; US-007 y US-008 describen administración de inventario pero
  dejan sin AC varios errores y límites relevantes.
- **Impacto:** aumenta el trabajo oculto y dificulta comprobar cada resultado
  independientemente.
- **Acción sugerida:** separar o concretar outcomes verticales, manteniendo la
  decisión del equipo sobre el corte; añadir estados vacío/error y reglas
  observables donde falten.
- **Confianza:** MEDIUM; evaluación heurística, no una contradicción.
- **Bloqueador:** no, salvo que se pretenda marcar estas historias Ready sin
  refinarlas.

### F-06 — Criterios DoR no demostrables o abiertos

- **Categoría:** Definition of Ready.
- **Fuente e ID:** DoR completo; todas las historias.
- **Observación:** todas las historias tienen ID, épica, actor, capacidad,
  beneficio, criterios, prioridad, estimación e incertidumbre visibles. Sin
  embargo, el Goal no es verificable por la ausencia de `goals.md`; US-001,
  US-011, US-012, US-013, US-014 y US-015 tienen `Initial plan: Por definir`;
  varias historias no documentan NFR, restricciones, errores o supuestos
  suficientes; y F-01/F-02/F-03 son dudas que impiden planificar el flujo.
- **Impacto:** no se puede afirmar que las historias cumplan el DoR para entrar
  al Sprint Backlog.
- **Acción sugerida:** resolver los bloqueos funcionales, aportar `goals.md`,
  completar plan/predecesores y registrar explícitamente las preguntas que el
  equipo acepte como no bloqueantes.
- **Confianza:** HIGH; se basa en casillas y campos observables.
- **Bloqueador:** sí para las historias afectadas.

### F-07 — Estados y referencias no uniformes

- **Categoría:** terminología / trazabilidad.
- **Fuente e ID:** EP-004, título de US-003 y US-003-AC-02; EP-002, US-009;
  EP-003, US-005 y US-006.
- **Observación:** el título de US-003 enumera pendiente/aceptada/entregada,
  mientras el AC incluye también rechazada y cancelada. US-009 dice que una
  cancelada desaparece de pendientes, mientras US-003 exige que siga en
  “Mis Solicitudes”. La lista de estados no está centralizada ni se define
  una máquina de estados completa.
- **Impacto:** interfaces y pruebas pueden usar estados distintos o permitir
  transiciones incompatibles.
- **Acción sugerida:** publicar el conjunto de estados, transiciones válidas,
  estados finales y visibilidad por rol; alinear títulos, AC, ejemplos y
  dependencias.
- **Confianza:** HIGH; diferencia textual directa.
- **Bloqueador:** no si se resuelve antes de implementar el flujo completo;
  afecta a Must have si se deja abierto.

## 6. Matriz DoR

Abreviaturas: `M` = MET, `NM` = NOT_MET, `NA` = NOT_ASSESSABLE, `N/A` =
NOT_APPLICABLE. Las columnas siguen literalmente los criterios del DoR:
ID, épica, Goal, actor, capacidad, valor, alcance, AC definidos, AC
observables, AC no prescriptivos, prioridad, estimación, incertidumbre,
dependencias, NFR, restricciones, problemas abiertos.

| US | EP | Goal | Actor | Cap. | Valor | Alcance | AC def. | AC obs. | AC no presc. | Pri. | Est. | Inc. | Dep. | NFR | Restr. | Abiertos |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EP-001 | NA | M | M | M | M | M | M | M | M | M | M | M | M | M | NM |
| US-011 | EP-001 | NA | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| US-012 | EP-001 | NA | M | M | M | M | M | M | M | M | M | M | M | M | M | NM |
| US-017 | EP-001 | NA | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| US-002 | EP-002 | NA | M | M | M | M | M | NM | M | M | M | M | M | M | M | NM |
| US-009 | EP-002 | NA | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| US-014 | EP-002 | NA | M | M | M | M | M | M | M | M | M | M | M | M | NM | M |
| US-004 | EP-003 | NA | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| US-005 | EP-003 | NA | M | M | M | M | M | NM | M | M | M | M | NM | M | M | NM |
| US-006 | EP-003 | NA | M | M | M | M | M | M | M | M | M | M | M | M | M | NM |
| US-007 | EP-003 | NA | M | M | M | M | M | NM | M | M | M | M | M | M | M | NM |
| US-008 | EP-003 | NA | M | M | M | M | M | NM | M | M | M | M | M | M | M | M |
| US-010 | EP-003 | NA | M | M | M | M | M | M | M | M | M | M | NM | M | M | NM |
| US-015 | EP-003 | NA | M | M | M | M | M | M | M | M | M | M | M | NM | M | M |
| US-003 | EP-004 | NA | M | M | M | M | M | M | M | M | M | M | M | M | M | NM |
| US-013 | EP-004 | NA | M | M | M | M | M | NM | M | M | M | M | M | NM | M | NM |
| US-016 | EP-004 | NA | M | M | M | M | M | M | M | M | M | M | M | M | M | M |
| US-018 | EP-004 | NA | M | M | M | M | M | M | M | M | M | M | M | M | M | M |

`NM` no significa que la historia sea incorrecta por sí misma: indica que el
criterio no está satisfecho con la evidencia leída. `NA` en Goal se aplica a
todas las historias por F-04. Las historias `Won't have` (US-017, US-016 y
US-018) se mantienen en la matriz para conservar trazabilidad, pero deben
tratarse como **diferidas**, no como candidatas a entrar en el Sprint Backlog.
El DoD no se evalúa porque no se leyó implementación ni evidencia de pruebas.

## 7. Candidatos de omisión y preguntas de stakeholders

### Candidatos de cobertura (no son defectos confirmados)

- **IN_SCOPE_CANDIDATE:** definición de roles, autenticación y autorización
  para técnico, personal de almacén y administrador. Las historias asumen
  sesión iniciada y restringen algunas acciones, pero no especifican la
  identidad ni el modelo de permisos. Pregunta: ¿qué roles y permisos son
  obligatorios para el MVP?
- **IN_SCOPE_CANDIDATE:** estados vacío, error, carga y paginación para
  búsquedas, filtros, histórico y ajustes. El backlog cubre algunos casos,
  pero no todos. Pregunta: ¿qué estados de interfaz deben ser aceptados en la
  demo y en pruebas?
- **SCOPE_UNCLEAR:** auditoría de ajustes manuales. US-008 exige motivo, y
  US-013 habla de “quién autorizó un ajuste”, pero no exige explícitamente
  guardar usuario, hora y valor anterior/nuevo para el ajuste. Pregunta: ¿la
  auditoría de ajustes forma parte del MVP?

### Posibles exclusiones

- **OUT_OF_SCOPE:** notificaciones externas, GPS, ERP, compras, pagos y PDF
  están excluidos o marcados `Won't have` en las fuentes revisadas. No se
  recomienda incorporarlos sin decisión explícita y reevaluación de capacidad.

## 8. Dependencias, supuestos y trazabilidad

- `US-002 -> US-001`, `US-003 -> US-002`, `US-004 -> US-002`,
  `US-005 -> US-004`, `US-006 -> US-005` y `US-009 -> US-002` forman el flujo
  principal declarado.
- `US-010` es funcionalmente necesario para completar `US-005`, pero declara
  `US-005` como predecesora: dependencia invertida o decisión de corte no
  explicada (F-03).
- `US-017`, `US-013` dependen de US-006/US-008 y `US-016`, US-018 de US-005/
  US-006; son dependencias plausibles, pero las historias diferidas no deben
  bloquear el MVP si no se implementan.
- Supuestos relevantes: navegador en la base, sesión iniciada, catálogo
  ficticio, una pieza por solicitud (EP-002), entrega física y nomenclatura
  conocida. Deben confirmarse como restricciones de producto o mantenerse
  como supuestos explícitos.
- La trazabilidad `EP -> Goal` está declarada, pero `Goal -> definición y
  alcance` no es verificable sin `goals.md`.

## 9. Preguntas para el equipo

1. **Bloqueante:** ¿una solicitud puede pedir más de una unidad? Si sí, ¿cómo
   se reserva, entrega parcial o totalmente y descuenta el stock?
2. **Bloqueante:** ¿cuándo se reduce el stock disponible y qué diferencia hay
   entre stock físico, comprometido y disponible?
3. **Bloqueante:** ¿el rechazo siempre requiere motivo? ¿US-010 forma parte de
   US-005 y qué dependencia controla?
4. **Bloqueante:** ¿puede proporcionarse la versión autoritativa de `goals.md`
   y confirmarse el catálogo de alcance/Stakeholders?
5. ¿Cuál es la máquina de estados completa de una solicitud y qué transiciones
   son atómicas ante cancelación, aceptación, ajuste y entrega?
6. ¿Qué roles existen y qué controles de autorización se esperan para cada
   operación?
7. ¿La auditoría de ajustes exige usuario, fecha/hora, valor anterior, nuevo
   valor y motivo?

## 10. RECHECK

No aplica: esta es una revisión INITIAL. No se proporcionaron informe previo,
registro de decisiones humanas ni fuentes revisadas posteriormente.

## 11. Cierre explícito

This is an advisory review. No source requirement, priority, estimate, plan or
human decision was changed. No baseline or gate was approved.
