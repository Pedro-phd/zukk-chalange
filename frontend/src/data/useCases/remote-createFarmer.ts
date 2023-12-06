import { IFarmer } from '@/domain/models/farmer'
import { HttpClient, HttpStatusCode } from '../protocols/http/http-client'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { ForbiddenError } from '@/domain/errors/forbidden-error'
import { ServerError } from '@/domain/errors/server-error'
import { ICreateFarmer } from '@/domain/usecases/createFarmer'
import { NotAcceptable } from '@/domain/errors/notAcceptable-error'

export class RemoteCreateFarmer implements ICreateFarmer {
  private readonly httpClient: HttpClient<{ id: number }>
  private readonly url: string

  constructor(url: string, httpClient: HttpClient) {
    this.httpClient = httpClient
    this.url = url
  }

  async create(data: IFarmer): Promise<{ id: number }> {
    const response = await this.httpClient.request({
      method: 'post',
      url: this.url,
      body: data,
    })
    switch (response.statusCode) {
      case HttpStatusCode.created:
        return response.body!
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError()
      case HttpStatusCode.forbidden:
        throw new ForbiddenError()
      case HttpStatusCode.notAcceptable:
        throw new NotAcceptable(response.error)
      default:
        throw new ServerError(response.error)
    }
  }
}
