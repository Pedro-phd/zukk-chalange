import { makeAxiosHttpClientAdapter } from '../http/axios-http-client-factory'
import { makeApiUrlAdapter } from '../adapter/make-apiUrlAdapter'
import { IUpdateFarmer } from '@/domain/usecases/updateFarmer'
import { RemoteUpdateFarmer } from '@/data/useCases/remote-updateFarmer'

export const makeRemoteUpdateFarmer = (): IUpdateFarmer => {
  return new RemoteUpdateFarmer(
    makeApiUrlAdapter().getUrl('/farmer'),
    makeAxiosHttpClientAdapter(),
  )
}
