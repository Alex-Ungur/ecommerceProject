import { sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { auth } from "./firebase-config";

export const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

// export const resetPassword = (email : string) => {
//     return sendPasswordResetEmail(auth, email);
// }
// export const changetPassword = (password : string) => {
//     return updatePassword(auth.currentUser, password);
// }

export const logout = () => {
    return auth.signOut();  
}
