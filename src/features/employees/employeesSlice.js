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

export const createEmployee = createAsyncThunk(
    'employees/create',
    async (data, { rejectWithValue }) => {
        try {
            const response = await employeeService.create(data)
            return response.data
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to create employee')
        }
    }
)

export const updateEmployee = createAsyncThunk(
    'employees/update',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await employeeService.update(id, data)
            return response.data
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to update employee')
        }
    }
)

export const deleteEmployee = createAsyncThunk(
    'employees/delete',
    async (id, { rejectWithValue }) => {
        try {
            await employeeService.remove(id)
            return id
        } catch (err) {
            return rejectWithValue(err.message || 'Failed to delete employee')
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
            // fetch
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
            // create
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.list.push(action.payload)
            })
            // update
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.list.findIndex((e) => e.id === action.payload.id)
                if (index !== -1) state.list[index] = action.payload
            })
            // delete
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.list = state.list.filter((e) => e.id !== action.payload)
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
export const selectEmployeeById = (id) => (state) =>
    state.employees.list.find((e) => e.id === id)