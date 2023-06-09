import { EmailValidatorAdapter } from "./email-validator"
import validator from 'validator'

describe('EmailValidator Adapter ', () => {

    jest.mock('validator', () => ({
        isEmail(): boolean {
            return true
        }
    }))

    test('Should return false is validator returns false ', () => {
        const sut = new EmailValidatorAdapter()
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
        const isValid = sut.isValid('invalid_email@mail.com')
        expect(isValid).toBe(false)
    })

    test('Should return false is validator returns false ', () => {
        const sut = new EmailValidatorAdapter()
        const isValid = sut.isValid('valid_email@mail.com')
        expect(isValid).toBe(true)
    })


    test('Should call validator with correct email', () => {
        const sut = new EmailValidatorAdapter()
        const isEmailSpy = jest.spyOn(validator, 'isEmail')
        sut.isValid('any_email@mail.com')
        expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
    })


})