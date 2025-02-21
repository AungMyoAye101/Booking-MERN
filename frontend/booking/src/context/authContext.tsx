import { createContext, useEffect, useReducer } from "react";

type AuthState = {
  user: any;
  loading: boolean;
  error: any;
};
interface AuthAction {
  type: string;
  payload?: any;
}
const INITIAL_STATE: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
};
const reducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_OUT":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: false,
      };

    case "LOGIN_FAILED":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

type AuthContextType = {
  user: any;
  loading: boolean;
  error: any;
  dispatch: React.Dispatch<AuthAction>;
};

const authContext = createContext<AuthContextType | null>({
  user: INITIAL_STATE.user,
  loading: INITIAL_STATE.loading,
  error: INITIAL_STATE.error,
  dispatch: () => null,
});
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state]);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
