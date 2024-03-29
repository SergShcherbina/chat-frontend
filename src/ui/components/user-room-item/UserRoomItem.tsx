import {FC} from "react";

type PropsType = {
    roomName: string
    roomId: string
    onClickRoom: (roomId: string) => void
}

export const UserRoomItem: FC<PropsType> = ({roomName, roomId, onClickRoom}) => {
    console.log(roomId)
    return (
        <li >
            <button
                onClick={() => onClickRoom(roomName)}
                className={"w-full h-10 text-left hover:bg-gray-700"}
            >
                {roomName}
            </button>
        </li>
    );
};