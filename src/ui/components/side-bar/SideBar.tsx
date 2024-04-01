import { useState} from "react";
import {useAppSelector, useAppDispatch} from "../../../common";
import {createRoomTC} from "../../../model/redux";
import {UserRoomsList} from "../user-rooms-list/UserRoomsList.tsx";


export const SideBar = () => {
    const dispatch = useAppDispatch();
    const userName = useAppSelector(state => state.auth.userName)
    const countUsersToRoom = useAppSelector(state => state.chat.countUsersToRoom)
    const userRooms = useAppSelector(state => state.chat.userRooms)
    const [room, setRoomName] = useState("")

    const createRoomHandler = () => {
        dispatch(createRoomTC(room))
    }

    return (
        <aside className={'w-52 p-2 border-r'}>
            <h2>{userName}</h2>

            <ul className={'border-b mb-3'}>
                <li>
                    <button>
                        <span >{`${countUsersToRoom}`} users in the room </span>
                    </button>
                </li>
            </ul>

            <div className={'mb-3 flex gap-1'}>
                <input
                    value={room}
                    placeholder={'new room'}
                    onChange={(e) => setRoomName(e.currentTarget.value)}
                    type="text" name="room" id="room" autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                <button
                    onClick={createRoomHandler}
                    className={'border rounded-lg px-1'}
                    >create
                </button>
            </div>

            <UserRoomsList userRooms={userRooms}/>
        </aside>
    );
};