import Card, { CardHeader } from '../components/Card'
import StatCard from '../components/StatCard'
import Table from '../components/Table'
import Badge from '../components/Badge'
import Skeleton from '../components/Skeleton'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchEmployees,
    selectEmployees,
    selectEmployeesLoading,
    selectEmployeesError,
} from '../features/employees/employeesSlice'

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
        render: (row) => (
            <Badge status={row.status}>{statusLabel[row.status] || row.status}</Badge>
        ),
    },
]

export default function Dashboard() {
    const dispatch = useDispatch()

    // 1. Read from Redux FIRST
    const employees = useSelector(selectEmployees)
    const loading = useSelector(selectEmployeesLoading)
    const error = useSelector(selectEmployeesError)

    // 2. Then dispatch the fetch
    useEffect(() => {
        // Only fetch if we don't have data yet (Dashboard may load first)
        if (employees.length === 0) {
            dispatch(fetchEmployees())
        }
    }, [dispatch, employees.length])

    // 3. THEN derive values from employees
    const stats = useMemo(() => {
        const departments = new Set(employees.map((e) => e.department).filter(Boolean))
        const active = employees.filter((e) => e.status === 'active').length
        const onLeave = employees.filter((e) => e.status === 'leave').length
        return [
            { label: 'Total Employees', value: employees.length, icon: '👥' },
            { label: 'Active', value: active, icon: '✅' },
            { label: 'On Leave', value: onLeave, icon: '🌴' },
            { label: 'Departments', value: departments.size, icon: '🏢' },
        ]
    }, [employees])

    // Show only the 5 most recent
    const recentEmployees = employees ? employees.slice(0, 5) : []

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                <p className="text-sm text-gray-500 mt-1">Overview of your team and tasks</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader title="Recent Employees" />
                        {loading && (
                            <div className="p-5 space-y-3">
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className="h-10 w-full" />
                                ))}
                            </div>
                        )}
                        {error && (
                            <div className="p-5 text-center">
                                <p className="text-sm text-red-600 mb-2">Failed to load employees: {error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Retry
                                </button>
                            </div>
                        )}
                        {!loading && !error && (
                            <Table columns={employeeColumns} data={recentEmployees} />
                        )}
                    </Card>
                </div>

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