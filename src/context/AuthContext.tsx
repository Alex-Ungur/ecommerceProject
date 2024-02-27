import {
  ReactNode,
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { login, logout } from "../firebase/auth";

interface Props {
  children?: ReactNode;
}

interface IAuth {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  // register: (email: string, password: string) => Promise<User>;
  logOut: () => Promise<void>;
}
export const AuthContext = createContext({} as IAuth);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, initializeUser);
    return unsuscribe;
  }, []);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async function initializeUser(user) {
    if (user) {
      console.log("user from login page", user);
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value = {
    currentUser,
    loading,
    userLoggedIn,
    login: login,
    logOut: logout,
  };
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <AuthContext.Provider value={value}>
      {/* {!loading && children} */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
