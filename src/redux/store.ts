import {configureStore} from "@reduxjs/toolkit";
import {chatReducer} from "./chat-reducer.ts";
import {authReducer} from "./auth-reducer.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
    },
})

export type AppStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;