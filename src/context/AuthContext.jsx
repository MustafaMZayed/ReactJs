import { createContext, useContext, useReducer } from "react";

const MyContext = createContext();
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthContext({ children }) {
  function reducer(state, action) {
    switch (action.type) {
      case "login":
        return { ...state, user: action.payload, isAuthed: true };
      case "logout":
        return { ...state, user: null, isAuthed: false };
      default:
        throw new Error("unknown action");
    }
  }

  const initialvalue = { user: null, isAuthed: false };
  const [{ user, isAuthed }, dispatch] = useReducer(reducer, initialvalue);
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <MyContext.Provider value={{ user, isAuthed, login, logout }}>
      {children}
    </MyContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(MyContext);
  if (context === undefined) throw new Error("context used out of bounds");
  return context;
}

export default AuthContext;
