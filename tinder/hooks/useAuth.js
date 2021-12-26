import React, {createContext, useContext} from 'react'
import { View, Text } from 'react-native'
import * as Google from "expo-google-app-auth"

const AuthContext = createContext({
    //initial state of the context
});


// children is the stack provider
export const AuthProvider = ({children}) => {
    return (
        <AuthContext.Provider value = {{
            user: "Sonny",
            }}
            >
            {children}
        </AuthContext.Provider>
    )
};

export default function useAuth() {
    return useContext(AuthContext);
}


