import { MissingParamError } from '../error/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller';

export class SignUpController implements Controller{
    handle(httpRequest: HttpRequest): any {
        const riquiredFileds = ['name', 'email', 'password', 'passwordConfirmation'];
        for (const field of riquiredFileds) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
    }
}
