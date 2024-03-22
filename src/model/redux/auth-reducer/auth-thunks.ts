import {createAsyncThunk} from "@reduxjs/toolkit";
import {InputsType} from "../../../ui/pages/auth";
import {authApi, ResponseMeType} from "../../api/auth-api.ts";
import { UserType} from "./auth-reducer.ts";
import {isAxiosError} from "axios";


export const signUp =
    createAsyncThunk<{message: string}, InputsType, {rejectValue: RejectValueType}>(
    "auth/signUp",
    async (signUpData: InputsType, {rejectWithValue}) => {
        try{
            const response = await authApi.signUp(signUpData)
            return response.data
        } catch (e) {
            if(isAxiosError(e))  {
                const errorMessage = e.message || e.response?.data.errors[0]
                return rejectWithValue(errorMessage)
            } else if(e instanceof Error){
                return rejectWithValue(e.message)
            } else {
                return rejectWithValue("Some error occurred in signUp")
            }
        }
    }
);

export const login =
    createAsyncThunk<{userName: string}, InputsType, {rejectValue: RejectValueType}>(
    "auth/login",
    async (userData: InputsType , {rejectWithValue}) => {
        try {
            const response = await authApi.login(userData)
            localStorage.setItem('session', response.token)
            return {userName: response.username}
        } catch (e) {
            if(isAxiosError(e)){
                const errorMessage = e.message || e.response?.data.errors[0]
                return rejectWithValue(errorMessage)
            } else if(e instanceof Error){
                return rejectWithValue(e.message)
            } else {
                return rejectWithValue("Some error occurred in login")
            }
        }
    }
);

export const me =
    createAsyncThunk<UserType, void, {rejectValue: RejectValueType}>(
    "auth/me",
    async (_void, {rejectWithValue}) => {
        try{
            const { userName, userId }: ResponseMeType = await authApi.me()
            return {userName, userId} as UserType
        } catch (e) {
            if(isAxiosError(e))  {
                const errorMessage = e.message || e.response?.data.errors[0]
                return rejectWithValue(errorMessage)
            } else if(e instanceof Error){
                return rejectWithValue(e.message)
            } else {
                return rejectWithValue("Some error occurred in me")
            }
        }
    }
);


// Types
export type RejectValueType =  string