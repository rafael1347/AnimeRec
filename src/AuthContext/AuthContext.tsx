import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

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
    initialValue.authenticated
  );
  const [user, setUser] = useState(initialValue.user);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        setAuthenticated(false);
      } else {
        const data = await fetch("http://localhost:5000/me", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "include", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
        });
        const { user, signedIn } = await data.json();
        setAuthenticated(signedIn);
        setUser(user);
      }
    };
    verifyCookie();
  }, [cookies]);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
