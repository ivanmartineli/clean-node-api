import { MissingParamError } from '../error/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../error/invalid-param-error';

export class SignUpController implements Controller {

    private readonly emailValidador: EmailValidator

    constructor(emailValidator: EmailValidator) {
        this.emailValidador = emailValidator

    }

    handle(httpRequest: HttpRequest): any {
        try {
            const riquiredFileds = ['name', 'email', 'password', 'passwordConfirmation'];
            for (const field of riquiredFileds) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const isValid = this.emailValidador.isValid(httpRequest.body.email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }

        } catch (error) {
            return serverError()
        }
    }
}
