import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {MessageList} from "../message-list/MessageList.tsx";
import {Login} from "../auth/Login.tsx";
import {SignIn} from "../auth/SignIn.tsx";
import {Layout} from "../layout/Layuut.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: [
            {
                index: true,
                Component: MessageList,
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/sign-in',
                Component: SignIn,
            },
        ]
    },
    {
        path: '*',
        element: <h2>page note found 404 </h2>,
    }
])


export const Router = () => {
    return <RouterProvider router={router}/>
};
