import { makeAxiosHttpClientAdapter } from '../http/axios-http-client-factory'
import { makeApiUrlAdapter } from '../adapter/make-apiUrlAdapter'
import { IDeleteFarmer } from '@/domain/usecases/deleteFarmer'
import { RemoteDeleteFarmer } from '@/data/useCases/remote-deleteFarmer'

export const makeRemoteDeleteFarmer = (): IDeleteFarmer => {
  return new RemoteDeleteFarmer(
    makeApiUrlAdapter().getUrl('/farmer/{id}'),
    makeAxiosHttpClientAdapter(),
  )
}
