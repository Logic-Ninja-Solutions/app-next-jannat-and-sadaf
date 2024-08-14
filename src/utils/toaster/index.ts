import { toast } from 'react-toastify'

export function showErrorToast(message: string, timer?: number) {
    toast.error(message, {
        position: 'bottom-right',
        autoClose: timer ?? 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}

export function showSuccessToast(message: string, timer?: number) {
    toast.success(message, {
        position: 'bottom-right',
        autoClose: timer ?? 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}

export function showInfoToast(message: string, timer: number = 10000) {
    toast.info(message, {
        position: 'bottom-right',
        autoClose: timer,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}
