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
        getRoomsHandler: (userRooms: UserRoomType[]) => void,
        joinToRoomHandler: (responseJoinObj: ResponseJoinType) => void,
        messageHandler: (obj: { message: string }) => void,
    ) {
        this.socket?.on('connection', getRoomsHandler);
        this.socket?.on('guestJoinToRom', messageHandler);
        this.socket?.on('joinToRoom', joinToRoomHandler );
        this.socket?.on("searchRooms", getRoomsHandler)

    },
    disconnect() {
        this.socket?.off('guestJoinToRom');
        this.socket?.off('joinToRoom');
    },
    createRoom(userData: CreateRoomType, errorCallBack: (errorMessage: string) => void ) {
        this.socket?.emit('createRoom', userData, errorCallBack)
    },
    searchRoom(roomName: string) {
        this.socket?.emit('searchRoom', roomName)
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
    userRoom: UserRoomType
}
export type UserRoomType = {
    roomId: string,
    roomName: string
}

