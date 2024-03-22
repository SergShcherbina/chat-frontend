import {io, Socket} from 'socket.io-client';

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
        getAllRoomsHandler: (userRooms: userRoomType[]) => void,
        joinToRoomHandler: (responseJoinObj: ResponseJoinType) => void,
        messageHandler: (obj: { message: string }) => void
    ) {
        this.socket?.on('connection', getAllRoomsHandler);
        this.socket?.on('guestJoinToRom', messageHandler);
        this.socket?.on('joinToRoom', joinToRoomHandler );

    },
    disconnect() {
        this.socket?.off('guestJoinToRom');
        this.socket?.off('joinToRoom');
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
export type ResponseJoinType = {
    countUsersToRoom: number,
    message: string
    userRoom: userRoomType
}
export type userRoomType = {
    roomId: string,
    roomName: string
}