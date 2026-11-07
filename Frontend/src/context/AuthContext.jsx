import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Comprobar si hay cookie activa al recargar
    fetch('http://localhost:4000/api/auth/me', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.usuario) setUsuario(data.usuario);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  const login = async (nombreUsuario, contrasena) => {
    const res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombreUsuario, contrasena }),
      credentials: 'include' // ENVÍA LA COOKIE
    });
    const data = await res.json();
    if (res.ok) {
      setUsuario(data.usuario);
      return { exito: true };
    }
    return { exito: false, mensaje: data.mensaje };
  };

  const logout = async () => {
    await fetch('http://localhost:4000/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};