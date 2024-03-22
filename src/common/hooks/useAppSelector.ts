import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppStateType} from "../../model/redux/store.ts";

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector


