import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "6503f07cfc6ae89eb661e98f",
    username: "ana",
    email: "ana@gmail.com",
    followings: [],
    followers: [],
    coverPicture: "person/defaultBackground.jpg",
    profilePicture: "person/1.jpeg",
    city: "New York",
    from: "Marid",
    relationship: 2
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
