import { type Controller } from './../protocols/controller'
import { MissingParamError } from '../Errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { type HttpResponse, type HttpRequest } from './../protocols/http'
import { type EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../Errors/invalid-param-error'
import { ServerError } from '../Errors/server-error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 200,
        body: { data: { message: 'Created' } }
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
