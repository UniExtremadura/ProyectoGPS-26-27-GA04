ACTA 1 · SPRINT PLANNING IT-001

Incidencia Jira: SCRUM-24
Sprint: IT-001 (15 oct a 21 oct de 2026)
Fecha de la reunión: miércoles 14 de octubre de 2026
Dedicación registrada: 4 h
Modera: Sergio Jiménez (Scrum Master)

PARTICIPANTES
Jorge Acedo (Product Owner), Sergio Jiménez (Scrum Master), Alfonso Canal (Tech Lead), Elena Cancho (QA/DevOps) y Adolfo Lozano (Developer).

OBJETIVO DEL SPRINT
Dejar abierto el primer tramo del recorrido esencial de Centinela: que el técnico pueda localizar una pieza (US-001) y solicitarla (US-002). Es la base de la que dependen el resto de historias Must have.

CAPACIDAD DISPONIBLE (horas-persona efectivas)
Jorge Acedo (PO): 2,5
Sergio Jiménez (SM): 2,5
Alfonso Canal (TL): 3,0
Elena Cancho (QA/DevOps): 3,5
Adolfo Lozano (Dev): 4,0
Total equipo: 15,5

HISTORIAS SELECCIONADAS
US-001 (SCRUM-10), Buscar piezas por nombre o código. Épica EP-001, Must have, 4,5 h-p. Responsable: Adolfo Lozano.
US-002 (SCRUM-11), Solicitar una pieza. Épica EP-002, Must have, 7,5 h-p. Responsable: Alfonso Canal, con apoyo de Elena Cancho.
Total comprometido: 12,0 h-p.
Margen respecto a la capacidad del equipo: 15,5 menos 12,0 = 3,5 h-p (alrededor del 23 %).

DEPENDENCIAS
US-002 depende de US-001, porque no se puede solicitar una pieza sin haber consultado antes su disponibilidad. Se acuerda que Adolfo empieza por la búsqueda y que Alfonso avanza en paralelo con el flujo de solicitud y la generación de la referencia única.

COMPROBACIÓN DE DEFINITION OF READY
Ambas historias cumplen el DoR: tienen identificador, épica y objetivo asociado, criterios de aceptación observables, prioridad, estimación en h-p, incertidumbre identificada (US-001 baja, US-002 media) y dependencias conocidas.

RIESGOS E IMPEDIMENTOS DETECTADOS

US-002 es la historia más grande y tiene incertidumbre media. Además, por sí sola supera la capacidad semanal de cualquier miembro, así que debe repartirse entre dos personas.
Caso límite de concurrencia en US-002 (dos técnicos solicitando la última unidad). Se tratará como prueba obligatoria antes de dar la historia por terminada.
Desajuste de capacidad individual. Los tres perfiles técnicos suman 10,5 h efectivas frente a las 12 h comprometidas. Se absorbe con el margen de imprevistos y con apoyo del PO y del SM en validación y documentación (alrededor de 1,5 h).

DECISIONES Y ACUERDOS
Se aceptan las dos historias como compromiso del sprint.
Las tareas de gestión del sprint son: planning (SCRUM-24), review (SCRUM-26) y retrospectiva (SCRUM-27).
Review y retrospectiva se celebrarán el martes 20 de octubre, según el Team Charter.
Las horas se imputarán en Jira mediante smartcommits.
Cada historia se desarrolla en su propia rama y entra en develop mediante pull request revisado por otro miembro.
