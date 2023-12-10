import {Link} from "react-router-dom";
import {loginTC} from "../../redux/auth-reducer.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {useForm, SubmitHandler} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import {Navigate} from 'react-router-dom'
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store.ts";
import {useByTimeClearErrors} from "../../hooks/useClearMessage.ts";

export type InputsType = {
    email: string
    password: string
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const [errorArray, setErrors] = useState<Array<string>>([])
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn)

    const schema = yup
        .object({
            email: yup.string()
                // .email()
                .required(),
            password: yup.string().min(4).required(),
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<InputsType>({
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<InputsType> = (data) => {
        dispatch(loginTC(data)).then(res => {
            setErrors(res?.errors)
        })
    }

    useByTimeClearErrors(setErrors, errorArray)

    if(isLoggedIn) return <Navigate to={'/'}/>

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold tracking-tight text-gray-50">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 ">Email
                            address</label>
                        <div className="mt-2">
                            <input id="email"
                                   {...register("email")}
                                   className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-orange-300 sm:text-sm sm:leading-6"/>
                        </div>
                        {errors.email && <div className={'text-red-500'}> {errors.email.message}</div>}
                    </div>

                    <div>
                        <label htmlFor="password"
                               className="block text-sm font-medium leading-6 ">Password</label>
                        <div className="mt-2">
                            <input id="password"
                                   {...register("password")}
                                   className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-orange-300 sm:text-sm sm:leading-6"/>
                        </div>
                        {errors.password && <div className={'text-red-500'}> {errors.password.message}</div>}
                    </div>

                    <div>
                        {errorArray.map(err => <div className={'text-red-500 pb-2'}>{err}</div>)}
                        <button type="submit"
                                className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-900">
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a account?
                    <Link to="/sign-up" className="font-semibold leading-6 text-orange-500 hover:text-orange-400 ml-1">Registering
                        a new account</Link>
                </p>
            </div>
        </div>
    );
};
