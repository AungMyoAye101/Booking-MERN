import { createContext, useContext, useEffect, useReducer, } from "react"
import { UserType } from "../lib/types"
import { base_url } from "../lib/helper"


type authContextProps = {
    user: UserType,
    dispatch: any
}
const defaultUser = {
    _id: '',
    name: '',
    email: "",
    isAdmin: false
}

const authContext = createContext<authContextProps>({
    user: defaultUser,
    dispatch: () => { }
})
type actionOption = | {
    type: "LOGIN", payload: UserType
} | { type: "LOGOUT" }
const reducer = (state: UserType, action: actionOption) => {
    switch (action.type) {
        case "LOGIN":

            return { ...action.payload }
        case "LOGOUT":

            return { ...defaultUser }

        default:

            return state
    }
}
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, defaultUser)
    const currentUser = async () => {
        try {
            const res = await fetch(base_url + '/api/auth/me', {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"

            })
            const { success, message, data } = await res.json()
            if (!res.ok && success === false) {
                throw new Error(message)
            }
            dispatch({ type: "LOGIN", payload: data })
        } catch (error) {
            if (error instanceof Error) console.log(error.message)
        }
    }
    useEffect(() => {
        currentUser()
    }, [])


    return (
        <authContext.Provider value={{ user: state, dispatch }}>{children}</authContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext)
}