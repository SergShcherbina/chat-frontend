import {Outlet} from 'react-router-dom';
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {isLoggedInAC} from "../../redux/auth-reducer.ts";

export const Layout = () => {
    const activeRoomName = useAppSelector(state => state.chat.activeRoomName)

    const dispatch = useAppDispatch()

    const logOut = () => {
        dispatch(isLoggedInAC(false))
        localStorage.removeItem('session')
    }

    return (
        <div className={'h-screen flex flex-col'}>
            <header className={'flex justify-center border-b bg-orange-500'}>

                    <div className={'container flex justify-between py-3 text-xl font-medium'}>

                        <div className={'self-center'}>

                            Current room:
                            <b> {activeRoomName}</b>
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
