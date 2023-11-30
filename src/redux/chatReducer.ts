import {Dispatch} from "redux"
import {api} from "../api/chat-api.ts";
import {MessageType, UserType} from "../components/messages-list/MessagesList.tsx";

const initialState = {
    messages: [] as MessageType[],
    userName: '',
    userWrites: [],
    userId: '',
    room: '',
    countUsersRoom: '0'
};

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
        case "SET-USER-ID":
            return {
                ...state, userId: action.payload
            }
        case 'SET-COUNT-USERS':
            return {
                ...state, countUsersRoom: action.payload
            }
        case 'ADD-JOIN-MESSAGE':
            return {
                ...state, messages: [...state.messages,
                    {message: action.payload, id: '555', user: {id: '555', name: 'Admin', room: ''}}],
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
const setUserIdAC = (userId: string) => {
    return {
        type: 'SET-USER-ID',
        payload: userId,
    } as const
}
const setCounterUsersAC = (count: string) => {
    return {
        type: 'SET-COUNT-USERS',
        payload: count,
    } as const
}
const addJoinMessageAC = (message: string) => {
    return {
        type: 'ADD-JOIN-MESSAGE',
        payload: message,
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
            (userId: string) => {
                dispatch(setUserIdAC(userId))
            },
            ({countUsersRoom, message}) => {
                dispatch(setCounterUsersAC(countUsersRoom))
                dispatch(addJoinMessageAC(message))
            }
        )
    }
}

export const disconnectionTC = () => () => {
    api.disconnect()
};

export const sendMessageTC = (textMessage: string, room: string) => () => {
    const errorCallBack = (errorMessage: string) => {
        alert(errorMessage)
    }
    api.sendMessage({textMessage, room}, errorCallBack)
};

export const sendUserNameTC = (userName: string, room: string) => () => {
    api.sendUserName(userName, room)
};

export const writesMessageTC = (roomValue: string) => () => {
    api.writesMessage(roomValue)

};

//types
type AddMessageAT = ReturnType<typeof addMessageAC>
type SetMessagesAT = ReturnType<typeof setMessagesAC>
type WritesMessagesAT = ReturnType<typeof writesMessagesAC>
type SetUserIdAT = ReturnType<typeof setUserIdAC>
type SetCounterUsersAT = ReturnType<typeof setCounterUsersAC>
type AddJoinMessageAT = ReturnType<typeof addJoinMessageAC>

type ChatInitialType = {
    messages: MessageType[]
    userName: string
    userWrites: Array<UserType>
    userId: string
    room: string
    countUsersRoom: string
}

type ChatActionType =
    SetMessagesAT
    | AddMessageAT
    | WritesMessagesAT
    | SetUserIdAT
    | SetCounterUsersAT
    | AddJoinMessageAT;

