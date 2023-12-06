export class NotAcceptable extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = 'NotAcceptable'
  }
}
