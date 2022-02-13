import axios from "axios";

const api = axios.create({
    // baseURL: 'https://localhost:5001',
    // rodando app do docker
    baseURL: 'http://localhost:44300',
})

export default api;