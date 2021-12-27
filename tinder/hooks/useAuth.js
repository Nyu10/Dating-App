import React, { createContext, useContext } from "react";
import * as Google from "expo-google-app-auth";
// import * as Google from 'expo-auth-session/providers/google';
const AuthContext = createContext({
  //initial state of the context
});

const config = {
  //use environment variables in production
  androidClientId:
    "488464302281-rvjcb61ub7hiddkqsohtffuv9l9u0gnj.apps.googleusercontent.com",
  iosClientId:
    "488464302281-4c27j6mjci6p78k2c65gd850a28hho26.apps.googleusercontent.com",
  // clientId:
  //   "488464302281-giolut0ogbelqero5hn5ph4q3c47euid.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

// children is the stack provider
export const AuthProvider = ({ children }) => {
  const signInWithGoogle = async () => {
    console.log("here");
    console.log("here1");
    // Google.logInAsync(config).then(async (logInResult) => {
    try {
      const result = await Google.logInAsync(config);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: null,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
