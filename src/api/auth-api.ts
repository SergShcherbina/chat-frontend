import axios, {AxiosResponse} from "axios";
import {UserAuthType, UserType} from "./types.ts";
import {InputsType} from "../components/auth/Login.tsx";

const token = localStorage && localStorage.getItem('session')

const instance = axios.create({
    baseURL: 'http://localhost:3000/auth',
    headers: {
        'Authorization': `Bearer ${token}`,
    }
});

export const authApi = {
    signUp: async (body: UserAuthType) => {
        const res: AxiosResponse<{message: string}, UserAuthType> =  await instance.post('/registration', body)
        return res
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
