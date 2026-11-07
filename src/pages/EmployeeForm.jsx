import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
    createEmployee,
    updateEmployee,
    selectEmployeeById,
    fetchEmployees,
} from '../features/employees/employeesSlice'
import Card, { CardHeader } from '../components/Card'
import Input from '../components/Input'
import Select from '../components/Select'
import Button from '../components/Button'

const departmentOptions = [
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Design', label: 'Design' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
]

const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'leave', label: 'On Leave' },
    { value: 'inactive', label: 'Inactive' },
]

const emptyForm = {
    name: '',
    email: '',
    department: 'Engineering',
    role: '',
    status: 'active',
}

export default function EmployeeForm() {
    const { id } = useParams()
    const isEdit = Boolean(id)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const existing = useSelector(selectEmployeeById(id))

    const [form, setForm] = useState(emptyForm)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    // On edit: prefill from Redux (or fetch if empty)
    useEffect(() => {
        if (isEdit) {
            if (existing) {
                setForm({
                    name: existing.name || '',
                    email: existing.email || '',
                    department: existing.department || 'Engineering',
                    role: existing.role || '',
                    status: existing.status || 'active',
                })
            } else {
                dispatch(fetchEmployees())
            }
        } else {
            setForm(emptyForm)
        }
    }, [isEdit, existing, dispatch])

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }))
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
    }

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.email.trim()) e.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email format'
        if (!form.role.trim()) e.role = 'Role is required'
        return e
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const eObj = validate()
        if (Object.keys(eObj).length > 0) {
            setErrors(eObj)
            return
        }
        setSubmitting(true)
        try {
            if (isEdit) {
                await dispatch(updateEmployee({ id, data: form })).unwrap()
            } else {
                await dispatch(createEmployee(form)).unwrap()
            }
            navigate('/employees')
        } catch (err) {
            setErrors({ submit: err })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">
                    {isEdit ? 'Edit Employee' : 'Add Employee'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    {isEdit ? 'Update the employee details below' : 'Fill in the details to add a new employee'}
                </p>
            </div>

            <Card>
                <CardHeader title={isEdit ? 'Employee Details' : 'New Employee'} />
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    <Input
                        label="Full Name"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        error={errors.name}
                        placeholder="e.g. Aarav Sharma"
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        error={errors.email}
                        placeholder="e.g. aarav@karyadesk.com"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select
                            label="Department"
                            options={departmentOptions}
                            value={form.department}
                            onChange={(e) => handleChange('department', e.target.value)}
                        />
                        <Input
                            label="Role"
                            value={form.role}
                            onChange={(e) => handleChange('role', e.target.value)}
                            error={errors.role}
                            placeholder="e.g. Frontend Developer"
                        />
                    </div>
                    <Select
                        label="Status"
                        options={statusOptions}
                        value={form.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                    />

                    {errors.submit && (
                        <p className="text-sm text-red-600">{errors.submit}</p>
                    )}

                    <div className="flex gap-3 pt-2">
                        <Button type="submit" disabled={submitting}>
                            {submitting ? 'Saving...' : isEdit ? 'Update Employee' : 'Create Employee'}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => navigate('/employees')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    )
}