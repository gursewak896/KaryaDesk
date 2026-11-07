export default function Card({ children, className = '' }) {
    return (
        <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
            {children}
        </div>
    )
}

export function CardHeader({ title, action }) {
    return (
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
            {action}
        </div>
    )
}