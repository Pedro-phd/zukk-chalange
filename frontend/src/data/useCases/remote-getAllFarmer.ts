import { IFarmer } from '@/domain/models/farmer'
import { IGetAllFarmer } from '@/domain/usecases/getAllFarmer'
import { HttpClient, HttpStatusCode } from '../protocols/http/http-client'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { ForbiddenError } from '@/domain/errors/forbidden-error'
import { ServerError } from '@/domain/errors/server-error'

export class RemoteGetAllFarmer implements IGetAllFarmer {
  private readonly httpClient: HttpClient<IFarmer[]>
  private readonly url: string

  constructor(url: string, httpClient: HttpClient) {
    this.httpClient = httpClient
    this.url = url
  }

  async get(): Promise<IFarmer[]> {
    const response = await this.httpClient.request({
      method: 'get',
      url: this.url,
    })
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body!
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError()
      case HttpStatusCode.forbidden:
        throw new ForbiddenError()
      default:
        throw new ServerError(response.error)
    }
  }
}
