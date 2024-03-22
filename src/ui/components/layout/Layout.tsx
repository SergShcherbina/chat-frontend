import {Outlet} from 'react-router-dom';
import {useAppDispatch} from "../../../common";
import {useAppSelector} from "../../../common";
import {isLoggedIn} from "../../../model/redux";

export const Layout = () => {
    const currentRoomName = useAppSelector(state => state.chat.currentRoomName)

    const dispatch = useAppDispatch()

    const logOut = () => {
        dispatch(isLoggedIn(false))
        localStorage.removeItem('session')
        localStorage.removeItem('chatUserId')
    }

    return (
        <div className={'h-screen flex flex-col'}>
            <header className={'flex justify-center border-b bg-orange-500'}>

                    <div className={'container flex justify-between py-3 text-xl font-medium'}>

                        <div className={'self-center'}>

                            Current room:
                            <b> {currentRoomName}</b>
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
