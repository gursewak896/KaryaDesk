import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'

const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/employees', label: 'Employees' },
    { path: '/tasks', label: 'Tasks' },
]

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const closeSidebar = () => setIsSidebarOpen(false)

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Backdrop — mobile only, closes sidebar on click */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed md:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-gray-200 flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
            >
                <div className="h-16 flex flex-col justify-center px-6 border-b border-gray-200">
                    <h1 className="text-lg font-bold text-gray-800 leading-tight">KaryaDesk</h1>
                    <p className="text-xs text-gray-400">Team & Task Management</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={closeSidebar}
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

            {/* Right side: topbar + content */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shrink-0">
                    <div className="flex items-center gap-3">
                        {/* Hamburger — mobile only */}
                        <button
                            className="md:hidden p-2 -ml-2 text-gray-600 hover:text-gray-900"
                            onClick={() => setIsSidebarOpen(true)}
                            aria-label="Open sidebar"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <span className="text-sm text-gray-500">Welcome back</span>
                    </div>
                    <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                        Logout
                    </button>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}