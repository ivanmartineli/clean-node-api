import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { AddAccount } from '../../domain/usecase/add-account'

export class SignUpController implements Controller {

    private readonly emailValidador: EmailValidator
    private readonly addAccount: AddAccount

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidador = emailValidator
        this.addAccount = addAccount

    }

    handle(httpRequest: HttpRequest): any {
        try {
            const riquiredFileds = ['name', 'email', 'password', 'passwordConfirmation'];
            for (const field of riquiredFileds) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const { name, email, password, passwordConfirmation} = httpRequest.body

            if(password != passwordConfirmation){
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }

            const isValid = this.emailValidador.isValid(email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }

            this.addAccount.add({
                name,
                email,
                password
            })

        } catch (error) {
            return serverError()
        }
    }
}
