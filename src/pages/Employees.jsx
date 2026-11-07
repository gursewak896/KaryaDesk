import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchEmployees,
    selectEmployees,
    selectEmployeesLoading,
    selectEmployeesError,
    selectFilters,
    setFilter,
    clearFilters,
} from '../features/employees/employeesSlice'
import Card, { CardHeader } from '../components/Card'
import Table from '../components/Table'
import Badge from '../components/Badge'
import Input from '../components/Input'
import Select from '../components/Select'
import Button from '../components/Button'
import Skeleton from '../components/Skeleton'

const statusLabel = { active: 'Active', leave: 'On Leave', inactive: 'Inactive' }

const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department' },
    { key: 'role', label: 'Role' },
    {
        key: 'status',
        label: 'Status',
        render: (row) => (
            <Badge status={row.status}>{statusLabel[row.status] || row.status}</Badge>
        ),
    },
]

const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Design', label: 'Design' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
]

const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'leave', label: 'On Leave' },
    { value: 'inactive', label: 'Inactive' },
]

export default function Employees() {
    const dispatch = useDispatch()
    const employees = useSelector(selectEmployees)
    const loading = useSelector(selectEmployeesLoading)
    const error = useSelector(selectEmployeesError)
    const filters = useSelector(selectFilters)

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [dispatch])

    const filtered = useMemo(() => {
        return employees.filter((emp) => {
            const matchesSearch =
                !filters.search ||
                emp.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
                emp.email?.toLowerCase().includes(filters.search.toLowerCase())
            const matchesDept =
                filters.department === 'all' || emp.department === filters.department
            const matchesStatus =
                filters.status === 'all' || emp.status === filters.status
            return matchesSearch && matchesDept && matchesStatus
        })
    }, [employees, filters])

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {filtered.length} of {employees.length} employees
                    </p>
                </div>
                <Button variant="secondary" onClick={() => dispatch(clearFilters())}>
                    Clear Filters
                </Button>
            </div>

            <Card className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                        placeholder="Search by name or email..."
                        value={filters.search}
                        onChange={(e) =>
                            dispatch(setFilter({ key: 'search', value: e.target.value }))
                        }
                    />
                    <Select
                        options={departmentOptions}
                        value={filters.department}
                        onChange={(e) =>
                            dispatch(setFilter({ key: 'department', value: e.target.value }))
                        }
                    />
                    <Select
                        options={statusOptions}
                        value={filters.status}
                        onChange={(e) =>
                            dispatch(setFilter({ key: 'status', value: e.target.value }))
                        }
                    />
                </div>
            </Card>

            <Card>
                <CardHeader title="All Employees" />
                {loading && (
                    <div className="p-5 space-y-3">
                        {[...Array(8)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                )}
                {error && (
                    <div className="p-5 text-center">
                        <p className="text-sm text-red-600 mb-2">{error}</p>
                        <Button variant="secondary" onClick={() => dispatch(fetchEmployees())}>
                            Retry
                        </Button>
                    </div>
                )}
                {!loading && !error && (
                    <Table columns={columns} data={filtered} emptyMessage="No employees match your filters." />
                )}
            </Card>
        </div>
    )
}