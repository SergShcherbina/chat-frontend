import {authApi, ResponseMeType} from "../api/auth-api.ts";
import {InputsType} from "../components/auth/Login.tsx";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: AuthInitStateType = {
    isLoggedIn: false,
    isLoading: true,
    userName: null,
    userId: null,
}

const slice = createSlice({
        name: "auth",
        initialState,
        reducers: {
            isLoggedInAC(state, action: PayloadAction<boolean>) {
                state.isLoggedIn = action.payload
            },
            isLoadingAC(state, action: PayloadAction<boolean>){
                state.isLoading = action.payload
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(login.fulfilled, (state, action) => {
                state.userName = action.payload.userName
            })
            builder
                .addCase(me.fulfilled, (state, action) => {
                state.userName = action.payload.userName
                state.userId = action.payload.userId
            })
    }
});

export const authReducer = slice.reducer
export const { isLoggedInAC, isLoadingAC } = slice.actions



export const signUp = createAsyncThunk<void, InputsType>("auth/signUp",
    async (signUpData: InputsType, {dispatch, rejectWithValue}) => {
    dispatch(isLoadingAC(true))
        try{
            await authApi.login(signUpData)
            return
        } catch (e: any) {
            console.log('signUpTC:', e)
            return rejectWithValue(e && e.response.data)
        } finally {
            dispatch(isLoadingAC(false))
        }
    }
);

export const login = createAsyncThunk<{userName: string}, InputsType>(
    "auth/login",
    async (userData: InputsType , {dispatch, rejectWithValue}) => {
        dispatch(isLoadingAC(true))
        try {
            const response = await authApi.login(userData)
            dispatch(isLoggedInAC(true))
            localStorage.setItem('session', response.token)
            return {userName: response.username}
        } catch (e: any) {
            console.log('Error loginTC:', e)
            return rejectWithValue(e && e.response.data)
        } finally {
            dispatch(isLoadingAC(false))
        }
    }
);

export const me = createAsyncThunk<UserType, void>("auth/me",
    async (_void, {dispatch, rejectWithValue}) => {
        dispatch(isLoadingAC(true))
        try{
            const { userName, userId }: ResponseMeType = await authApi.me()
            dispatch(isLoggedInAC(true))
            return {userName, userId}
        } catch (e: any) {
            console.log('Error meTC:', e)
            return rejectWithValue(e && e.response.data)
        } finally {
            dispatch(isLoadingAC(false))
        }
    }
);


type AuthInitStateType = {
    isLoggedIn: boolean,
    isLoading: boolean,
    userName: string | null,
    userId: string | null
}

export type UserType = {
    userName: string,
    userId: string
}