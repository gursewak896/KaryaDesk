import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('karyadesk_user')

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: storedUser ? true : false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
            localStorage.setItem('karyadesk_user', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
            localStorage.removeItem('karyadesk_user')
        },
    },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

// Selectors
export const selectUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated