import './login.scss';
import { useState } from 'react';
import useLogin from '../../hooks/useLogin'
import lang from '../../languages/index'
const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin } = useLogin()

  return (
    <div className="login-container">
      <h1>{lang.pages.Login.title}</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder={lang.pages.Login.label.user}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <label>{lang.pages.Login.label.user}</label>
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder={lang.pages.Login.label.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>{lang.pages.Login.label.password}</label>
      </div>
      <button onClick={() => {
        handleLogin(identifier, password)
      }}>{lang.pages.Login.button.title}</button>
    </div>
  );
};
export default Login