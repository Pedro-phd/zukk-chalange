import { CpfValidator } from '@/domain/validators/cpf-validator'

export const makeCpfValidator = () => {
  return new CpfValidator()
}
