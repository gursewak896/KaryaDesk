import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
    useEffect(() => {
        const timer = setTimeout(onClose, duration)
        return () => clearTimeout(timer)
    }, [onClose, duration])

    const styles = {
        success: 'bg-green-600 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-blue-600 text-white',
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div
                className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-3 ${styles[type] || styles.info}`}
            >
                <span>{message}</span>
                <button onClick={onClose} className="opacity-70 hover:opacity-100">
                    ✕
                </button>
            </div>
        </div>
    )
}