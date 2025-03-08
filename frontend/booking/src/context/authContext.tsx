import { createContext, useReducer, useContext, ReactNode } from "react";
import { CreateUserType } from "../lib/types";

// Define the shape of the context state
interface AuthState {
  user: any;
}

// Define the shape of the context actions
interface AuthAction {
  type: string;
  payload?: any;
}

// Create the initial state
const initialState: AuthState = {
  user: null as any,
};

// Create the context
const AuthContext = createContext<{
  user: CreateUserType;
  dispatch: React.Dispatch<AuthAction>;
}>({
  user: initialState,
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