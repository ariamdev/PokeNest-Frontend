import React, { useState } from 'react';
import '../styles/App.css';
import axios from 'axios';
import logo from '../assets/logo.png';
import cloud1 from '../assets/Cloud-1.png';
import cloud2 from '../assets/Cloud-2.png';
import cloud3 from '../assets/Cloud-3.png';


const api = axios.create({
  baseURL: '/auth', // Ajusta la URL base según tu backend
});

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', {
        username,
        password,
      });

      // Guardar el token en localStorage
      localStorage.setItem('token', response.data.token);

      // Redirigir según el rol
      const role = response.data.role;
      if (role === 'ADMIN') {
        window.location.href = '/admin-dashboard';
      } else if (role === 'USER') {
        window.location.href = '/user-dashboard';
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al iniciar sesión. Por favor, compruebe sus credenciales');
    }
  };
  
  return (
    <div className="App">
       <div className="background-clouds">
        <img src={cloud1} alt="Cloud 1" className="cloud cloud1" />
        <img src={cloud2} alt="Cloud 2" className="cloud cloud2" />
        <img src={cloud3} alt="Cloud 3" className="cloud cloud3" />
        <img src={cloud2} alt="Cloud 4" className="cloud cloud4" /> 
      </div>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit">Login</button>
        </form>
        <p className="register-text">
          ¿No tienes una cuenta? Regístrate {' '}
          <a href="/register" className="register-link">aquí.</a> 
          </p>
      </div>
    </div>
  );
}
export default App;