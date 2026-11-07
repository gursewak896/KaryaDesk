import Card from './Card'

export default function StatCard({ label, value, change, icon }) {
    const isPositive = change?.startsWith('+')
    return (
        <Card className="p-5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
                    {change && (
                        <p className={`text-xs mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {change} from last month
                        </p>
                    )}
                </div>
                {icon && <div className="text-2xl">{icon}</div>}
            </div>
        </Card>
    )
}