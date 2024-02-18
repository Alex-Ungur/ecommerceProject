import {
  ReactNode,
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

interface Props {
  children?: ReactNode;
}

interface IAuth {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
}
export const AuthContext = createContext<IAuth | null>(null);

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
  };
  return (
    <AuthContext.Provider value={value}>
      {/* {!loading && children} */}
      {children}
    </AuthContext.Provider>
  );
}
