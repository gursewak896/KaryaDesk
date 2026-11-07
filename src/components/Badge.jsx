const styles = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-600',
    leave: 'bg-yellow-100 text-yellow-700',
    pending: 'bg-yellow-100 text-yellow-700',
    done: 'bg-green-100 text-green-700',
    // fallback for unknown values from MockAPI
    default: 'bg-gray-100 text-gray-600',
}

export default function Badge({ status, children }) {
    const key = ['active', 'inactive', 'leave', 'pending', 'done'].includes(status)
        ? status
        : 'default'
    const style = styles[key]
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
            {children || status}
        </span>
    )
}