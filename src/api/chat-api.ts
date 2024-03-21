import {io, Socket} from 'socket.io-client';
// import {UserType} from "../redux/auth-reducer.ts";

const URL = 'http://localhost:3000' || 'https://chat-backend-git-main-sergshcherbina.vercel.app/'

export const api = {
    socket: null as null | Socket,
    createConnection() {
        this.socket = io(URL, {autoConnect: true, reconnection: true});
    },
    subscribe(
        // addMessage: (message: any) => void,
        // setMessages: (messages: any) => void,
        // userWrites: (user: UserType) => void,
        // setUserId: (userId: string) => void,
        joinToRoomHandler: (obj: { countUsersToRoom: number, activeRoomName: string }) => void,
        messageHandler: (obj: { message: string }) => void
    ) {
        // this.socket?.on('new-message-send', addMessage );
        // this.socket?.on('init-messages-published', setMessages);
        // this.socket?.on('writes', userWrites)
        // this.socket?.on('set-userId', setUserId);
        this.socket?.on('joinUserToRoom', messageHandler);
        this.socket?.on('youJoin', messageHandler );
        this.socket?.on('join', joinToRoomHandler );
    },
    disconnect() {
        this.socket?.off('init-messages-published');
        this.socket?.off('new-message-send');
        this.socket?.off('joinUserToRoom');
        this.socket?.off('youJoin');
        this.socket?.off('join');
    },
    // sendMessage(obj: { textMessage: string, room: string }, errorCallBack: (errorMessage: string) => void) {
    //     this.socket?.emit('client-message-send', obj, errorCallBack)
    // },
    createRoom(userData: CreateRoomType, errorCallBack: (errorMessage: string) => void ) {
        this.socket?.emit('createRoom', userData, errorCallBack)
    },
    // writesMessage(roomValue: string) {
    //     this.socket?.emit('writes', roomValue)
    // },


}


type CreateRoomType = {
    userName: string | null,
    userId: string | null,
    roomName: string,
}