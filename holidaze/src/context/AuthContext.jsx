import React, { createContext, useState, useContext, useEffect } from 'react';
import { save, load, remove } from '../components/localstorage/localstorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initialToken = load('authToken');
    const initialUser = load('authUser') || null;
    const [token, setToken] = useState(initialToken);
    const [user, setUser] = useState(initialUser);
    const isAuthenticated = !!token;

    useEffect(() => {
        if (token) {
            save('authToken', token);
        } else {
            remove('authToken');
        }
    }, [token]);

    useEffect(() => {
        if (user && Object.keys(user).length) {
            save('authUser', user);
        } else {
            remove('authUser');
        }
    }, [user]);

    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
    };


    const logout = () => {
        setToken(null);
        setUser({});
    };

    const contextValue = {
        token,
        user,
        isAuthenticated,
        login,
        logout
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const auth = useContext(AuthContext);
    if (!auth) throw new Error("useAuth must be used within an AuthProvider");
    return auth;
};
