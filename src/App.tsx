import { useEffect, useState, createRef } from 'react';
import {
    connectionTC,
    disconnectionTC,
    sendMessageTC,
    sendUserNameTC,
    writesMessageTC
} from './redux/chatReducer.ts';
import { messageObserver } from "./utils/messageObserver.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType, AppStateType } from "./redux/store.ts";
import './App.css'

export type MessageType = {
    message: string;
    id: string;
    user: UserType,
}
export type UserType = { id: string, name: string }

export const App = () => {
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

    const onSendUserName = () => {
        dispatch(sendUserNameTC(userName))
    }

    const writesMessagesHandler = () => {
        dispatch(writesMessageTC())
    }

    return (
        <div className="App">

            {messages.map((message, i) => {
                if (messages.length - 1 === i) {
                    return (
                        <div className={'item'} key={message.id + i} ref={myRef}>
                            <h3>
                                {message.user.name}
                            </h3>
                            <p> {message.message}</p>
                            <hr />
                        </div>)
                }
                return (
                    <div className={'item'} key={message.id + i}>
                        <h3>
                            {message.user.name}
                        </h3>
                        <p> {message.message}</p>
                        <hr />
                    </div>
                )
            })}

            <div>
                {usersWrites.map((u: UserType) => {
                    return <span key={u.id}>{u.name} ...      </span>
                })}
            </div>

            <div>
                <div>
                    <input
                        type={'text'}
                        onChange={(e) => setUserName(e.currentTarget.value)}
                    />
                    <button onClick={onSendUserName}
                    >send name
                    </button>
                </div>

                <textarea value={value}
                    onChange={(e) => {
                        writesMessagesHandler()
                        setValue(e.currentTarget.value)
                    }}
                />
                <button onClick={onSendMessage}>
                    {'send message'}
                </button>
            </div>
        </div>
    );
}
