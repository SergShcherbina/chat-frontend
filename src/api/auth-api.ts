import axios, {AxiosResponse} from "axios";
import {UserType} from "./types.ts";
import {InputsType} from "../components/auth/Login.tsx";

const token = localStorage && localStorage.getItem('session')

const instance = axios.create({
    baseURL: 'http://localhost:3000/auth',
    headers: {
        'Authorization': `Bearer ${token}`,
    }
});

export const authApi = {
    signUp: async (body: InputsType) => {
        return await instance.post<{message: string}>('/registration', {username: body.email, password: body.password})
    },
    login: async (body: InputsType) => {
        const res =
            await instance.post<{ token: string, body: InputsType }>('/login', {username: body.email, password: body.password})
        return res.data.token
    },
    getUsers: async() => {
        const res: AxiosResponse<UserType, unknown> = await instance.get('/users');
        return res.data;
    }
}
