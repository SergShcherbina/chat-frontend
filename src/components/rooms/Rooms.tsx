import {FC, useState} from "react";
import {sendUserNameTC} from "../../redux/chat-reducer.ts";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../redux/store.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";

type PropsType = {
    getRoom: (value: string) => void
}

export const Rooms: FC<PropsType> = ({getRoom}) => {
    const dispatch: AppDispatchType = useDispatch();
    const [room, setRoom] = useState('')
    const [userName, setUserName] = useState<string>('')

    const countUsersRoom = useAppSelector(state => state.chat.countUsersRoom)

    const setRoomHandler = (value: string) => {
        setRoom(value)
    }
    const onSendUserName = () => {
        dispatch(sendUserNameTC(userName, room))
    }

    return (
        <div className={'w-52 p-2 border-r'}>

            <ul className={'border-b mb-3'}>
                Name rooms:
                <li >{`${countUsersRoom}`} users in the room </li>
            </ul>


            <div className={'mb-3 flex'}>
                <input
                    onBlur={() => getRoom(room)}
                    value={room}
                    placeholder={'room'}
                    onChange={(e) => setRoomHandler(e.currentTarget.value)}
                    type="text" name="room" id="room" autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                {/*<button className={'border rounded-lg'}>send</button>*/}
            </div>

            <div className={'mb-3 flex'}>
                <input
                    onChange={(e) => setUserName(e.currentTarget.value)}
                    type="text" name="first-name" id="first-name" autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <button onClick={onSendUserName} className={'border rounded-lg'}
                >send name
                </button>
            </div>
        </div>
    );
};