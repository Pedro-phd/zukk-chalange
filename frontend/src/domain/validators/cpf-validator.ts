export class CpfValidator {
  isValid(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf.length !== 11) return false
    if (/^(\d)\1+$/.test(cpf)) return false

    let sum = 0
    let mod

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }

    mod = (sum * 10) % 11
    if (mod === 10 || mod === 11) mod = 0

    if (mod !== parseInt(cpf.substring(9, 10))) return false

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }

    mod = (sum * 10) % 11

    if (mod === 10 || mod === 11) mod = 0

    return mod === parseInt(cpf.substring(10, 11))
  }
}
