import {combineReducers, applyMiddleware, createStore, AnyAction} from 'redux'
import { chatReducer } from './chatReducer.ts'
import thunk, {ThunkDispatch} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
    chat: chatReducer,
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
)

export type AppStateType = ReturnType <typeof store.getState>
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AnyAction>;

