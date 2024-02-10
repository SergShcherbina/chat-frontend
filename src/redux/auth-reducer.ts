import {authApi} from "../api/auth-api.ts";
import {InputsType} from "../components/auth/Login.tsx";
import {Dispatch} from "redux";

const initialState = {
    isLoggedIn: false,
    isLoading: true,
    userName: null,
    userId: null
}

export const authReducer = (state: AuthInitState = initialState, action: AuthAT) => {
    switch (action.type) {
        case "AUTH-IS-LOGGED-IN":
            return {
                ...state, isLoggedIn: action.payload
            }
        case "AUTH-IS-LOADING":
            return {
                ...state, isLoading: action.payload
            }
        case "AUTH-SET-USER":
            return {
                ...state, userName: action.payload.userName, userId: action.payload.userId
            }
        default: {
            return state
        }
    }
}

export const isLoggedInAC = (isLogged: boolean) => {
    return {
        type: "AUTH-IS-LOGGED-IN",
        payload: isLogged
    } as const
}
const isLoadingAC = (isLoading: boolean) => {
    return {
        type: "AUTH-IS-LOADING",
        payload: isLoading
    } as const
}
const setUserAC = ({userName, userId}: {userName: string, userId: string}) => {
    return {
        type: "AUTH-SET-USER",
        payload: {userName, userId}
    } as const
}

export const loginTC = (userData: InputsType) => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await authApi.login(userData)
            dispatch(setUserAC({userName: res.username, userId: res.id}))
            localStorage.setItem('session', res.token)
            dispatch(isLoggedInAC(true))
        } catch (e: any) {
            console.log('Error loginTC:', e)
            return e?.response.data
        }
    }
};

export const signUpTC = (signUpData: InputsType) => async () => {
    try {
        const res =  await authApi.signUp(signUpData)
        console.log('signUpTC:', res)
        return res
    } catch (e: any) {
        console.log('signUpTC:', e)
        return e?.response.data
    }
}

export const meTC = () => async (dispatch: Dispatch) => {
    dispatch(isLoadingAC(true))
    try{
        const res = await authApi.me()
        console.log('meTC:', res)
        dispatch(isLoggedInAC(true))
        dispatch(setUserAC({userName: res.userName, userId: res.id}))
    } catch(e){
        console.log('Error meTC:', e)
    } finally {
        dispatch(isLoadingAC(false))
    }
}

type IsLoggedInAT = ReturnType<typeof isLoggedInAC>
type IsLoadingAT = ReturnType<typeof isLoadingAC>
type SetUserAT = ReturnType<typeof setUserAC>

type AuthAT = IsLoggedInAT | IsLoadingAT | SetUserAT

type AuthInitState = {
    isLoggedIn: boolean
    isLoading: boolean
    userName: string | null,
    userId: string | null
}