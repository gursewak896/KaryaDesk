import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
    selectEmployeeById,
    deleteEmployee,
} from '../features/employees/employeesSlice'
import Card, { CardHeader } from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import Modal from '../components/Modal'
import useToast from '../hooks/useToast'
import Toast from '../components/Toast'

const statusLabel = { active: 'Active', leave: 'On Leave', inactive: 'Inactive' }

export default function EmployeeDetail() {
    const { toast, showToast, closeToast } = useToast()
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const employee = useSelector(selectEmployeeById(id))
    const [confirmOpen, setConfirmOpen] = useState(false)

    if (!employee) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Employee not found.</p>
                <Link to="/employees" className="text-blue-600 hover:underline">
                    ← Back to Employees
                </Link>
            </div>
        )
    }

    const handleDelete = async () => {
        await dispatch(deleteEmployee(employee.id))
        showToast('Employee deleted')
        setTimeout(() => navigate('/employees'), 500)
    }

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <Link to="/employees" className="text-sm text-blue-600 hover:underline">
                ← Back to Employees
            </Link>

            <Card>
                <CardHeader
                    title="Employee Profile"
                    action={
                        <div className="flex gap-2">
                            <Link to={`/employees/${employee.id}/edit`}>
                                <Button variant="secondary">Edit</Button>
                            </Link>
                            <Button variant="danger" onClick={() => setConfirmOpen(true)}>
                                Delete
                            </Button>
                        </div>
                    }
                />
                <div className="p-5 space-y-4">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Name</p>
                        <p className="text-lg font-semibold text-gray-800">{employee.name}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                            <p className="text-sm text-gray-800">{employee.email}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Department</p>
                            <p className="text-sm text-gray-800">{employee.department}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Role</p>
                            <p className="text-sm text-gray-800">{employee.role}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide">Status</p>
                            <Badge status={employee.status}>
                                {statusLabel[employee.status] || employee.status}
                            </Badge>
                        </div>
                    </div>
                </div>
            </Card>

            <Modal
                open={confirmOpen}
                title="Delete Employee?"
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDelete}
                confirmText="Delete"
                confirmVariant="danger"
            >
                Are you sure you want to delete <strong>{employee.name}</strong>? This cannot be undone.
            </Modal>
            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={closeToast} />
            )}
        </div>
    )
}