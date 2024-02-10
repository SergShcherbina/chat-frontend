import {authApi} from "../api/auth-api.ts";
import {InputsType} from "../components/auth/Login.tsx";
import {Dispatch} from "redux";

const initialState = {
    isLoggedIn: false,
    isLoading: true,
}

export const authReducer = (state: AuthInitState = initialState, action: AuthActions) => {
    switch (action.type) {
        case "AUTH-IS-LOGGED-IN":
            return {
                ...state, isLoggedIn: action.payload
            }
        case "AUTH-IS-LOADING":
            return {
                ...state, isLoading: action.payload
            }
        default: {
            return state
        }
    }
}

const isLoggedInAC = (isLogged: boolean) => {
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

export const loginTC = (userData: InputsType) => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await authApi.login(userData)
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
        console.log('meTC:', res.users)
        dispatch(isLoggedInAC(true))
    } catch(e){
        console.log('Error meTC:', e)
    } finally {
        dispatch(isLoadingAC(false))
    }

}

type IsLoggedInAT = ReturnType<typeof isLoggedInAC>
type IsLoadingAT = ReturnType<typeof isLoadingAC>

type AuthActions = IsLoggedInAT | IsLoadingAT

type AuthInitState = {
    isLoggedIn: boolean
    isLoading: boolean
}