import { Outlet, NavLink } from 'react-router-dom'

const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/employees', label: 'Employees' },
    { path: '/tasks', label: 'Tasks' },
]

export default function AdminLayout() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-800">Sajilo Admin</h1>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                            end={item.path === '/'}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <p className="text-xs text-gray-400">Logged in as Admin</p>
                </div>
            </aside>

            {/* Right side: top bar + content area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                    <span className="text-sm text-gray-500">Welcome back</span>
                    <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                        Logout
                    </button>
                </header>

                {/* Child page rendering area */}
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}