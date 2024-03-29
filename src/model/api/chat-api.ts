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
        firstConnectToRoomHandler: (responseJoinObj: ResponseFirstConnectType) => void,
        messageHandler: (obj: { message: string }) => void,
        connectToRoomHandler: (responseConnectObj: ResponseConnectType) => void,
        setCountUserToRoom:(countUsersToRoom: number) => void
    ) {
        this.socket?.on('connection', getRoomsHandler);
        this.socket?.on('firstConnectToRoom', firstConnectToRoomHandler );
        this.socket?.on('guestFirstConnectToRom', messageHandler);
        this.socket?.on("searchRooms", getRoomsHandler)
        this.socket?.on('connectToRoom', connectToRoomHandler)
        this.socket?.on('countUsersToRoom', setCountUserToRoom)

    },
    disconnect() {
        this.socket?.off('connection');
        this.socket?.off('firstConnectToRoom');
        this.socket?.off('guestFirstConnectToRom');
        this.socket?.off("searchRooms")
        this.socket?.off('connectToRoom')
        this.socket?.off('countUsersToRoom')

    },
    createRoom(userData: CreateRoomType, errorCallBack: (errorMessage: string) => void ) {
        this.socket?.emit('createRoom', userData, errorCallBack)
    },
    searchRoom(roomName: string) {
        this.socket?.emit('searchRoom', roomName)
    },
    connectToRoom(userData: CreateRoomType) {
        this.socket?.emit('connectToRoom', userData)
    }
}


//Types
type CreateRoomType = {
    userName: string | null,
    userId: string | null,
    roomName: string,
}
export type ResponseFirstConnectType = {
    countUsersToRoom: number,
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
