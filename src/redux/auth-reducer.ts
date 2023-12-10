import {authApi} from "../api/auth-api.ts";
import {InputsType} from "../components/auth/Login.tsx";
import {Dispatch} from "redux";

const initialState = {
    isLoggedIn: false,
}

export const authReducer = (state: AuthInitState = initialState, action: AuthActions) => {
    switch (action.type) {
        case "AUTH-IS-LOGGED-IN":
            return {
                ...state, isLoggedIn: action.payload
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

type IsLoggedInAT = ReturnType<typeof isLoggedInAC>

type AuthActions = IsLoggedInAT

type AuthInitState = {
    isLoggedIn: boolean
}