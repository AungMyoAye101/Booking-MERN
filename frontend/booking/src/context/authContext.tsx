import { createContext, useContext, useEffect, useReducer, } from "react"
import { UserType } from "../lib/types"

export const base_url = 'https://localhost:5000'

const defaultUser = {
  _id: "",
  name: "",
  email: '',
  isAdmin: false
}
type AuthAction = {
  type: "LOGIN", payload: UserType
} | { type: "LOGOUT" }
export const authContext = createContext<{
  user: UserType,
  dispatch: React.Dispatch<AuthAction>
}>({
  user: defaultUser,
  dispatch: () => null,
})

const reducer = (state: UserType, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { ...action.payload };
    case "LOGOUT":
      return { ...defaultUser }

    default:
      return state
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, defaultUser,)

  const fetchUser = async () => {
    try {
      const res = await fetch(base_url + "/auth/me", {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        },
        credentials: "include"

      })
      const { user } = await res.json()
      if (!res.ok) {
        dispatch({ type: "LOGOUT" })
      }
      console.log(user)
      dispatch({ type: "LOGIN", payload: user })
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])


  return (
    <authContext.Provider value={{ user: state, dispatch }}> {children}</authContext.Provider >
  )
}

export const useAuth = () => {
  return useContext(authContext)
}
