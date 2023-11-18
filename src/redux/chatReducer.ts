import {Dispatch} from "redux"
import {MessageType, UserType} from "../App"
import {api} from "../api/chat-api.ts";

const initialState = {
    messages: [] as MessageType[],
    userName: 'noname',
    userWrites: []
}

export const chatReducer = (state: ChatInitialType = initialState, action: ChatActionType): ChatInitialType => {
    switch (action.type) {
        case "SET-MESSAGES":
            return {
                ...state, messages: action.payload
            }
        case "ADD-MESSAGE":
            return {
                ...state,
                messages: [...state.messages, action.payload],
                userWrites: state.userWrites.filter(u => u.id !== action.payload.user.id)

            }
        case "SET-WRITES-USER":
            return {
                ...state, userWrites: [...state.userWrites.filter(u => u.id !== action.payload.id), action.payload]
            }
        default:
            return {...state}
    }
}

//actions
const setMessagesAC = (messages: MessageType[]) => {
    return {
        type: "SET-MESSAGES",
        payload: messages
    } as const
}
const addMessageAC = (message: MessageType) => {
    return {
        type: "ADD-MESSAGE",
        payload: message
    } as const
}

const writesMessagesAC = (user: UserType) => {
    return {
        type: "SET-WRITES-USER",
        payload: user
    } as const
}

//thunks
export const connectionTC = () => {
    return (dispatch: Dispatch) => {
        api.createConnection();
        api.subscribe(
            (message: MessageType) => {
                dispatch(addMessageAC(message))
            },
            (messages: MessageType[]) => {
                dispatch(setMessagesAC(messages))
            },
            (user: UserType) => {
                dispatch(writesMessagesAC(user))
            },
        )
    }
}

export const disconnectionTC = () => () => {
    api.disconnect()
}

export const sendMessageTC = (textMessage: string) => () => {
    const errorCallBack = (errorMessage: string)=> {
       alert(errorMessage)
    }
    api.sendMessage(textMessage, errorCallBack)
}

export const sendUserNameTC = (userName: string) => () => {
    api.sendUserName(userName)
}

export const writesMessageTC = () => () => {
    api.writesMessage()
}

//types
type AddMessageAT = ReturnType<typeof addMessageAC>
type SetMessagesAT = ReturnType<typeof setMessagesAC>
type WritesMessagesAT = ReturnType<typeof writesMessagesAC>

type ChatInitialType = {
    messages: MessageType[]
    userName: string
    userWrites: Array<UserType>
}

type ChatActionType =
    SetMessagesAT
    | AddMessageAT
    | WritesMessagesAT

