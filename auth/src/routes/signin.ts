import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { Password } from '../services/password'
import { User } from '../models/User'
import { validateRequest } from '../middlewares/validate-request'
import { BadRequestError } from '../errors/bad-request-error'

const router = express.Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Please supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    // FIND USER
    const existingUser = await User.findOne({ email })
    // IF NO USER FOUND WITH THAT EMAIL
    if (!existingUser) {
      throw new BadRequestError('Login failed')
    }
    // COMPARE PASSWORDS
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    )
    if (!passwordsMatch) {
      throw new BadRequestError('Login failed')
    }
    // GENERATE JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      },
      process.env.JWT_KEY!
    )

    //STORE JWT ON SESSION OBJECT
    req.session = {
      jwt: userJwt
    }

    res.status(200).send(existingUser)
  }
)

export { router as signinRouter }
