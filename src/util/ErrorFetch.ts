export default class ErrorFetch extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ErrorFetch';
  }
}