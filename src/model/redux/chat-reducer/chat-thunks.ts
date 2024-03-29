import {createAsyncThunk} from "@reduxjs/toolkit";
import {chatApi} from "../../api";
import {AppStateType} from "../store.ts";
import {chatActions} from "./chat-reducer.ts";

export const connectionTC = createAsyncThunk(
    "chat/connection",
    async ( _, thunkAPI) =>  {
        try {
             chatApi.createConnection();
             chatApi.subscribe(
                 ( userRooms ) => {
                     thunkAPI.dispatch(chatActions.setRooms(userRooms))
                 },
                ({ userRoom, message , countUsersToRoom }) => {
                    thunkAPI.dispatch(chatActions.joinToRoom( {userRoom, message, countUsersToRoom } ))
                },
                ({message}) => {
                    thunkAPI.dispatch(chatActions.addMessageJoining(message))
                })

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
           await chatApi.searchRoom(roomName)
        } catch (e) {
            debugger
            return rejectWithValue(e)
        }
    }
);


export const disconnectionTC = () => () => {
    chatApi.disconnect()
};
