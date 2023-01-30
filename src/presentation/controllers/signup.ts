import { type Controller } from './../protocols/controller'
import { MissingParamError } from '../Errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { type HttpResponse, type HttpRequest } from './../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 200,
      body: { data: { message: 'Created' } }
    }
  }
}
