import Toastify from 'toastify-js'

type ToastTypes = 'success' | 'error'
export class ToastAdapter {
  toast(message: string, type: ToastTypes) {
    const style =
      type === 'success'
        ? 'linear-gradient(to right, #12A150, #0E793C)'
        : 'linear-gradient(to right, #920B3A, #610726)'

    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: 'bottom',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: style,
      },
    }).showToast()
  }
}
