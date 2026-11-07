export default function Select({ label, options = [], className = '', ...props }) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <select
                className={`px-3 py-2 rounded-lg border border-gray-300 text-sm outline-none focus:border-blue-500 bg-white ${className}`}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    )
}