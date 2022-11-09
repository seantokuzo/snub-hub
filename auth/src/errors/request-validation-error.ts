import { ValidationError } from 'express-validator'

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super()

    // Only because extending a built in class - only needed if targeting ES5 in ts.config
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }
}
