import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from '../signup/signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {

    private readonly emailValidador: EmailValidator
    private readonly addAccount: AddAccount

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidador = emailValidator
        this.addAccount = addAccount

    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const riquiredFileds = ['name', 'email', 'password', 'passwordConfirmation'];
            for (const field of riquiredFileds) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const { name, email, password, passwordConfirmation } = httpRequest.body

            if (password != passwordConfirmation) {
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }

            const isValid = this.emailValidador.isValid(email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }

            const account = await this.addAccount.add({
                name,
                email,
                password
            })

            return ok(account)

        } catch (error) {
            return serverError()
        }
    }
}
