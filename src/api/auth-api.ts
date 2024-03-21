import axios, {AxiosResponse} from "axios";
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
    login: async (body: InputsType)  => {
        const res=
            await instance.post<ResponseLoginType>('/login', {username: body.email, password: body.password})
        return res.data
    },
    getUsers: async() => {
        const res: AxiosResponse<any, unknown> = await instance.get('/users');
        return res.data;
    },
    me: async (): Promise<ResponseMeType> => {
        const res: AxiosResponse<ResponseMeType> = await instance.get('/me');
        return res.data
    }
}


export type ResponseLoginType = {
    token: string,
    username: string,
    userId: string
}

export type ResponseMeType = {
    message: string,
    userName: string,
    userId: string
}