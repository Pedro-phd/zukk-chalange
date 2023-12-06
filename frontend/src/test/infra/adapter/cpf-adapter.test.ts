import { makeCpfValidator } from '@/main/factories/adapter/make-cpfValidatorAdapter'
import { fakerBr } from '@js-brasil/fakerbr'

describe('Cpf validator test', () => {
  it('is valid cpf', () => {
    const { isValid } = makeCpfValidator()

    const validCpf = fakerBr.cpf()
    const invalidCpf = '00000000000'

    expect(isValid(validCpf)).toEqual(true)
    expect(isValid(invalidCpf)).toEqual(false)
  })
})
