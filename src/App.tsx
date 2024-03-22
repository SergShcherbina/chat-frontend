import {Router} from "./ui/router/Router.tsx";
import {useEffect} from "react";
import { me } from "./model/redux";
import {useAppDispatch} from "./common";

export const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(me())
    },[])

    return <Router/>
}

