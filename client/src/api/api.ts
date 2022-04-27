import axios from 'axios'

export const apiAuth = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/auth',
});

export const apiPost = axios.create({
    baseURL: 'http://localhost:5000/api/post',
})

apiPost.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('accessToken')
    return config
})