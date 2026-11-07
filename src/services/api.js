import axios from 'axios'

const api = axios.create({
    baseURL: 'https://6aeede14a677fe0fc1502226.mockapi.io/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const employeeService = {
    getAll: () => api.get('/employees'),
    getById: (id) => api.get(`/employees/${id}`),
    create: (data) => api.post('/employees', data),
    update: (id, data) => api.put(`/employees/${id}`, data),
    remove: (id) => api.delete(`/employees/${id}`),
}

export default api