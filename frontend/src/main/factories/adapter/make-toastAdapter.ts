import { ToastAdapter } from '@/infra/adapter/toast-adapter'

export const makeToastAdapter = () => {
  return new ToastAdapter()
}
