import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {InputsType} from "./Login.tsx";
import {Link, useNavigate} from 'react-router-dom'
import * as yup from "yup";
import {signUpTC} from "../../redux/auth-reducer.ts";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {useState} from "react";
import {useByTimeClearErrors} from "../../hooks/useClearMessage.ts";

type SignUpType = {
    confirm: string
} & InputsType

export const SignUp = () => {
    const dispatch = useAppDispatch();
    const [errorArray, setError] = useState<string[]>([])
    const navigate = useNavigate()

    const schema = yup
        .object({
            email: yup.string().required().email(),
            password: yup.string().required().min(4),
            confirm: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match')
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SignUpType>({
        resolver: yupResolver(schema)
    })

    const onSubmit = (signUpData: SignUpType) => {
        dispatch(signUpTC({email: signUpData.email, password: signUpData.password}))
            .then(res => {
                if (res.errors) {
                    setError(res.errors)
                    return
                }
                if (res.data.message) {
                    navigate('/login')
                }
            })
    }

    useByTimeClearErrors(setError, errorArray)

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold tracking-tight text-gray-50">Create an account</h2>
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
                                   type="password"
                                   {...register("password")}
                                   className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-orange-300 sm:text-sm sm:leading-6"/>
                        </div>
                        {errors.password && <div className={'text-red-500'}> {errors.password.message}</div>}
                    </div>

                    <div>
                        <label htmlFor="confirm"
                               className="block text-sm font-medium leading-6 ">Confirm Password</label>
                        <div className="mt-2">
                            <input id="confirm"
                                   type="password"
                                   {...register("confirm")}
                                   className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 outline-orange-300 sm:text-sm sm:leading-6"/>
                        </div>
                        {errors.confirm && <div className={'text-red-500'}> {errors.confirm.message}</div>}
                    </div>

                    <div>{errorArray.map((err, i) => <p key={err + i} className={'text-red-500'}>{err}</p>)}</div>

                    <div>
                        <button type="submit"
                                className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-900">
                            Sign in
                        </button>
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Go to page
                            <Link to="/login"
                                  className="font-semibold leading-6 text-orange-500 hover:text-orange-400 ml-1">login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}