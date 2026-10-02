# Constitución del proyecto

**1. Nada se construye sin haber sido pedido antes**
Si una funcionalidad no viene de una historia de usuario aprobada, no se
escribe una línea de código para ella. Queremos poder seguir el hilo completo
en cualquier momento: de la necesidad del técnico de almacén a la línea de
código que la resuelve, pasando por el requisito, el plan y las pruebas.
Si alguien pregunta "¿por qué existe esto?", siempre debe haber una respuesta
documentada.

**2. El MVP manda, no el entusiasmo**
Es fácil que a alguien del equipo se le ocurra "sería genial añadir también...".
Nos comprometemos a resistir esa tentación salvo que la ampliación esté
justificada, priorizada frente al resto del backlog, y se haya evaluado su
coste en tiempo y capacidad. Toda ampliación de alcance queda por escrito como
una decisión consciente del equipo.

**3. Funciona en la demo no es lo mismo que está terminado**
Cada historia lleva sus criterios de aceptación, su forma de manejar errores
y sus pruebas correspondientes antes de darse por cerrada. Si el almacén
puede quedarse con una pieza mal contada porque no gestionamos un caso límite,
el servicio no está completo, aunque en la demo todo salga bien.

**4. Todo lo que toca el servicio es ficticio**
No se usa, ni se referencia, ningún dato real de personal, unidades o
equipamiento. Todo el inventario, las solicitudes y los usuarios son
inventados por el equipo. Además, validamos cada entrada y protegemos la
información y las operaciones desde el primer boceto de la especificación.

**5. Si el usuario no lo entiende a la primera, hay que rehacerlo**
El servicio va a ser usado por personal con niveles muy distintos de soltura con la
tecnología. Los mensajes de error, los flujos de consulta y solicitud, y la
navegación en general se diseñan pensando en eso: claridad antes que
elegancia visual, y accesibilidad básica (contraste, tamaños legibles,
navegación por teclado) desde el principio.

## Cómo documentamos
Repartimos la documentación en tres capas con responsabilidades distintas,
para no mezclar el qué con el cómo:
- **spec.md** cuenta qué necesitamos y por qué.
- **plan.md** cuenta cómo lo vamos a resolver técnicamente.
- **tasks.md** trocea ese plan en trabajo que alguien puede coger y ejecutar.

Cualquier decisión que cambie el rumbo del proyecto se anota, con fecha y
responsable, y queda enlazada con el artefacto al que afecta.

## Antes de dar algo por bueno
No aprobamos una especificación, un plan o una implementación hasta
comprobar que:
- No se sale del alcance acordado en goals.md sin que haya sido una
decisión explícita.
- Se puede trazar de principio a fin.
- Tiene criterios de aceptación que se puedan comprobar objetivamente.
- Ha tenido en cuenta calidad, pruebas, seguridad y accesibilidad.

## Gobierno
Esta constitución está por encima de cualquier otro documento del proyecto.
Si hay que cambiar algo de aquí, se justifica, se aprueba explícitamente
entre todo el equipo, se anota la fecha y la nueva versión, y se deja claro
qué otros documentos o decisiones se ven afectados. Las excepciones existen,
pero siempre son explícitas, justificadas y, siempre que se pueda, temporales.