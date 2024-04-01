import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ResponseConnectType, ResponseFirstConnectType, UserRoomType} from "../../api/chat-api.ts";

const slice = createSlice({
    name: "chat",
    initialState: {
        currentRoom: {roomName: '', roomId: ''},
        countUsersToRoom: 0,
        userRooms: [],
        foundUserRooms: [],
        messages: [] ,
    } as ChatInitialType,
    reducers: {
        firstConnectToRoom(state, action: PayloadAction<ResponseFirstConnectType>) {
            state.currentRoom = action.payload.userRoom
            state.userRooms.unshift(action.payload.userRoom)
            state.messages.push(action.payload.message)
        },
        addMessageJoining(state, action: PayloadAction<string>) {
            state.messages.push(action.payload)
        },
        setRooms(state, action: PayloadAction<UserRoomType[]>) {
            state.userRooms = action.payload
        },
        connectToRoom(state, action: PayloadAction<ResponseConnectType>) {
            state.countUsersToRoom = action.payload.countUsersToRoom;
            state.currentRoom = action.payload.userRoom;
        },
        setCountUsersToRoom(state, action: PayloadAction<number>) {
            state.countUsersToRoom = action.payload
        },
        setFoundUserRooms(state, action: PayloadAction<UserRoomType[]>) {
            state.foundUserRooms = action.payload
        }
    }
})

export const chatReducer = slice.reducer;
export const chatActions = slice.actions


//Types
type ChatInitialType = {
    messages: string[]
    currentRoom: UserRoomType
    countUsersToRoom: number
    userRooms: UserRoomType[]
    foundUserRooms: UserRoomType[]
}