import {useAppSelector} from "../../../common";
import {UserRoomItem} from "../user-room-item/UserRoomItem.tsx";


export const UserRoomsList = () => {
    const onClickRoom = (roomId : string) => {

        alert("roomId: " + roomId)
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
