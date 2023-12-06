import { CnpjValidator } from '@/domain/validators/cnpj-validator'

export const makeCnpjValidator = () => {
  return new CnpjValidator()
}
