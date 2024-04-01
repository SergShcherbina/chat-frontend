import {useAppDispatch} from "../../../common";
import {UserRoomItem} from "../user-room-item/UserRoomItem.tsx";
import {connectToRoomTC} from "../../../model/redux";
import {FC} from "react";
import {UserRoomType} from "../../../model/api/chat-api.ts";

type PropsType = {
    userRooms: UserRoomType[],
    className?: string
}

export const UserRoomsList: FC<PropsType> = ({userRooms, className}) => {
    const dispatch = useAppDispatch()

    const onClickRoom = (roomName : string) => {
        dispatch(connectToRoomTC(roomName))
    }

    return (
        <ul className={"max-h-[50vh] overflow-y-scroll " + `${className}`}>
            {userRooms.map(({roomName, roomId}) =>
                <UserRoomItem
                    key={roomId}
                    roomName={roomName}
                    roomId={roomId}
                    onClickRoom={onClickRoom}
                />
            )}
        </ul>
    );
};
