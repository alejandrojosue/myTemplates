export default class UserResponse {
  constructor(
      public jwt: string, public id: number, public nombre: string,
      public fecha: number) {}
}