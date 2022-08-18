import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeSreen";
import ChatScreen from "../screens/ChatScreen";
import SearchScreen from "../screens/SearchScreen";
import ApplicationScreen from "../screens/ApplicationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Heart from "../bottom-bar-icons/heart.svg";
import Search from "../bottom-bar-icons/search-04.svg";
import Chat from "../bottom-bar-icons/chat-05.svg";
import Application from "../bottom-bar-icons/envelope-03.svg";
import Profile from "../bottom-bar-icons/profile-01.svg";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        // tabBarActiveTintColor: 'tomato',
        // tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Heart fill={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Search fill={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Chat fill={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Application"
        component={ApplicationScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Application fill={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Profile fill={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
