import {useDispatch} from "react-redux";
import {AppDispatchType} from "../redux/store.ts";

export const useAppDispatch = useDispatch<AppDispatchType>