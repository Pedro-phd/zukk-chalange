import { ApiUrlAdapter } from '@/infra/adapter/apiUrl-adapter'

export const makeApiUrlAdapter = () => {
  return new ApiUrlAdapter()
}
