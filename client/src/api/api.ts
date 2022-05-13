import axios from 'axios'
import { baseURL } from '../config'

export const apiAuth = axios.create({
    withCredentials: true,
    baseURL: `${baseURL}/api/auth`,
});

export const api = axios.create({
    baseURL: `${baseURL}/api`,
})



api.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('accessToken')
    return config
})

api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        await axios.post(`${baseURL}/api/auth/refresh`, {}, { withCredentials: true, })
            .then((res) => {
                localStorage.setItem('accessToken', res.data.accessToken);
            })
            .catch(e => {
                console.log(e)
            })

        return api.request(originalRequest);
    }
    document.location.replace(`${baseURL}/auth`);
    localStorage.removeItem('accessToken')
})