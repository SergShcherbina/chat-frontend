import React, {SetStateAction, useEffect} from "react";

export const useByTimeClearErrors = (setError: React.Dispatch<SetStateAction<string[]>>, depends: Array<string>) => {
    useEffect(() => {
        const timerId = setTimeout(() => {
            setError([])
        }, 3000)
        return () => clearTimeout(timerId)
    }, [depends.length]);
}