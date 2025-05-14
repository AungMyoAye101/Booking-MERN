
import { toast, ToastContainer } from 'react-toastify'

const ToastProvider = () => {
    return (
        <ToastContainer position='top-right' autoClose={2000} />
    )
}

export const showToast = (type: "success" | "warn" | "error" | "info", message: string) => {
    if (type === "success") {
        toast.success(message)
    } else if (type === "warn") {
        toast.warn(message)
    } else if (type === 'error') {
        toast.error(message)
    } else if (type === 'info') {
        toast.info(message)
    } else {
        toast(message)
    }
}

export default ToastProvider