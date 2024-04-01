import {io, Socket} from 'socket.io-client';
import {UserType} from "../redux";

const URL = 'http://localhost:3000' || 'https://chat-backend-git-main-sergshcherbina.vercel.app/'
const userId = localStorage && localStorage.getItem("chatUserId")

export const chatApi = {
    socket: null as null | Socket,

     createConnection() {
         this.socket = io(URL, {
            autoConnect: true,
            reconnection: true,
            query: {userId}
        });
    },
    subscribe(
        setRoomsHandler: (userRooms: UserRoomType[]) => void,
        firstConnectToRoomHandler: (responseJoinObj: ResponseFirstConnectType) => void,
        messageHandler: (obj: { message: string }) => void,
        connectToRoomHandler: (responseConnectObj: ResponseConnectType) => void,
        setCountUsersToRoomHandler:(countUsersToRoom: number) => void,
        setFoundUserRooms: (foundUserRooms: UserRoomType[]) => void
    ) {
        this.socket?.on('connection', setRoomsHandler);
        this.socket?.on('firstConnectToRoom', firstConnectToRoomHandler );
        this.socket?.on('sendMessage', messageHandler);
        this.socket?.on("userRooms", setRoomsHandler)
        this.socket?.on("foundUserRooms", setFoundUserRooms)
        this.socket?.on('connectToRoom', connectToRoomHandler)
        this.socket?.on('countUsersToRoom', setCountUsersToRoomHandler)
    },
    disconnect() {
        this.socket?.off('connection');
        this.socket?.off('firstConnectToRoom');
        this.socket?.off('sendMessage');
        this.socket?.off("userRooms")
        this.socket?.off('connectToRoom')
        this.socket?.off('countUsersToRoom')

    },
    createRoom(userData: CreateRoomType, errorCallBack: (errorMessage: string) => void ) {
        this.socket?.emit('createRoom', userData, errorCallBack)
    },
    searchRooms(roomName: string) {
        this.socket?.emit('searchRoom', roomName)
    },
    connectToRoom(userData: CreateRoomType) {
        this.socket?.emit('connectToRoom', userData)
    },
    leaveRoom(data: UserRoomType | UserType) {
        this.socket?.emit('leaveRoom', data)
    }
}


//Types
type CreateRoomType = {
    userName: string | null,
    userId: string | null,
    roomName: string,
}
export type ResponseFirstConnectType = {
    message: string
    userRoom: UserRoomType
}
export type UserRoomType = {
    roomId: string,
    roomName: string
}
export type ResponseConnectType = {
    countUsersToRoom: number,
    userRoom: UserRoomType
}
