import {MessageItem} from "../message-item/MessageItem.tsx";
import {createRef, useEffect, useState} from "react";
import {messageObserver} from "../../../common";
import {SideBar} from "../side-bar/SideBar.tsx";
import {useAppSelector} from "../../../common";
import {Login} from "../../pages/auth";
import {useAppDispatch} from "../../../common";
import {connectionTC, disconnectionTC} from "../../../model/redux";
import '../../../index.css'


export const MessagesList = () => {
    const dispatch = useAppDispatch()
    const messages = useAppSelector(state => state.chat.messages)
    // const usersWrites = useSelector<AppStateType, UserType[]>(state => state.chat.userWrites)

    const [value, setValue] = useState('')
    const myRef = createRef<HTMLDivElement>()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

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
        // dispatch(sendMessageTC(value, roomValue))
        setValue('')
    }

    const writesMessagesHandler = () => {
        // dispatch(writesMessageTC(roomValue))
    }

    if(!isLoggedIn) return <Login/>

    return (
        <div className={'container mx-auto flex'}>
            <SideBar />

            <div className={'flex w-full pl-2 flex-col mt-0 h-[93vh] pb-5' + ' ' + 'scrollBar'}>

                <div className={'flex flex-col gap-5 my-3 overflow-y-auto flex-1'}>
                    {messages &&  messages.map((message: string, i: number) => {
                        if (messages.length - 1 === i) {
                            return <MessageItem key={i} message={message}  ref={myRef}/>
                        }
                        return <MessageItem key={i} message={message}/>
                    })}
                </div>

                <div>
                    {/*{usersWrites.map((u: UserType) => {*/}
                    {/*    return <span key={u.userId}>{u.userName} ... </span>*/}
                    {/*})}*/}
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