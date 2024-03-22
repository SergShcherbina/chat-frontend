import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login, me} from "./auth-thunks.ts";

const initialState: AuthInitStateType = {
    isLoggedIn: false,
    isLoading: true,
    userName: null,
    userId: null,
    errors: [],
};

const slice = createSlice({
        name: "auth",
        initialState,
        reducers: {
            isLoggedIn(state, action: PayloadAction<boolean>) {
                state.isLoggedIn = action.payload
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(login.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(login.fulfilled, (state, action) => {
                    state.userName = action.payload.userName;
                    state.isLoggedIn = true;
                    state.isLoading = false;
                })
            builder
                .addCase(me.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(me.fulfilled, (state, action: PayloadAction<UserType>) => {
                    state.userName = action.payload.userName;
                    state.userId = action.payload.userId;
                    state.isLoggedIn = true;
                    state.isLoading = false;
                });
            builder
                .addMatcher(
                    (action)  => action.type.endsWith('/pending'),
                    (state) => {
                        state.errors = []
                    })
                .addMatcher(
                    (action)  => action.type.endsWith('/rejected'),
                    (state, action: PayloadAction<string>) => {
                        state.errors.push(action.payload)
                        state.isLoading = false;
                        console.log("state.errors:",state.errors)
                    })
    }
});

export const authReducer = slice.reducer
export const {isLoggedIn} = slice.actions

//Types
type AuthInitStateType = {
    isLoggedIn: boolean,
    isLoading: boolean,
    userName: string | null,
    userId: string | null
    errors: string[]
}

export type UserType = {
    userName: string,
    userId: string
}