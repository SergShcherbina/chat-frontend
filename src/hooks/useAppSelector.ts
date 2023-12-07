import {useSelector} from "react-redux";
import {AppStateType} from "../redux/store.ts";

export const useAppSelector = useSelector<AppStateType>
