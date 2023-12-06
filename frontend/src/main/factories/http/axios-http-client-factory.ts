import { type HttpClient } from '@/data/protocols/http/http-client'
import { AxiosHttpClientAdapter } from '@/infra/axios-http-client-adapter'

export const makeAxiosHttpClientAdapter = (): HttpClient => {
  return new AxiosHttpClientAdapter()
}
