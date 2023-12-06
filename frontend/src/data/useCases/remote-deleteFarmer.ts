import { IFarmer } from '@/domain/models/farmer'
import { HttpClient, HttpStatusCode } from '../protocols/http/http-client'
import { UnauthorizedError } from '@/domain/errors/unauthorized-error'
import { ForbiddenError } from '@/domain/errors/forbidden-error'
import { ServerError } from '@/domain/errors/server-error'
import { IDeleteFarmer } from '@/domain/usecases/deleteFarmer'

export class RemoteDeleteFarmer implements IDeleteFarmer {
  private readonly httpClient: HttpClient<IFarmer[]>
  private readonly url: string

  constructor(url: string, httpClient: HttpClient) {
    this.httpClient = httpClient
    this.url = url
  }

  async delete(id: number): Promise<boolean> {
    const response = await this.httpClient.request({
      method: 'delete',
      url: this.url.replace('{id}', id.toString()),
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
