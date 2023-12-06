import { IFarmer } from '@/domain/models/farmer'
import { HttpClient, HttpStatusCode } from '../protocols/http/http-client'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { ForbiddenError } from '@/domain/errors/forbidden-error'
import { ServerError } from '@/domain/errors/server-error'
import { IUpdateFarmer } from '@/domain/usecases/updateFarmer'

export class RemoteUpdateFarmer implements IUpdateFarmer {
  private readonly httpClient: HttpClient<IFarmer[]>
  private readonly url: string

  constructor(url: string, httpClient: HttpClient) {
    this.httpClient = httpClient
    this.url = url
  }

  async update(data: IFarmer): Promise<boolean> {
    const response = await this.httpClient.request({
      method: 'put',
      url: this.url,
      body: data,
    })
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return true
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError()
      case HttpStatusCode.forbidden:
        throw new ForbiddenError()
      default:
        throw new ServerError(response.error)
    }
  }
}
