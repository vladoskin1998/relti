import axios from 'axios'

export const apiAuth = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/auth',
});

export const api = axios.create({
    baseURL: 'http://localhost:5000/api',
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
        await axios.post('http://localhost:5000/api/auth/refresh', {}, {withCredentials: true,})
            .then((res) => {
                localStorage.setItem('accessToken', res.data.accessToken);
            })
            .catch(e => {
                document.location.replace("http://localhost:3000/auth");
                localStorage.removeItem('accessToken')
                console.log(e)
            })

        return api.request(originalRequest);
    }

})