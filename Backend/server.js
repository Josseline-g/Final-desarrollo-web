const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { sequelize, Usuario, Equipo } = require('./models');
const bcrypt = require('bcryptjs');

const authRoutes = require('./routes/auth');
const equiposRoutes = require('./routes/equipos');
const incidenciasRoutes = require('./routes/incidencias');

const app = express();

// Configuración de CORS para aceptar las cookies de React
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Configuración de Sesión con Cookie
app.use(session({
  secret: 'clave_secreta_laboratorio',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // En desarrollo local debe ser false
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 8 // 8 horas
  }
}));

app.use('/api/auth', authRoutes);
app.use('/api/equipos', equiposRoutes);
app.use('/api/incidencias', incidenciasRoutes);

// Inicializar la BD con datos de prueba
sequelize.sync({ force: true }).then(async () => {
  console.log('Base de datos lista');

  // Usuarios de prueba (clave: 123456)
  const pass = await bcrypt.hash('123456', 10);
  await Usuario.bulkCreate([
    { nombreUsuario: 'juan_usuario', contrasena: pass, rol: 'usuario' },
    { nombreUsuario: 'maria_usuario', contrasena: pass, rol: 'usuario' },
    { nombreUsuario: 'carlos_tecnico', contrasena: pass, rol: 'tecnico' }
  ]);

  // Equipos de prueba
  await Equipo.bulkCreate([
    { nombre: 'Microscopio Óptico', codigo: 'MIC-01', ubicacion: 'Lab A' },
    { nombre: 'Centrífuga', codigo: 'CEN-02', ubicacion: 'Lab B' },
    { nombre: 'Espectrofotómetro', codigo: 'ESP-03', ubicacion: 'Lab A' }
  ]);

  app.listen(4000, () => console.log('Servidor en http://localhost:4000'));
});