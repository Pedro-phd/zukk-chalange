import { RemoteGetAllFarmer } from '@/data/useCases/remote-getAllFarmer'
import { IGetAllFarmer } from '@/domain/usecases/getAllFarmer'
import { makeAxiosHttpClientAdapter } from '../http/axios-http-client-factory'
import { makeApiUrlAdapter } from '../adapter/make-apiUrlAdapter'

export const makeRemoteGetAllFarmer = (): IGetAllFarmer => {
  return new RemoteGetAllFarmer(
    makeApiUrlAdapter().getUrl('/farmer'),
    makeAxiosHttpClientAdapter(),
  )
}
