import {io, Socket} from 'socket.io-client';
import {MessageType, UserType} from "../App.tsx";

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
    ) {
        this.socket?.on('new-message-send', addMessage);
        this.socket?.on('init-messages-published', setMessages);
        this.socket?.on('user-writes-message', userWrites)
    },
    disconnect() {
        this.socket?.off('init-messages-published');
        this.socket?.off('new-message-send');
        this.socket?.off('user-writes-message');
    },
    sendMessage(textMessage: string, errorCallBack: (errorMessage: string)=>void) {
        this.socket?.emit('client-message-send', textMessage, errorCallBack)
    },
    sendUserName(userName: string) {
        this.socket?.emit('name-send', userName)
    },
    writesMessage(){
        this.socket?.emit('writes-message')
    }
}