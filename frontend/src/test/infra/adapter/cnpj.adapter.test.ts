import { makeCnpjValidator } from '@/main/factories/adapter/make-cnpjValidatorAdapter'
import { fakerBr } from '@js-brasil/fakerbr'

describe('Cnpj validator test', () => {
  it('is valid cnpj', () => {
    const { isValid } = makeCnpjValidator()

    const validCnpj = fakerBr.cnpj()
    const invalidCnpj = '00000000000'

    expect(isValid(validCnpj)).toEqual(true)
    expect(isValid(invalidCnpj)).toEqual(false)
  })
})
