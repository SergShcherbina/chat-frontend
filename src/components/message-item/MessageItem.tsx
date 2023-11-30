import { forwardRef} from "react";
import {MessageType} from "../messages-list/MessagesList.tsx";
import {Avatar} from "../avatar/Avatar.tsx";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store.ts";

type PropsType = {
    time: string
} & MessageType

export const MessageItem= forwardRef<HTMLDivElement| null, PropsType>(({user, message, time}, ref) => {
    const userId = useSelector<AppStateType, string>(state => state.chat.userId);
    const isMy = userId === user.id

    return (
        <div className={'flex gap-3 items-end' + ' ' +  (isMy ? ' flex-row-reverse'  : ' flex-row')} ref={ref}>
            <Avatar />
            <div className={'px-3 py-1 rounded-md' + ' ' + (isMy ? ' bg-orange-500' : ' bg-gray-600')
            } >
                <p className={'flex flex-col gap-3 text-xs text-gray-50 font-bold '}>{user.name}</p>
                <p className={''}> {message}</p>
                <span>{time}</span>
            </div>
        </div>
    )
})