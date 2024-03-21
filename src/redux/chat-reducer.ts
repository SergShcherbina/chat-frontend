import {api} from "../api/chat-api.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppStateType} from "./store.ts";

const sliceChat = createSlice({
    name: "chat",
    initialState: {
        messages: [] ,
        activeRoomName: '',
        countUsersToRoom: 0
    } as ChatInitialType,
    reducers: {
        setRoomInfoAC(state, action: PayloadAction<{countUsersToRoom: number, activeRoomName: string}> ) {
            state.countUsersToRoom = action.payload.countUsersToRoom
            state.activeRoomName = action.payload.activeRoomName
        },
        addMessageJoiningAC(state, action: PayloadAction<string>) {
            state.messages.push(action.payload)
        }
    }
})

export const chatReducer = sliceChat.reducer;
export const chatActions = sliceChat.actions


export const connectionTC = createAsyncThunk(
    "chat/connection", async ( _void , thunkAPI) =>  {
        try {
            api.createConnection();
            api.subscribe(
            ({countUsersToRoom, activeRoomName}) => {
                thunkAPI.dispatch(chatActions.setRoomInfoAC({countUsersToRoom, activeRoomName}))
            },
            ({message}) => {
                thunkAPI.dispatch(chatActions.addMessageJoiningAC(message))
            })
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
);


export const disconnectionTC = () => () => {
    api.disconnect()
};

export const createRoomTC = createAsyncThunk("chat/createRoom",
    async (roomName: string, { getState, rejectWithValue }) => {
        const errorCallBack = (errorMessage: string) => {
            alert(errorMessage)
        }
        try {
            const {userName, userId} = (getState() as AppStateType).auth
            api.createRoom({userName, roomName, userId}, errorCallBack)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

type ChatInitialType = {
    messages: string[]
    activeRoomName: string
    countUsersToRoom: number
}