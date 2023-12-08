import {useEffect} from "react";

export const useByTimeClearErrors = (arg: any, depends: Array<string>) => {
    useEffect(() => {
        console.log('useByTimeClearErrors')
        const timerId = setTimeout(() => {
            console.log('2')
            arg([])
        }, 3000)
        return () => clearTimeout(timerId)
    }, [depends.length]);
}