import {useAppDispatch, useAppSelector} from "../../../common";
import {UserRoomsList} from "../user-rooms-list/UserRoomsList.tsx";
import {useEffect, useState} from "react";
import {searchRoomTC} from "../../../model/redux";

export const SearchRooms = () => {
    const dispatch = useAppDispatch();
    const foundUserRooms = useAppSelector(state => state.chat.foundUserRooms)
    const [searchName, setSearchName] = useState("")
    const [show, setShow] = useState(false)


    const searchRoomHandler = (value: string) => {
        setSearchName(value)
    }

    useEffect(() => {
        dispatch(searchRoomTC(searchName))
    }, [searchName])

    return (
        <div className={'relative h-90vh '} >
            <input
                className={'border rounded-md py-1 px-3 text-gray-700 h-12'}
                placeholder={'Search rooms...'}
                value={searchName}
                onFocus={() => setShow(true) }
                onBlur={() => setShow(false) }
                onChange={e => searchRoomHandler(e.currentTarget.value)}
                type="search"
            />

            {!!foundUserRooms.length && <UserRoomsList
            userRooms={foundUserRooms}
            className={`${show ? 'opacity-1' : 'opacity-0' } ` +
                ' absolute top-[50px] border rounded-md p-2 transition-all  w-full bg-white text-orange-700 min-h-[00px]' }
            />}

        </div>
    )
}