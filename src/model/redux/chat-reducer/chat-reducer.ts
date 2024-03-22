import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "chat",
    initialState: {
        messages: [] ,
        activeRoomName: '',
        countUsersToRoom: 0
    } as ChatInitialType,
    reducers: {
        setRoomInfo(state, action: PayloadAction<{countUsersToRoom: number, activeRoomName: string}> ) {
            state.countUsersToRoom = action.payload.countUsersToRoom
            state.activeRoomName = action.payload.activeRoomName
            debugger
        },
        addMessageJoining(state, action: PayloadAction<string>) {
            state.messages.push(action.payload)
        }
    }
})

export const chatReducer = slice.reducer;
export const chatActions = slice.actions


//Types
type ChatInitialType = {
    messages: string[]
    activeRoomName: string
    countUsersToRoom: number
}