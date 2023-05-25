/**
 * ApiError with additional properties i.e name and message
 * @type {module.ApiError}
 */
export default class ApiError extends Error {
  public statusCode: number | null = null;
  constructor(error: any, statusCode: number | null = null) {
    super();
    this.name = error.name;
    this.message = error.message;
    this.statusCode = statusCode;
    this.stack = Error().stack;
  }
}
