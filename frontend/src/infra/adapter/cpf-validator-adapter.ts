import { ICpfValidator } from '@/domain/adapter/cpf-validator'
import { validateBr } from 'js-brasil'

export class CpfValidator implements ICpfValidator {
  isValid(document: string): boolean {
    return validateBr.cpf(document)
  }
}
