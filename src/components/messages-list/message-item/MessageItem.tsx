import { forwardRef} from "react";
import {Avatar} from "../../avatar/Avatar.tsx";

type PropsType = {
    message: string
    time?: string
}

export const MessageItem= forwardRef<HTMLDivElement| null, PropsType>(({message, time}, ref) => {
    // const userId = useSelector<AppStateType, string>(state => state.chat.userId);
    const isMy = true

    return (
        <div className={'flex gap-3 items-end' + ' ' +  (isMy ? ' flex-row-reverse'  : ' flex-row')} ref={ref}>
            <Avatar />
            <div className={'px-3 py-1 rounded-md' + ' ' + (isMy ? ' bg-orange-500' : ' bg-gray-600')
            } >
                {/*<p className={'flex flex-col gap-3 text-xs text-gray-50 font-bold '}>{user.name}</p>*/}
                <p className={''}> {message}</p>
                <span>{time}</span>
            </div>
        </div>
    )
})