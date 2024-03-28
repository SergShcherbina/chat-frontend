import {createBrowserRouter, Navigate, Outlet, RouterProvider} from 'react-router-dom'
import {MessagesList} from "../components";
import {Login} from "../pages/auth";
import {SignUp} from "../pages/auth";
import {Layout} from "../components";
import {NotFound} from "../pages/404-page/404-page.tsx";
import {useAppSelector} from "../../common";

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