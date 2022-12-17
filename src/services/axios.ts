import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(ctx?: any) {
    const { 'smartvaga.token': token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:4000',
        headers: {
            "Content-Type": "application/json",
        }
    });

    api.interceptors.request.use(config => {
        // console.log(config);
        return config;
    })

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;
}