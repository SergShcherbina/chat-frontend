import axios, {AxiosResponse} from "axios";
import {UserAuthType, UserType} from "./types.ts";

const token = ''

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
    login: async (body: UserAuthType) => {
        const res: AxiosResponse<{ token: string }, UserAuthType> =
            await instance.post('/login', body)
        console.log(res)
        return res
    },
    getUsers: async() => {
        const res: AxiosResponse<UserType, unknown> = await instance.get('/users');
        return res.data;
    }
}