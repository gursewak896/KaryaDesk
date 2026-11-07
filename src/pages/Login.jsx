import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, selectIsAuthenticated } from '../features/auth/authSlice'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector(selectIsAuthenticated)

    // If already logged in, redirect
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true })
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !password) {
            setError('Email and password are required')
            return
        }
        if (password !== '1234') {
            setError('Invalid password. Use: 1234')
            return
        }
        dispatch(login({ email, name: email.split('@')[0] }))
        navigate('/', { replace: true })
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-sm p-6">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">KaryaDesk</h1>
                    <p className="text-sm text-gray-500 mt-1">Sign in to your dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Use: 1234"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-xs text-red-600">{error}</p>}
                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </form>

                <p className="text-xs text-gray-400 text-center mt-4">
                    Demo: any email + password <strong>1234</strong>
                </p>
            </Card>
        </div>
    )
}