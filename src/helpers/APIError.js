export default class APIError extends Error {
  constructor (message, status = 500) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.status = status;
  }
}
