import { createContext, useReducer, useContext, ReactNode, useEffect } from "react";
import { UserType } from "../lib/types";

// Define the shape of the context state
interface AuthState {
  user: UserType | null;
}

// Define the shape of the context actions
interface AuthAction {
  type: string;
  payload?: any;
}

// Create the initial state
const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
};

type AuthContextType = {
  user: UserType | null;
  dispatch: React.Dispatch<AuthAction>;
};

// Create the context
const AuthContext = createContext<AuthContextType>({
  user: null,
  dispatch: () => null,
});

// Create a reducer to manage the state
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("user")
      return {
        user: null,
      };
    default:
      return state;
  }
};

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])
  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};