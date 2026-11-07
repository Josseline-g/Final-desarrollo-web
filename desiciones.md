# Desiciones tomadas:

En este archivo tenemos tres secciones importantes:
a. Qué entendí del problema y qué tablas se crearon.
b. Qué cosas le pedí a la IA que hiciera por mí y por qué.
c. Un error que cometió la IA, cómo me di cuenta y cómo se solucionó.

---

## Sección A: Qué entendí del problema y tablas utilizadas

### Lo que entendí del problema
El objetivo es hacer una página web para un laboratorio donde la gente pueda reportar cuando un equipo o máquina se arruina. 

Hay dos tipos de personas usando el sistema: **usuarios normales** y **técnicos**. Esto es muy importante porque hay una regla principal: **una falla solo la puede marcar como resuelta (cerrar) la misma persona que la reportó o un técnico**. El sistema tiene que recordar quién inició sesión usando cookies para no dejar que cualquiera cierre los reportes de otros.

### Tablas creadas

1. **Usuario**
   - 1.1 ID (Número para identificarlo)
   - 1.2 NombreUsuario (Su nombre de cuenta)
   - 1.3 Contraseña (Su clave de acceso)
   - 1.4 Rol (Si es "usuario" o "técnico")

2. **Incidencia** (El reporte de la falla)
   - 2.1 ID (Número de reporte)
   - 2.2 Descripción (Lo que le pasó al equipo)
   - 2.3 Estado (Si está "abierta" o "cerrada")
   - 2.4 UsuarioId (Quién hizo el reporte)
   - 2.5 EquipoId (Qué equipo se arruinó)

3. **Equipo**
   - 3.1 ID (Número de equipo)
   - 3.2 Nombre (Ejemplo: Microscopio)
   - 3.3 Código (Ejemplo: MIC-001)
   - 3.4 Ubicación (En qué parte del lab está)

---

## Sección B: Partes que le delegué a la IA y por qué

1. **Conexión de cookies entre la pantalla y el servidor:**
   - **Por qué:** La pantalla (React) y el servidor (Node.js) funcionan en partes distintas. Configurar el permiso para que se pasen la cookie sin que el navegador la bloquee es enredado, así que le pedí a la IA que hiciera esa conexión.

2. **Diseño básico de las pantallas en React:**
   - **Por qué:** Le pedí a la IA que armara los formularios de login, el registro de fallas y la tabla para ver las incidencias, para no perder tiempo escribiendo código de botones o cajas de texto desde cero.

---

## Sección C: Algo que la IA hizo mal, cómo me di cuenta y cómo se arregló

### El error de la IA
La IA se olvidó de decirle a la pantalla de React que guardara y enviara la "cookie de sesión" en cada clic. 

Por eso, el servidor no recordaba quién era la persona que había entrado y la desconectaba a cada rato.

### Cómo me di cuenta
Iniciaba sesión y el sistema decía que todo estaba bien (daba un mensaje exitoso de 200 OK). Pero en cuanto intentaba darle clic al botón para cerrar una incidencia o me cambiaba de pantalla, el sistema me sacaba automáticamente o me decía que no tenía permiso.

### Solución
Se arregló agregándole una indicación simple al código (`credentials: 'include'`) para obligar a la página a enviar la cookie del usuario en cada petición.