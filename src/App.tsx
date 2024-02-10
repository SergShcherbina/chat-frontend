import {Router} from "./components/router/Router.tsx";
import {useEffect} from "react";
import {meTC} from "./redux/auth-reducer.ts";
import {useAppDispatch} from "./hooks/useAppDispatch.ts";

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(meTC())
    },[])

    return <Router/>
}

