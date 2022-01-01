import React from "react";
import { SafeAreaView, Text } from "react-native";
import Header from "../componenets/Header";
import ChatList from "../componenets/ChatList";
const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" callEnabled/>
      <ChatList/>
    </SafeAreaView>
  );
};

export default ChatScreen;
