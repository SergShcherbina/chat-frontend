import {Outlet} from 'react-router-dom';
import {useAppDispatch} from "../../../common";
import {useAppSelector} from "../../../common";
import {isLoggedIn, leaveRoomTC} from "../../../model/redux";

export const Layout = () => {
    const {roomName, roomId} = useAppSelector(state => state.chat.currentRoom)

    const dispatch = useAppDispatch()

    const logOut = () => {
        dispatch(isLoggedIn(false))
        localStorage.removeItem('session')
        localStorage.removeItem('chatUserId')
    }

    const leaveRoomHandler = () => {
        dispatch(leaveRoomTC({roomName, roomId}))
    }

    return (
        <div className={'h-screen flex flex-col'}>
            <header className={'flex justify-center border-b bg-orange-500'}>

                    <div className={'container flex justify-between py-3 text-xl font-medium'}>
                        <div className={"flex gap-3"}>
                            <div className={'self-center'}>

                                Current room:
                                <b> {roomName}</b>
                            </div>

                            {roomName && <button
                                className={'border py-1 px-4 rounded-md hover:translate-x-0.5 hover:bg-orange-400 transition left-0'} onClick={leaveRoomHandler}>
                                leave {roomName} <span>&rarr;</span>
                            </button>}
                        </div>


                        <button
                            className={'border py-1 px-4 rounded-md hover:translate-x-0.5 hover:bg-orange-400 transition'}
                            onClick={logOut}
                        >log out <span>&rarr;</span></button>
                    </div>

            </header>

            <Outlet/>
        </div>
    );
};
