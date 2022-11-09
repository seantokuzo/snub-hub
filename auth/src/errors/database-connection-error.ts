export class DatabaseConnectionError extends Error {
  // reason: 'Error connecting to database'
  constructor(reason = 'Error connecting to database') {
    super()

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }
}
