import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ResponseConnectType, ResponseFirstConnectType, UserRoomType} from "../../api/chat-api.ts";

const slice = createSlice({
    name: "chat",
    initialState: {
        currentRoomName: '',
        countUsersToRoom: 0,
        userRooms: [],
        messages: [] ,
    } as ChatInitialType,
    reducers: {
        firstConnectToRoom(state, action: PayloadAction<ResponseFirstConnectType>) {
            state.countUsersToRoom = action.payload.countUsersToRoom;
            state.currentRoomName = action.payload.userRoom.roomName;
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
            state.currentRoomName = action.payload.userRoom.roomName;
        },
        setCountUsersToRoom(state, action: PayloadAction<number>) {
            state.countUsersToRoom = action.payload
        }
    }
})

export const chatReducer = slice.reducer;
export const chatActions = slice.actions


//Types
type ChatInitialType = {
    messages: string[]
    currentRoomName: string
    countUsersToRoom: number
    userRooms: UserRoomType[]
}