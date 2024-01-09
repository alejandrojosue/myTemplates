import UserRequest from '../models/user/UserRequest'
import UserRepository from '../repositories/UserRepository';
import ErrorFetch from '../util/ErrorFetch';

const useLogin = () => {
  const handleLogin = (identifier: string, password: string) => {
    if (identifier && password) {
      const userRequest = new UserRequest(identifier, password);
      new UserRepository()
          .login(userRequest)
          .then(res => {
            if (res.jwt !== '') {
              sessionStorage.setItem('daiswadod', res.jwt)
              location.href = '/home'
            }
          })
          .catch(error => {
            if (error instanceof ErrorFetch) {
              alert(
                  `No se ha podido conectar con el servidor: ${error.message}`)
            } else {
              alert(error.message)
            }
          })
    } else
      alert('Debe llenar los campos!');
  };
  return {
    handleLogin
  }
};

export default useLogin