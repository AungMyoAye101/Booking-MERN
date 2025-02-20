import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: "",
  dates: [],
  options: {
    adlut: undefined,
    children: undefined,
    room: undefined,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;

    default:
      return state;
  }
};

const searchContext = createContext(INITIAL_STATE);

const SearchContextProvider = ({ children }: { childern: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <searchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.option,
        dispatch,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

export default SearchContextProvider;
