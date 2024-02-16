import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

const useUserStore = create((set) => ({
  userData: null,
  initializeUser: () => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      set({ userData: user });
    });
  },
}));

export default useUserStore ;
