import axios from 'axios'

export const apiAuth = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
});

export const apiPost = axios.create({
    baseURL: 'http://localhost:5000/api/post',
    headers: {
        Authorization: localStorage.getItem("accessToken")
    }
})
