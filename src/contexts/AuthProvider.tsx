import React from 'react';
import firebase from 'firebase/app';
import { httpClient } from '../libs/http-client';
import { auth, Provider } from 'shared/firebase';

const AuthContext = React.createContext<any | null>(null);

export function useAuth() {
    return React.useContext(AuthContext);
}

export default function AuthProvider({ children } : { children : React.ReactNode }) {

    const [currentUser, setCurrentUser] = React.useState<firebase.User | null>();
    const [loading, setLoading] = React.useState<boolean>(false);

    function register(email : string, password : string) {
        return auth.createUserWithEmailAndPassword(email, password); // Promise 객체 반환
    }

    function login(email : string, password : string) {
        return auth.signInWithEmailAndPassword(email, password); // Promise 객체 반환
    }

    function login2(email: string, password: string) {
        return httpClient.post<{ token: string }>('/api/user/login', { email, password });
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email : string) {
        return auth.sendPasswordResetEmail(email);
    }

    function githubLogin() {
        return auth.signInWithPopup(Provider.github);
    }

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        register,
        login,
        login2,
        logout,
        resetPassword,
        githubLogin
    }

    return (
        <AuthContext.Provider value={ value }>
            { !loading && children }
        </AuthContext.Provider>
    );
};