import {io, Socket} from 'socket.io-client';

const URL = 'http://localhost:3000' || 'https://chat-backend-git-main-sergshcherbina.vercel.app/'

export const chatApi = {
    socket: null as null | Socket,

    createConnection() {
        this.socket = io(URL, {autoConnect: true, reconnection: true});
    },
    subscribe(
        joinToRoomHandler: (obj: { countUsersToRoom: number, activeRoomName: string }) => void,
        messageHandler: (obj: { message: string }) => void
    ) {
        this.socket?.on('joinUserToRoom', messageHandler);
        this.socket?.on('youJoin', messageHandler );
        this.socket?.on('join', joinToRoomHandler );
    },
    disconnect() {
        this.socket?.off('joinUserToRoom');
        this.socket?.off('youJoin');
        this.socket?.off('join');
    },
    createRoom(userData: CreateRoomType, errorCallBack: (errorMessage: string) => void ) {
        this.socket?.emit('createRoom', userData, errorCallBack)
    },
}


//Types
type CreateRoomType = {
    userName: string | null,
    userId: string | null,
    roomName: string,
}