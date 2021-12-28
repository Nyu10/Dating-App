import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
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
import {
  onSnapshot,
  doc,
  collection,
  setDoc,
  query,
  getDoc,
  getDocs,
  where,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generated";

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
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);
  //if user profile does not exists, pop up the modal screen
  //here
  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          // @ts-ignore
          navigation.navigate("Modal");
        }
      }),
    []
  );
  // //get rid of header
  // // useLayoutEffect(() => {
  // //   navigation.setOptions({
  // //     headerShown:false,
  // //   })
  // // }, []);
  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const passedUserIds = passes.length > 0 ? passes : ["none"];
      const swipedUserIds = swipes.length > 0 ? passes : ["none"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };
    fetchCards();
    return unsub;
  }, [db]);
  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    console.log(`You swiped PASS on ${userSwiped.displayName}`);
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };
  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];

    const loggedInProfile = await (
      await getDoc(doc(db, "users", user.uid))
    ).data();

    //Check if the user swiped on you...
    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (snapshot) => {
        
        setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
        //they have swiped on you, so it's a match
        if (snapshot.exists) {
          console.log(`Hooray, You MATCHED with ${userSwiped.displayName}`);
          setDoc(doc(db, 'matches', generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });
          navigation.navigate('Match', {
            loggedInProfile, userSwiped,
          })
        }
        else{
          //either first interaction or they didn't swipe on you
          console.log(`You swiped on ${userSwiped.displayName} (${userSwiped.job})`);
        }
      }
    );

  };
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

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              // @ts-ignore
              "Modal"
            )
          }
        >
          <Image
            style={tw("h-14 w-14")}
            source={require(// @ts-ignore
            "../logo.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              // @ts-ignore
              "Chat"
            )
          }
        >
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
      {/* header end */}

      {/* cards */}
      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
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
          renderCard={(card) =>
            card ? (
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
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>

                  <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tw(
                    "relative bg-white h-3/4 rounded-xl justify-center items-center"
                  ),
                  styles.cardShadow,
                ]}
              >
                <Text style={tw("pb-5 font-bold")}> No more profiles </Text>
                <Image
                  style={tw("h-20 w-full")}
                  height={100}
                  width={100}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
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
