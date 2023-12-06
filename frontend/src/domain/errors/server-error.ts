export class ServerError extends Error {
  constructor(message?: string) {
    switch (message) {
      case 'Network Error':
        super(
          'Parece que os nossos servidores estão offline. Por favor tente novamente',
        )
        break
      default:
        super(message)
        break
    }
    this.name = 'ServerError'
  }
}
