import {combineReducers, applyMiddleware, createStore, AnyAction} from 'redux'
import {chatReducer} from './chat-reducer.ts'
import thunk, {ThunkDispatch} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';
import {authReducer} from "./auth-reducer.ts";

const rootReducer = combineReducers({
    chat: chatReducer,
    auth: authReducer,
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
)

export type AppStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AnyAction>;
