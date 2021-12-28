import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "tailwind-rn";

const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View style={[tw("h-full bg-red-500 pt-20"), { opacity: 0.89 }]}>
      <View style={tw("justify-center px-10, pt-20")}>
        <Image source={{ uri: "https://links.papareact.com/mg9" }} />
      </View>
      <Text style={tw("text-white text-center mt-5")}>
        You and {userSwiped.displayName} have liked each other.
      </Text>
      <View style={tw("flex-row justify-evenly mt-5")}>
        <Image
          style={tw("h-32 w-32 rounded-full")}
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image
          style={tw("h-32 w-32 rounded-full")}
          source={{ uri: userSwiped.photoURL }}
        />
      </View>
    </View>
  );
};

export default MatchedScreen;
