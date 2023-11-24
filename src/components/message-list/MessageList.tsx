import {MessageItem} from "../message-item/MessageItem.tsx";
import {AppDispatchType, AppStateType} from "../../redux/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {createRef, useEffect, useState} from "react";
import {
    connectionTC,
    disconnectionTC,
    sendMessageTC, sendUserNameTC,
    // sendUserNameTC,
    writesMessageTC
} from "../../redux/chatReducer.ts";
import {messageObserver} from "../../utils/messageObserver.ts";
import '../../index.css'

export type MessageType = {
    message: string;
    id: string;
    user: UserType,
}
export type UserType = { id: string, name: string }


export const MessageList = () => {
    const dispatch: AppDispatchType = useDispatch()
    const messages = useSelector<AppStateType, MessageType[]>(state => state.chat.messages)
    const usersWrites = useSelector<AppStateType, UserType[]>(state => state.chat.userWrites)

    const [value, setValue] = useState('')
    const [userName, setUserName] = useState<string>('')
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
        dispatch(sendMessageTC(value))
        setValue('')
    }
    // console.log(messages)
    const onSendUserName = () => {
        dispatch(sendUserNameTC(userName))
    }

    const writesMessagesHandler = () => {
        dispatch(writesMessageTC())
    }
    const timeMessage = ''
    return (
        <div className={'container flex flex-col mt-0 mx-auto h-[93vh] pb-5' + ' ' + 'scrollBar'}>

            <div className={'flex flex-col gap-5 my-3 overflow-y-auto flex-1' } >
                {messages.map((message, i) => {
                    if (messages.length - 1 === i) {
                        return <MessageItem key={message.id} {...message} time={timeMessage} ref={myRef}/>
                    }
                    return <MessageItem key={message.id} {...message} time={timeMessage}/>
                })}
            </div>

            <div>
                {usersWrites.map((u: UserType) => {
                    return <span key={u.id}>{u.name} ... </span>
                })}
            </div>

            <div className={'mb-3'}>
                <div className="mt-2">
                    <input
                        onChange={(e) => setUserName(e.currentTarget.value)}
                        type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                <button onClick={onSendUserName}
                >send name
                </button>
            </div>

            <div className="mt-5">
                <div className=" flex ">
                    <textarea
                        name={"message"}
                        placeholder={' 📎 Your message'}
                        className="block w-full h-12 bg-second border-b-2 border-orange-500 py-1.5  placeholder:text-gray-400 focus:ring-2 focus-visible:outline-none focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 p-4"
                        value={value}
                        onChange={(e) => {
                            writesMessagesHandler()
                            setValue(e.currentTarget.value)
                        }}
                    />
                    <button className={'rounded-r-lg bg-orange-500 px-4 font-bold focus-visible:outline-none focus:ring-inset focus:ring-2  focus:ring-orange-200'}
                            onClick={onSendMessage}>
                        {'send'}
                    </button>
                </div>
            </div>
        </div>
    );
};