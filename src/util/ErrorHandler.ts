class ErrorHandler extends Error {
  private errorList = {
    'Bad Request': () => {
      alert('Errores en envío/recepción de datos')
    },
    Unauthorized: () => window.location.href = `#/unauthorized`,
    Forbidden: () => window.location.href = `#/unauthorized`,
    'Not Found': () => {},
    'Internal Server Error': () => {},
    'Failed to fetch': () => alert('No hay conexión con el servidor')
  };
  constructor(message: string, status: any = null) {
    super(message);
    this.name = 'ErrorHandler';
    if (status) {
      this.errorList[status.toString()] && this.errorList[status.toString()]()
    }
  }
}

export default ErrorHandler
