import { ICnpjValidator } from '@/domain/adapter/cnpj-validator'
import { validateBr } from 'js-brasil'

export class CnpjValidator implements ICnpjValidator {
  isValid(document: string): boolean {
    return validateBr.cnpj(document)
  }
}
