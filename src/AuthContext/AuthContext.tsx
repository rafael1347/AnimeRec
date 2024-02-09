import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import React from "react";

type Props = {
  children?: React.ReactNode;
};
type iAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  user: string | undefined;
};
const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
  user: undefined,
};
const AuthContext = createContext<iAuthContext>(initialValue);
const AuthProvider = ({ children }: Props) => {
  const [authenticated, setAuthenticated] = useState(
    initialValue.authenticated,
  );
  const [user, setUser] = useState(initialValue.user);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const verifyCookie = async () => {
      const data = await fetch("https://animerec-api.onrender.com/me", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      });
      const { user, signedIn } = await data.json();
      if (signedIn) {
        setUser(user);
        console.log("verifyCookie:" + user);
        console.log("signedin:" + signedIn);
      } else {
        setAuthenticated(false);
      }
    };
    verifyCookie();
  }, [cookies, user, authenticated]);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
