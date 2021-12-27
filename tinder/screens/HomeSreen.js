import React, { useLayoutEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

const DUMMY_DATA = [
  {
    firstName: "Katara",
    lastName: "Avatar",
    job: "Water Bender",
    photoURL:
      "https://i.pinimg.com/originals/c8/20/d3/c820d3264bcd73a93f192fd9ea83ffe5.jpg",
    age: "16",
    id: 123,
  },
  {
    firstName: "Suki",
    lastName: "Avatar",
    job: "Kyoshi Warrior",
    photoURL:
      "https://static.wikia.nocookie.net/p__/images/5/56/Suki%27s_crossed_arms.jpg/revision/latest/scale-to-width-down/250?cb=20211203012811&path-prefix=protagonist",
    age: "16",
    id: 456,
  },
  {
    firstName: "Aang",
    lastName: "Avatar",
    job: "The Last Airbender",
    photoURL:
      "https://discourse.disneyheroesgame.com/uploads/default/original/3X/d/6/d68591754a91eddc8a41428609d7899e1298bd4b.png",
    age: "12",
    id: 789,
  },
];

const HomeSreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swipeRef = useRef(null);
  console.log(user);

  //get rid of header
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown:false,
  //   })
  // }, []);

  return (
    <SafeAreaView style={tw("flex-1")}>
      {/* header */}
      <View style={tw("flex-row items-center justify-between px-5")}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw("h-10 w-10 rounded-full")}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress ={()=> navigation.navigate("Modal")}>
          <Image style={tw("h-14 w-14")} source={require("../logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      {/* header end */}

      {/* cards */}
      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={DUMMY_DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={() => {
            console.log("Swipe PASS");
          }}
          onSwipedRight={() => {
            console.log("Swipe MATCH");
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) => (
            <View key={card.id} style={tw("bg-white-500 h-3/4 rounded-xl")}>
              <Image
                style={tw("absolute top-0 h-full w-full rounded-xl")}
                source={{ uri: card.photoURL }}
              />
              <View
                style={[
                  tw(
                    "absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl"
                  ),
                  styles.cardShadow,
                ]}
              >
                <View>
                  <Text style={tw("text-xl font-bold")}>
                    {card.FirstName}
                    {card.lastName}
                  </Text>
                  <Text>{card.job}</Text>
                </View>

                <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* cards end */}
      <View style={tw("flex flex-row justify-evenly")}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-red-200"
          )}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-green-200"
          )}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeSreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
