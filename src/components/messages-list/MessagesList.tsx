import {MessageItem} from "../message-item/MessageItem.tsx";
import {AppDispatchType, AppStateType} from "../../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {createRef, useEffect, useState} from "react";
import {
    connectionTC,
    disconnectionTC,
    sendMessageTC,
    writesMessageTC
} from "../../redux/chat-reducer.ts";
import {messageObserver} from "../../utils/messageObserver.ts";
import '../../index.css'
import {Rooms} from "../rooms/Rooms.tsx";

export type MessageType = {
    message: string;
    id: string;
    user: UserType,
}
export type UserType = { id: string, name: string, room: string }


export const MessagesList = () => {
    const dispatch: AppDispatchType = useDispatch()
    const messages = useSelector<AppStateType, MessageType[]>(state => state.chat.messages)
    const usersWrites = useSelector<AppStateType, UserType[]>(state => state.chat.userWrites)

    const [value, setValue] = useState('')
    const [roomValue, setRoomValue] = useState('')
    const myRef = createRef<HTMLDivElement>()

    useEffect(() => {
        dispatch(connectionTC())
        return () => {
            dispatch(disconnectionTC())
        }
    }, []);

    useEffect(() => {
        myRef.current && messageObserver(myRef.current)
    }, [myRef])

    const onSendMessage = () => {
        dispatch(sendMessageTC(value, roomValue))
        setValue('')
    }

    const writesMessagesHandler = () => {
        dispatch(writesMessageTC(roomValue))
    }

    const getRoom = (value: string) => {
        setRoomValue(value)
    }

    const timeMessage = ''
    return (
        <div className={'container mx-auto flex'}>
            <Rooms getRoom={getRoom}/>

            <div className={'flex w-full pl-2 flex-col mt-0 h-[93vh] pb-5' + ' ' + 'scrollBar'}>

                <div className={'flex flex-col gap-5 my-3 overflow-y-auto flex-1'}>
                    {messages.map((message, i) => {
                        if (messages.length - 1 === i) {
                            return <MessageItem key={message.id+i} {...message} time={timeMessage} ref={myRef}/>
                        }
                        return <MessageItem key={message.id+i} {...message} time={timeMessage}/>
                    })}
                </div>

                <div>
                    {usersWrites.map((u: UserType) => {
                        return <span key={u.id}>{u.name} ... </span>
                    })}
                </div>

                <div className="mt-5">
                    <div className=" flex ">
                    <textarea
                        name={"message"}
                        placeholder={' Your message'}
                        className="block w-full h-12 bg-second border-b-2 border-orange-500 py-1.5  placeholder:text-gray-400 focus:ring-2 focus-visible:outline-none focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 p-4"
                        value={value}
                        onChange={(e) => {
                            writesMessagesHandler()
                            setValue(e.currentTarget.value)
                        }}
                    />
                        <button
                            className={'rounded-r-lg bg-orange-500 px-4 font-bold focus-visible:outline-none focus:ring-inset focus:ring-2  focus:ring-orange-200'}
                            onClick={onSendMessage}>
                            {'send'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};