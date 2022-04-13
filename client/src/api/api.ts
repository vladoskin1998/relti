import axios from 'axios'

export const apiPost = axios.create({
    baseURL: 'http://localhost:5000/api/post',
});