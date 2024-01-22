import './login.scss';
import { useState } from 'react';
import useLogin from '../../hooks/useLogin'
const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useLogin()

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Usuario"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <label>Usuario</label>
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Contraseña</label>
      </div>
      <button onClick={() => {
        handleLogin(identifier, password)
      }}>Acceder</button>
    </div>
  );
};
export default Login