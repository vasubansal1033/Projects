import React, { useEffect, useState } from 'react'
import { handleAuthStateChange, login, logout, forgotPassword, signUp } from './auth';
import { AuthContext } from '../context/AuthContext';

function AuthWrapper({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function stateChangeHandler() {
            await handleAuthStateChange(setUser, setLoading);
        };
        stateChangeHandler();
    }, [user]);

    const authStore = {
        login,
        logout,
        forgotPassword,
        signUp,
        user,
        loading
    }

    return (
        <AuthContext.Provider value={authStore}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthWrapper