import {useAppDispatch, useAppSelector} from "../../../common";
import {UserRoomItem} from "../user-room-item/UserRoomItem.tsx";
import {connectToRoomTC} from "../../../model/redux";


export const UserRoomsList = () => {
    const dispatch = useAppDispatch()
    const onClickRoom = (roomName : string) => {
        dispatch(connectToRoomTC(roomName))
    }

    const userRooms = useAppSelector(state => state.chat.userRooms)
    return (
        <ul className={"max-h-[50vh] overflow-y-scroll"}>
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
