import {Router} from "./router/Router.tsx";
import {useEffect} from "react";
import {me} from "./redux/auth-reducer.ts";
import {useAppDispatch} from "./hooks/useAppDispatch.ts";

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(me())
    },[])

    return <Router/>
}

