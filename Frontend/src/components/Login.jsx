import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(nombreUsuario, contrasena);
    if (!res.exito) setError(res.mensaje);
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto' }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Usuario" 
          value={nombreUsuario} 
          onChange={e => setNombreUsuario(e.target.value)} 
          required 
        />
        <br /><br />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={contrasena} 
          onChange={e => setContrasena(e.target.value)} 
          required 
        />
        <br /><br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}