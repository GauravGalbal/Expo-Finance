import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  Easing,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getCurrentUser, getDataFromDatabase } from "@/utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { UseSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "@/redux/slices/userSelector";
import { Link, Redirect, router } from "expo-router";
import {
  clearUser,
  fetchUsers,
  setUser,
  signOut,
} from "@/redux/slices/userSlice";

import { Stack } from "expo-router";
import { AppDispatch } from "@/redux/store/store";

export default function Welcome() {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  console.log(user);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  useEffect(() => {
    const subscriber = getCurrentUser((user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            experienceLevel: "",
            users: "",
          })
        );
        dispatch(fetchUsers(user.uid));
        // dispatch(signOut());
      } else {
        dispatch(clearUser());
      }
    });

    return subscriber;
  }, []);

  const handlePress = () => {
    router.push("screens/Authentication/login");
    // navigation.navigate("screens/Steps/step1");
  };


  const getUserDoc = async (userId: string) => {
    const user = await getDataFromDatabase(`users/${userId}`);

    return user;
  };

  useEffect(() => {
    const fetch = async () => {
      if (isLoggedIn) {
        if (user?.uid) {
          const userObj = await getUserDoc(user.uid);
          if (userObj?.step1?.username) {
            return router.replace("/(tabs)");
          }
        }
        router.replace("screens/Steps/step1");
      }
    };
    fetch();
  }, [isLoggedIn]);

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-5">
      <Stack.Screen
        options={{
          title: "Welcome Screen",
          headerStyle: { backgroundColor: "#4B17DD" },
          headerTintColor: "#fff",
          headerShown: false,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      />
      <Image
        className="mb-16"
        source={require("../assets/images/welcomePage/korraLogo.png")}
        style={{ width: 400, height: 300 }}
      />
      <Animated.Text
        className="text-4xl text-black mb-1 text-center font-pbold"
        style={{ transform: [{ translateX: slideAnim }] }}
      >
        Welcome to Korra
      </Animated.Text>
      <Text className="text-gray-500 text-base text-center mb-10 font-pregular">
        Your AI partner for smarter digital investments
      </Text>
      <View className="absolute bottom-12 w-full flex items-center">
        <TouchableOpacity
          className="bg-primary-purple p-4 w-full rounded-full flex-row items-center justify-center"
          onPress={handlePress}
        >
          <Image
            source={require("../assets/images/individualAssets/bgDarkWaveLarge.png")}
            className="absolute w-80 opacity-30 h-12 rounded-full z-10"
            resizeMode="cover"
          />
          <Text className="text-white ml-4 pr-2 z-20 font-pbold">
            LET'S GET STARTED
          </Text>
          <Icon name={"arrow-forward-outline"} color={"white"} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
