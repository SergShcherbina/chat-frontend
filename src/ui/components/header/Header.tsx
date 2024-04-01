import {useAppDispatch, useAppSelector} from "../../../common";
import {isLoggedIn, leaveRoomTC} from "../../../model/redux";
import { SearchRooms} from "../search/SearchRooms.tsx";

export const Header = () => {
    const dispatch = useAppDispatch()
    const {roomName, roomId} = useAppSelector(state => state.chat.currentRoom)

    const logOut = () => {
        dispatch(isLoggedIn(false))
        localStorage.removeItem('session')
        localStorage.removeItem('chatUserId')
    }

    const leaveRoomHandler = () => {
        dispatch(leaveRoomTC({roomName, roomId}))
    }
    return (
        <header className={'flex justify-center border-b bg-orange-500'}>

            <div className={'container flex justify-between py-3 text-xl font-medium '}>
                <div className={"flex gap-3 w-1/3"}>
                    <div className={'self-center'}>

                        Current room:
                        <b> {roomName}</b>
                    </div>

                    {roomName && <button
                        className={'border py-1 px-4 rounded-md hover:translate-x-0.5 hover:bg-orange-400 transition left-0'} onClick={leaveRoomHandler}>
                        leave {roomName} <span>&rarr;</span>
                    </button>}
                </div>

                <SearchRooms />

                <button
                    className={'border py-1 px-4 rounded-md hover:translate-x-0.5 hover:bg-orange-400 transition'}
                    onClick={logOut}
                >log out <span>&rarr;</span></button>
            </div>

        </header>
    )
}