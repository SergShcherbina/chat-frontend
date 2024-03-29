import {createAsyncThunk} from "@reduxjs/toolkit";
import {chatApi} from "../../api";
import {AppStateType} from "../store.ts";
import {chatActions} from "./chat-reducer.ts";
import {UserRoomType} from "../../api/chat-api.ts";

export const connectionTC = createAsyncThunk(
    "chat/connection",
    async ( _, thunkAPI) =>  {
        try {
             chatApi.createConnection();
             chatApi.subscribe(
                 ( userRooms ) => {
                     thunkAPI.dispatch(chatActions.setRooms(userRooms))
                 },
                ({ userRoom, message}) => {
                    thunkAPI.dispatch(chatActions.firstConnectToRoom( {userRoom, message} ))
                },
                ({message}) => {
                    thunkAPI.dispatch(chatActions.addMessageJoining(message))
                },
                 ({countUsersToRoom, userRoom}) => {
                     thunkAPI.dispatch(chatActions.connectToRoom({countUsersToRoom, userRoom}))
                 },
                 (countUsersToRoom) => {
                     thunkAPI.dispatch(chatActions.setCountUsersToRoom(countUsersToRoom))
                 }
             )

            return {countUsersToRoom: 0, activeRoomName: ''}
        } catch (e) {
            debugger
            return thunkAPI.rejectWithValue(e)
        }
    }
);

export const createRoomTC = createAsyncThunk("chat/createRoom",
    async (roomName: string, { getState, rejectWithValue }) => {
        const errorCallBack = (errorMessage: string) => {
            alert(errorMessage)
        }
        try {
            const {userName, userId} = (getState() as AppStateType).auth
            chatApi.createRoom({userName, roomName, userId}, errorCallBack)
        } catch (e) {
            debugger
            return rejectWithValue(e)
        }
    }
);

export const searchRoomTC = createAsyncThunk("chat/searchRoom",
    async (roomName: string, {rejectWithValue }) => {
        try {
           chatApi.searchRooms(roomName)
        } catch (e) {
            debugger
            return rejectWithValue(e)
        }
    }
);

export const connectToRoomTC = createAsyncThunk("chat/joinToRoom",
    async (roomName: string , {rejectWithValue, getState }) => {
        try {
            const{userName, userId} = (getState() as AppStateType).auth
            chatApi.connectToRoom({roomName, userName, userId})
        } catch (e) {
            debugger
            return rejectWithValue(e)
        }
    }
)

export const leaveRoomTC = createAsyncThunk("chat/leaveRoom",
    async ({roomName, roomId}: UserRoomType, {rejectWithValue, getState }) => {
        try {
            const{userName, userId} = (getState() as AppStateType).auth
            chatApi.leaveRoom({roomName, roomId,  userName, userId})
        } catch (e) {
            debugger
            return rejectWithValue(e)
        }
    }
)


export const disconnectionTC = () => () => {
    chatApi.disconnect()
};
