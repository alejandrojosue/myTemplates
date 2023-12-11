export default class User {
  id: Number
  email: String
  firstName: String
  lastName: String
  rtn: String
  isJurado: boolean
  roleID: Number
  roleName: String
  constructor(
      id: Number, email: String = '', firstName: String = '',
      lastName: String = '', rtn: String = '', isJurado: boolean = false,
      roleID: Number = 0, roleName: String = '') {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.rtn = rtn;
    this.isJurado = isJurado;
    this.roleID = roleID;
    this.roleName = roleName
  }
}