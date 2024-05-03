import axios from 'axios'
import { getAccessToken } from '../auth'

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const serverInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
})

serverInstance.interceptors.request.use(async (config) => {
    const token = await getAccessToken()
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

export default serverInstance
