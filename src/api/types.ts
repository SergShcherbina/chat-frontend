export type UserType = {
    password: string
    role: ['USER | ADMIN']
    username: string
    __v: number
    _id: string
}

export type UserAuthType = {
    username: string,
    password: string
}
