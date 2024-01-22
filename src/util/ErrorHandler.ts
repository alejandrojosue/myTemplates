class ErrorHandler extends Error {
  constructor(message: string, status: any = null) {
    super(message);
    this.name = 'ErrorHandler';
  }
}

export default ErrorHandler