import {createBrowserRouter, Navigate, Outlet, RouterProvider} from 'react-router-dom'
import {MessagesList} from "../messages-list/MessagesList.tsx";
import {Login} from "../auth/Login.tsx";
import {SignUp} from "../auth/SignUp.tsx";
import {Layout} from "../layout/Layout.tsx";
import {NotFound} from "../not-found/NotFound.tsx";
import {useAppSelector} from "../../hooks/useAppSelector.ts";

const router = createBrowserRouter([
    {
        path: '/',
        Component: PrivateRoutes,
        children: [
            {
                Component: Layout,
                children: [
                    {
                        index: true,
                        Component: MessagesList,
                    }
                ]
            },
        ]
    },
    {
        path: '/login',
        Component: Login,
    },
    {
        path: '/sign-up',
        Component: SignUp,
    },
    {
        path: '*',
        Component: NotFound,
    }
])


export const Router = () => {
    return <RouterProvider router={router}/>
};
function PrivateRoutes() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isLoading = useAppSelector(state => state.auth.isLoading)

    if(isLoading) return <h1 style={{textAlign: 'center', marginTop: '20vh'}}>LOADING...</h1>

    const isAuthenticated = !!isLoggedIn

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}