// @ts-ignore
import {apiBaseUrl} from '../config/apiConfig'
import UserRequest from '../models/user/UserRequest'
import UserResponse from '../models/user/UserResponse'
import ErrorFetch from '../util/ErrorFetch'
import ErrorHandler from '../util/ErrorHandler'

export default class UserRepository {
  private baseUrl: string

  constructor() {
    this.baseUrl = apiBaseUrl
  }

  async login(userRequest: UserRequest): Promise<UserResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userRequest)
      });

      if (response.status === 400) {
        throw new ErrorHandler('Usuario y/o clave incorrecta!')
      }

      if (!response.ok) {
        throw new ErrorHandler(
            'Ocurrió un error al intentar iniciar sesión!',
            response.status.toString())
      }

      const responseData = await response.json()
      console.log(responseData)
      const {jwt, user} = responseData;
      const {id, nombre, apellido} = user;
      if (jwt) {
        return new UserResponse(
            jwt, id, `${nombre} ${apellido}`, new Date().getTime())
      }
    } catch (error) {
      if (error instanceof ErrorHandler) throw error
        // @ts-ignore
        else throw new ErrorFetch(error.message)
    }
    return new UserResponse('', 0, '', 0)
  }
}