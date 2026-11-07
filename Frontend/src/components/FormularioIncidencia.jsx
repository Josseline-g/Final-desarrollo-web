import { useState } from 'react';

export default function FormularioIncidencia({ equipos, alCrear }) {
  const [equipoId, setEquipoId] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/api/incidencias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ equipoId, descripcion }),
      credentials: 'include' // ENVÍA LA COOKIE
    });

    if (res.ok) {
      setDescripcion('');
      setEquipoId('');
      alCrear();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Reportar nueva falla</h3>
      <select value={equipoId} onChange={e => setEquipoId(e.target.value)} required>
        <option value="">-- Seleccionar Equipo --</option>
        {equipos.map(eq => (
          <option key={eq.id} value={eq.id}>{eq.nombre} ({eq.codigo})</option>
        ))}
      </select>
      <br /><br />
      <textarea 
        placeholder="Escribe lo que le pasó al equipo..." 
        value={descripcion} 
        onChange={e => setDescripcion(e.target.value)} 
        required 
      />
      <br /><br />
      <button type="submit">Enviar Reporte</button>
    </form>
  );
}