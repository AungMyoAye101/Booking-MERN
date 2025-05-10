// import { createContext, useReducer, useContext, ReactNode, useEffect } from "react";
// import { UserType } from "../lib/types";

import { createContext, useContext, useEffect, useState } from "react";

// // Define the shape of the context state
// interface AuthState {
//   user: UserType | null;
// }

// // Define the shape of the context actions
// interface AuthAction {
//   type: string;
//   payload?: any;
// }

// // Create the initial state
// const initialState: AuthState = {
//   user: JSON.parse(localStorage.getItem('user') || 'null'),
// };

// type AuthContextType = {
//   user: UserType | null;
//   dispatch: React.Dispatch<AuthAction>;
// };

// // Create the context
// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   dispatch: () => null,
// });

// // Create a reducer to manage the state
// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         user: action.payload,
//       };
//     case "LOGOUT":
//       localStorage.removeItem("user")
//       return {
//         user: null,
//       };
//     default:
//       return state;
//   }
// };

// // Create a provider component
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(state.user))
//   }, [state.user])
//   return (
//     <AuthContext.Provider value={{ user: state.user, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
const baseUrl = 'http://localhost:5000/api/'
interface UserType {
  id: string,
  isAdmin: boolean
}
interface AuthContextType {
  user: UserType | null // Replace 'any' with the appropriate user type if available
  logout: () => Promise<void>;
}

export const AuthContex = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null)
  console.log(user, "in context")
  const auth = async () => {
    try {
      const res = await fetch(baseUrl + 'auth/me', {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        },
        credentials: 'include'
      })
      if (!res.ok) {
        return setUser(null)
      }
      const data = await res.json()
      setUser(data)
    } catch (error) {
      setUser(null)
    }
  }
  useEffect(() => {
    auth()
  }, [user])

  const logout = async () => {

    await fetch(baseUrl + 'auth/logout', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      credentials: 'include'
    })
    setUser(null)

  }

  return <AuthContex.Provider value={{ user, logout }}>{children}</AuthContex.Provider>
}

export const useAuth = () => {
  return useContext(AuthContex)
}