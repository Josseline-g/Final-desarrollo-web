export default function ListaIncidencias({ incidencias, usuarioActual, alActualizar }) {
  const handleCerrar = async (id) => {
    const res = await fetch(`http://localhost:4000/api/incidencias/${id}/cerrar`, {
      method: 'PATCH',
      credentials: 'include' // ENVÍA LA COOKIE
    });

    if (res.ok) {
      alActualizar();
    } else {
      const data = await res.json();
      alert(data.mensaje);
    }
  };

  return (
    <div>
      <h3>Lista de Incidencias</h3>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Equipo</th>
            <th>Descripción</th>
            <th>Reportado Por</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {incidencias.map(inc => {
            const esCreador = inc.creador?.id === usuarioActual.id;
            const esTecnico = usuarioActual.rol === 'tecnico';
            const puedeCerrar = (esCreador || esTecnico) && inc.estado === 'abierta';

            return (
              <tr key={inc.id}>
                <td>{inc.id}</td>
                <td>{inc.Equipo?.nombre} ({inc.Equipo?.codigo})</td>
                <td>{inc.descripcion}</td>
                <td>{inc.creador?.nombreUsuario}</td>
                <td><strong>{inc.estado}</strong></td>
                <td>
                  {puedeCerrar ? (
                    <button onClick={() => handleCerrar(inc.id)}>Cerrar Incidencia</button>
                  ) : (
                    <span>{inc.estado === 'cerrada' ? 'Finalizada' : 'Sin permiso'}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}