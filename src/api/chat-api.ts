import {io, Socket} from 'socket.io-client';
import {MessageType, UserType} from "../components/messages-list/MessagesList.tsx";

const URL = 'http://localhost:3000' || 'https://chat-backend-git-main-sergshcherbina.vercel.app/'

export const api = {
    socket: null as null | Socket,
    createConnection() {
        this.socket = io(URL, {autoConnect: true})
    },
    subscribe(
        addMessage: (message: MessageType) => void,
        setMessages: (messages: MessageType[]) => void,
        userWrites: (user: UserType) => void,
        setUserId: (userId: string) => void,
        counterUsersRoomHandler: (obj: { countUsersRoom: string, message: string }) => void
    ) {
        this.socket?.on('new-message-send', addMessage );
        this.socket?.on('init-messages-published', setMessages);
        this.socket?.on('writes', userWrites)
        this.socket?.on('set-userId', setUserId);
        this.socket?.on('join', counterUsersRoomHandler);
    },
    disconnect() {
        this.socket?.off('init-messages-published');
        this.socket?.off('new-message-send');
        this.socket?.off('writes');
        this.socket?.off('set-userId');
        this.socket?.off('join');
    },
    sendMessage(obj: { textMessage: string, room: string }, errorCallBack: (errorMessage: string) => void) {
        this.socket?.emit('client-message-send', obj, errorCallBack)
    },
    sendUserName(userName: string | null, room: string) {
        this.socket?.emit('join', {userName, room})
    },
    writesMessage(roomValue: string) {
        this.socket?.emit('writes', roomValue)
    },
}