import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {MessageList} from "../message-list/MessageList.tsx";
import {Login} from "../auth/Login.tsx";
import {SignIn} from "../auth/SignIn.tsx";
import {Layout} from "../layout/Layout.tsx";
import {NotFound} from "../not-found/NotFound.tsx";

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
        Component: NotFound,
    }
])


export const Router = () => {
    return <RouterProvider router={router}/>
};
