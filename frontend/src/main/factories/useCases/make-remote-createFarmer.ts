import { makeAxiosHttpClientAdapter } from '../http/axios-http-client-factory'
import { makeApiUrlAdapter } from '../adapter/make-apiUrlAdapter'
import { ICreateFarmer } from '@/domain/usecases/createFarmer'
import { RemoteCreateFarmer } from '@/data/useCases/remote-createFarmer'

export const makeRemoteCreateFarmer = (): ICreateFarmer => {
  return new RemoteCreateFarmer(
    makeApiUrlAdapter().getUrl('/farmer'),
    makeAxiosHttpClientAdapter(),
  )
}
