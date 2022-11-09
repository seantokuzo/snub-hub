import { Request, Response, NextFunction } from 'express'
import { RequestValidationError } from '../errors/request-validation-error'
import { DatabaseConnectionError } from '../errors/database-connection-error'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formmattedErrors = err.errors.map((error) => {
      return {
        message: err.message,
        field: error.param
      }
    })
    return res.status(400).send({ errors: formmattedErrors })
  }
  if (err instanceof DatabaseConnectionError) {
    console.log('Handling Database Connection Error')
  }

  res.status(400).send({ errors: [{ message: 'Something went wrong' }] })
}
