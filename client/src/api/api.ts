import axios from 'axios'

export const apiPost = axios.create({
    baseURL: 'http://localhost:5000/api/post',
});

export const apiAuth = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
});