import Card, { CardHeader } from '../components/Card'
import StatCard from '../components/StatCard'
import Table from '../components/Table'
import Badge from '../components/Badge'

const stats = [
    { label: 'Total Employees', value: '42', change: '+3', icon: '👥' },
    { label: 'Active Tasks', value: '128', change: '+12', icon: '📋' },
    { label: 'Departments', value: '6', change: '0', icon: '🏢' },
    { label: 'Completed Today', value: '15', change: '+5', icon: '✅' },
]

const recentEmployees = [
    { id: 1, name: 'Aarav Sharma', email: 'aarav@karyadesk.com', department: 'Engineering', status: 'active' },
    { id: 2, name: 'Priya Thapa', email: 'priya@karyadesk.com', department: 'Design', status: 'active' },
    { id: 3, name: 'Bikash Gurung', email: 'bikash@karyadesk.com', department: 'Marketing', status: 'leave' },
    { id: 4, name: 'Sneha Karki', email: 'sneha@karyadesk.com', department: 'Engineering', status: 'active' },
    { id: 5, name: 'Rajesh Adhikari', email: 'rajesh@karyadesk.com', department: 'Sales', status: 'inactive' },
]

const recentTasks = [
    { id: 1, title: 'Update employee onboarding docs', status: 'done', assignee: 'Aarav' },
    { id: 2, title: 'Review Q4 performance data', status: 'pending', assignee: 'Priya' },
    { id: 3, title: 'Fix login page bug', status: 'pending', assignee: 'Bikash' },
    { id: 4, title: 'Prepare monthly report', status: 'done', assignee: 'Sneha' },
    { id: 5, title: 'Schedule team meeting', status: 'pending', assignee: 'Rajesh' },
]

const statusLabel = { active: 'Active', leave: 'On Leave', inactive: 'Inactive' }

const employeeColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department' },
    {
        key: 'status',
        label: 'Status',
        render: (row) => <Badge status={row.status}>{statusLabel[row.status]}</Badge>,
    },
]

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                <p className="text-sm text-gray-500 mt-1">Overview of your team and tasks</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>

            {/* Two-column section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent employees — 2/3 width */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader title="Recent Employees" />
                        <Table columns={employeeColumns} data={recentEmployees} />
                    </Card>
                </div>

                {/* Recent tasks — 1/3 width */}
                <Card>
                    <CardHeader title="Recent Tasks" />
                    <ul className="divide-y divide-gray-100">
                        {recentTasks.map((task) => (
                            <li key={task.id} className="px-5 py-3 flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-sm text-gray-800 truncate">{task.title}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{task.assignee}</p>
                                </div>
                                <Badge status={task.status}>
                                    {task.status === 'done' ? 'Done' : 'Pending'}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    )
}