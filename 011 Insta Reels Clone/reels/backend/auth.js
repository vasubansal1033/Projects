import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

async function signUp(email, password) {
    return await createUserWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     // ...
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..
    // });
}

async function handleAuthStateChange(setUser,  setLoading) {
    return await onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            setUser(user);
        } else {
            // User is signed out
            setUser(null);
        }
        setLoading(false);
    });
}

async function login(email, password) {
    return await signInWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     // ...
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    // });
}

async function logout() {
    return await signOut(auth)
        // .then(() => {
        //     // Sign-out successful.
        //     console.log('User logged out successfully')
        // }).catch((error) => {
        //     // An error happened.
        // });
}

async function forgotPassword(email) {
    return await sendPasswordResetEmail(auth, email);
}

export { login, signUp, handleAuthStateChange, logout, forgotPassword }