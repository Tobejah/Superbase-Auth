import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    // Sign up new user
    const signUpNewUser = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.log("Error signing up:", error);
            return { success: false, error };
        }
        return { success: true, data };
    };


    // Sign in user
    const signInUser = async (email, password) => {
        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (signInError) {
                console.error("Sign-in error occurred:", signInError);
                return { success: false, error: signInError.message };
            }

            console.log("Sign-in successful:", data);
            return { success: true, data };
        } catch (error) {
            console.error("An error occurred:", error);
            return { success: false, error: error.message };
        }
    };


    // Get session and listen for auth changes
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    // Sign Out User
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log("An error occurred:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
