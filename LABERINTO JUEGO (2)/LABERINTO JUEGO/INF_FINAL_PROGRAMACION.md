**UNIVERSIDAD CATÓLICA BOLIVIANA "SAN PABLO"**

**CARRERA DE INGENIERÍA INDUSTRIAL**

**SEDE SANTA CRUZ**

![](media/image1.png){width="2.8049365704286964in"
height="2.3062806211723537in"}

**"Proyecto Final "Laberinto"**

> **Asignatura: Programación I**
>
> **Docente:** Ing. Eddy Escalante
>
> **Estudiantes:** Sebastián Leigue, Jefferson Delgadillo
>
> **Fecha de entrega:** 12 de diciembre de 2025

Santa Cruz, Bolivia

2025

**Introducción**

El presente documento describe el desarrollo del videojuego 2D
"Laberinto de Preguntas", creado utilizando JavaScript, HTML y CSS como
proyecto final de la materia Programación I.

El objetivo principal de este trabajo es aplicar de manera práctica los
conocimientos adquiridos en el semestre, tales como la manipulación del
DOM, el uso de eventos, la programación estructurada, el diseño de
interfaces básicas y la construcción de mecánicas interactivas.

El proyecto combina la exploración en un entorno tipo laberinto con la
resolución de preguntas, generando una experiencia que integra
razonamiento, orientación espacial y aprendizaje visual.

El desarrollo del videojuego constituyó una oportunidad para reforzar
habilidades de diseño lógico, pensamiento computacional y resolución de
problemas, al mismo tiempo que permitió experimentar con la creación de
niveles, colisiones y control del movimiento en un entorno digital.

**Desarrollo del Proyecto**

**Diseño del Videojuego**

**Concepto General**

"Laberinto de Preguntas" es un videojuego educativo en formato 2D que
presenta al jugador tres niveles diferentes. En cada nivel se formula
una pregunta y se muestran varias imágenes distribuidas dentro del
laberinto. Estas imágenes representan posibles respuestas, y el jugador
debe desplazarse mediante las teclas direccionales para encontrar la
respuesta correcta.

El juego combina elementos de exploración, aprendizaje visual y toma de
decisiones. Además, cada nivel posee un diseño diferente tanto en
estructura como en contenido, permitiendo una progresión lógica de
dificultad.

**Historia del Juego y Objetivo Principal**

El jugador se encuentra dentro de un conjunto de laberintos temáticos,
cada uno asociado a una pregunta. Su misión es resolver correctamente
las interrogantes desplazándose por el escenario, observando las
imágenes disponibles y seleccionando la que representa la respuesta
correcta.

El objetivo final es superar los tres niveles, acertando en cada
pregunta. La dificultad aumenta conforme el jugador avanza, ya sea por
la complejidad del laberinto o por la similitud entre las imágenes de
respuesta.

**Mecánicas Principales del Juego**

El videojuego se basa en mecánicas simples pero eficientes para cumplir
su propósito educativo:

-   Desplazamiento del jugador:

> El personaje se mueve utilizando las teclas arriba, abajo, izquierda y
> derecha.
>
> Este movimiento permite explorar el laberinto libremente, lo cual
> fomenta tanto la intuición espacial como la búsqueda activa.

-   Observación mediante hover:

> Al colocar el mouse sobre una imagen, aparece una pista visual o
> textual que ayuda al jugador a entender qué representa dicha imagen.
>
> Este elemento es clave para reforzar el aprendizaje conceptual sin
> revelar directamente la respuesta correcta.

-   Selección de respuestas:

> Cuando el jugador toca una imagen, el juego evalúa si corresponde a la
> respuesta correcta.
>
> Si lo es, se habilita el acceso al siguiente nivel; si no, el jugador
> permanece en el mismo escenario.

Estas mecánicas crean una experiencia intuitiva, guiada y accesible para
todo tipo de jugadores.

**Condiciones de Victoria y Error**

-   Victoria:

> Ocurre cuando el jugador encuentra y selecciona la imagen correcta
> correspondiente a la pregunta del nivel.
>
> El juego muestra un mensaje positivo y avanza automáticamente al
> siguiente nivel.

-   Selección Incorrecta:

> Si el jugador elige una imagen equivocada, el nivel no avanza.
>
> El jugador debe continuar explorando el laberinto hasta encontrar la
> respuesta correcta.
>
> No hay penalizaciones ni sistema de vidas, ya que la intención del
> juego es fomentar la exploración y el aprendizaje.

**Diferencias Entre los Niveles**

Cada nivel posee características particulares para garantizar una
progresión lógica de dificultad.

Estas diferencias se centran en tres áreas fundamentales:

1.  La pregunta del nivel

2.  Las imágenes que representan las posibles respuestas

3.  La estructura y complejidad del laberinto

A continuación se detalla cada nivel.

**Nivel 1 -- Introducción y aprendizaje básico**

-   Presenta una pregunta sencilla y fácil de interpretar.

-   Las imágenes de respuesta son claras y visualmente distintas entre
    sí.

-   El laberinto es pequeño, con pocos pasillos y un diseño simple.

-   El jugador se familiariza con las mecánicas del movimiento y la
    exploración.

-   Es el nivel más accesible, pensado como introducción.

> ![](media/image2.png){width="6.1375in" height="5.305555555555555in"}

**Nivel 2 -- Complejidad intermedia**

-   Se formula una nueva pregunta, ligeramente más complicada.

-   Las imágenes de respuesta aumentan en número o similitud, lo cual
    incrementa la dificultad de identificación.

-   El laberinto es más grande, con caminos falsos, "esquinas muertas" y
    trayectorias más extensas.

-   La exploración empieza a requerir más tiempo y planificación.

-   Se aumenta el desafío sin comprometer la jugabilidad.

> ![](media/image3.png){width="6.1375in" height="5.164583333333334in"}

**Nivel 3 -- Desafío final**

-   Se presenta la pregunta más difícil del juego.

-   Las imágenes de respuesta están distribuidas estratégicamente en
    zonas alejadas.

-   La similitud entre las respuestas hace más difícil distinguir cuál
    es la correcta sin utilizar las pistas de hover.

-   El laberinto es el más grande y complejo, con múltiples rutas, zonas
    cerradas y caminos alternativos.

-   Representa la culminación del reto planteado por el juego.

> ![](media/image4.png){width="6.1375in" height="5.096527777777778in"}

**Herramientas Utilizadas**

Para la construcción del videojuego se emplearon las siguientes
herramientas:

-   JavaScript para el movimiento del jugador, la detección de
    colisiones, la interacción con las imágenes y la transición entre
    niveles.

-   HTML5 para la estructura visual del juego, los contenedores del
    escenario, la colocación de imágenes y el texto de las preguntas.

-   CSS3 para el diseño del laberinto, los estilos del personaje, la
    posición de los elementos y toda la apariencia general del juego.

-   Visual Studio Code como entorno de desarrollo, permitiendo escribir,
    editar y depurar el código.

-   Recursos gráficos como imágenes utilizadas para representar posibles
    respuestas y elementos visuales del nivel.

**Organización del Trabajo**

Si fue en equipo: integrante participó en áreas como progr

En ambos casos se utilizó GitHub para almacenar el proyecto, organizar
las carpetas, mantener versiones del avance y documentar el
funcionamiento general mediante un archivo README en formato Markdown.

**Resultados**

Durante las pruebas se comprobó que:

-   Los tres niveles funcionan correctamente.

-   Cada pregunta se despliega según el nivel correspondiente.

-   Las imágenes reaccionan a la interaccion mostrando pistas.

-   El movimiento del jugador es fluido y consistente.

-   La detección de la respuesta correcta funciona sin errores.

-   Al completar los tres niveles, se muestra la pantalla final de
    victoria.

El juego cumple con los requerimientos del proyecto:

interactividad, progresión, niveles diferenciados y mecánicas
funcionales.

Capturas del videojuego:

![](media/image5.png){width="6.1375in"
height="2.852777777777778in"}![](media/image6.png){width="6.1375in"
height="3.2756944444444445in"}![](media/image7.png){width="6.1375in"
height="3.4506944444444443in"}![](media/image8.png){width="6.1375in"
height="3.4506944444444443in"}![](media/image9.png){width="6.1375in"
height="3.4506944444444443in"}![](media/image10.png){width="6.1375in"
height="3.4506944444444443in"}![](media/image11.png){width="6.1375in"
height="3.4506944444444443in"}

**Conclusiones y Lecciones Aprendidas**

El desarrollo de "Laberinto de Preguntas" permitió reforzar los
conocimientos adquiridos en Programación I, especialmente en:

-   Creación de lógica de juego.

-   Control de movimientos y eventos de teclado.

-   Manejo de imágenes y detección de interacciones.

-   Diseño de niveles con dificultad progresiva.

-   Estructuración de un proyecto completo desde cero.

Este proyecto demostró que es posible crear videojuegos funcionales
utilizando tecnologías básicas del entorno web. También permitió
comprender la importancia de planificar la estructura del juego,
organizar los recursos y mantener un código limpio y comprensible.

**Mejoras Futuras**

-   Crear animaciones para el jugador.

-   Implementar un sistema de temporizador por nivel.

-   Incluir más niveles o modalidades de juego.

**Anexos**

-   Fragmentos de código relevantes.

-   Estructura de carpetas del proyecto.

-   Recursos gráficos utilizados.
