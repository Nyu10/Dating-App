import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, Text, Button, SafeAreaView } from "react-native";
import useAuth from "../hooks/useAuth";

const HomeSreen = () => {
  const navigation = useNavigation();
  const {logout} = useAuth();

  //get rid of header
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown:false,
  //   })
  // }, []);

  return (
    <SafeAreaView>
      <Text>I am the homescreen</Text>
      <Button title="Go to Chat Screen" onPress={() => navigation.navigate("Chat")} />
      <Button title = "LogOut" onPress = {logout} />
    </SafeAreaView>
  );
};

export default HomeSreen;
