import React from "react";
import StackNavigator from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeSreen";
import ChatScreen from "./screens/ChatScreen";

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      {/* Higher order component HOC */}
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
