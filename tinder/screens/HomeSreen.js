import React from "react";
import { useNavigation } from "@react-navigation/core";
import { View, Text, Button } from "react-native";

const HomeSreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>I am the homescreen</Text>
      <Button title="Go to Chat Screen" onPress={() => navigation.navigate("Chat")} />
    </View>
  );
};

export default HomeSreen;
