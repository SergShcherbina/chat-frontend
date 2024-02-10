import {Outlet} from 'react-router-dom';
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {isLoggedInAC} from "../../redux/auth-reducer.ts";

export const Layout = () => {
    const dispatch = useAppDispatch()
    const isAuth = true

    const logOut = () => {
        dispatch(isLoggedInAC(false))
        localStorage.removeItem('session')
    }

    const escapeFromHandler = () => {
        console.log('dispatch escapeFromHandler')
    }
    return (
        <div className={'h-screen flex flex-col'}>
            <header className={'flex justify-center border-b bg-orange-500'}>
                {
                    isAuth &&
                    <div className={'container flex justify-between py-3 text-xl font-medium'}>

                        <div className={'self-center'}>Name room:
                            <button
                                className={'inline-flex gap-3'}
                                onClick={escapeFromHandler}
                            > variable
                            </button>
                        </div>

                        <button
                            className={'border py-1 px-4 rounded-md hover:translate-x-0.5 hover:bg-orange-400 transition'}
                            onClick={logOut}
                        >log out <span>&rarr;</span></button>
                    </div>
                }
            </header>

            <Outlet/>
        </div>
    );
};
