import { useContext, useEffect, useState } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import FormularioIncidencia from './components/FormularioIncidencia';
import ListaIncidencias from './components/ListaIncidencias';

function ContenidoPrincipal() {
  const { usuario, logout, cargando } = useContext(AuthContext);
  const [equipos, setEquipos] = useState([]);
  const [incidencias, setIncidencias] = useState([]);

  const cargarDatos = async () => {
    if (!usuario) return;
    try {
      const [resEq, resInc] = await Promise.all([
        fetch('http://localhost:4000/api/equipos', { credentials: 'include' }),
        fetch('http://localhost:4000/api/incidencias', { credentials: 'include' })
      ]);
      if (resEq.ok) setEquipos(await resEq.json());
      if (resInc.ok) setIncidencias(await resInc.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [usuario]);

  if (cargando) return <p>Cargando aplicación...</p>;
  if (!usuario) return <Login />;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Sistema de Incidencias de Laboratorio</h2>
        <div>
          <span>Usuario: <strong>{usuario.nombreUsuario}</strong> ({usuario.rol})</span>
          <button onClick={logout} style={{ marginLeft: '15px' }}>Cerrar Sesión</button>
        </div>
      </header>
      <hr />
      <FormularioIncidencia equipos={equipos} alCrear={cargarDatos} />
      <hr />
      <ListaIncidencias incidencias={incidencias} usuarioActual={usuario} alActualizar={cargarDatos} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ContenidoPrincipal />
    </AuthProvider>
  );
}