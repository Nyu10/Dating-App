import React from 'react'
import { Button, View, Text } from 'react-native'
import useAuth from '../hooks/useAuth';


const LoginScreen = () => {
    const { signInWithGoogle } = useAuth();

    return (
        <View>
            <Text>Login to the App</Text>
            <Button title = "login" onPress = {signInWithGoogle} />
        </View>
    );
};

export default LoginScreen;
