import {ComponentPropsWithoutRef, FC} from "react";

type PropsType = {
    userImage?: string
} & ComponentPropsWithoutRef<'div'>

export const Avatar: FC<PropsType> = ({userImage, ...rest}) => {
    const path = userImage || "https://www.blexar.com/avatar.png"

    return (
        <div {...rest} >
            <img className={"h-10 w-10 rounded-xl "} src={path} alt="user avatar"/>
        </div>
    );
};