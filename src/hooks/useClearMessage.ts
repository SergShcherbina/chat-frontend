import React, {SetStateAction, useEffect} from "react";

export const useByTimeClearErrors = (setError: React.Dispatch<SetStateAction<string[]>>, depends: Array<string>) => {
    useEffect(() => {
        console.log('useByTimeClearErrors')
        const timerId = setTimeout(() => {
            console.log('2')
            setError([])
        }, 3000)
        return () => clearTimeout(timerId)
    }, [depends.length]);
}