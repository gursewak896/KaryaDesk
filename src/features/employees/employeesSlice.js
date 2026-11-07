import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { employeeService } from '../../services/api'

export const fetchEmployees = createAsyncThunk(
    'employees/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await employeeService.getAll()
            return response.data
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to fetch employees')
        }
    }
)

const initialState = {
    list: [],
    loading: false,
    error: null,
    filters: {
        search: '',
        department: 'all',
        status: 'all',
    },
}

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            const { key, value } = action.payload
            state.filters[key] = value
        },
        clearFilters: (state) => {
            state.filters = { search: '', department: 'all', status: 'all' }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { setFilter, clearFilters } = employeesSlice.actions
export default employeesSlice.reducer

// Selectors
export const selectEmployees = (state) => state.employees.list
export const selectEmployeesLoading = (state) => state.employees.loading
export const selectEmployeesError = (state) => state.employees.error
export const selectFilters = (state) => state.employees.filters