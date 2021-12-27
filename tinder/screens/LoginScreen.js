import React , {useLayoutEffect}from 'react'
import { Button, View, Text, ImageBackground, TouchableOpacity} from 'react-native'
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import tw from "tailwind-rn";

const LoginScreen = () => {
    const { signInWithGoogle, loading } = useAuth();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false, 
        })
    }, []);
    return (
        <View style = {tw("flex-1")}>
            <ImageBackground
            resizeMode="cover"
            style={tw("flex-1")}
            source = {{uri: "https://tinder.com/static/tinder.png"}}
            >
            </ImageBackground>
            <TouchableOpacity style ={[tw("absolute bottom-40 w-52 bg-white p-4 rounded-2xl"), {marginHorizontal: "25%"}]} onPress={signInWithGoogle}>
            <Text style = {tw("font-semibold text-center")} > Sign In & Find Your Perfect Match</Text>
            </TouchableOpacity>

        </View>
    );
};

export default LoginScreen;
