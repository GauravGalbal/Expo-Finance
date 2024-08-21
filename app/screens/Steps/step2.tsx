import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Link, router, Stack, useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { setExperienceLevel } from "../../../redux/slices/userSlice";
import { ref, set } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { selectUser } from "@/redux/slices/userSelector";
import { icons, images } from "@/constants";

export default function Step2() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user)

  const selectExperienceLevel = async (level: string) => {
    if (!user) return;

    dispatch(setExperienceLevel(level));
  

    router.push("screens/Steps/step3");
    try {
      const userRef = ref(database, `users/${user.uid}/step2`);
      await set(userRef, { experienceLevel: level });
      console.log("Step 2 data saved successfully");
    } catch (error) {
      console.error("Error saving Step 2 data: ", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />
      {/* First Section */}
      <View className="flex-row justify-end mb-3 px-5 pt-10">
        <Link
          href="/screens/Steps/step3"
          className="text-[#375CF0] font-psemibold text-base"
        >
          SKIP
        </Link>
      </View>

      {/* ScrollView Section */}
      <ScrollView className="flex-1 mb-3 px-5">
        <View className="flex-row mb-3">
          <Image
            source={icons.askKorraCircle}
            className="w-10 h-10 mr-4"
            resizeMode="contain"
          />
          <Text className="text-2xl font-psemibold text-black w-[90%]">
            Tell us about your level of experience in trading digital assets...
          </Text>
        </View>

        {/* Second Section */}
        <View className="flex flex-wrap flex-row justify-between items-stretch mb-0 py-8">
          <TouchableOpacity
            className="w-[48%] flex flex-col justify-center items-center h-[168px] px-3 bg-white rounded-xl mb-2 shadow-md"
            onPress={() => selectExperienceLevel("Beginner")}
            activeOpacity={0.7}
          >
            <Text className="font-psemibold text-lg mb-4">Beginner</Text>
            <Text className="text-gray-500 text-center font-pregular text-[12px]">
              I'm completely new to digital assets and cryptocurrency trading
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[48%] flex flex-col justify-center items-center h-[168px] px-3 bg-white rounded-xl mb-2 shadow-md"
            onPress={() => selectExperienceLevel("Intermediate")}
            activeOpacity={0.7}
          >
            <Text className="font-psemibold text-lg mb-7">Intermediate</Text>
            <Text className="text-gray-500 text-center font-pregular text-[12px]">
              I have a basic understanding but limited experience
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[48%] flex flex-col justify-center items-center h-[168px] px-3 bg-white rounded-xl mb-2 shadow-md"
            onPress={() => selectExperienceLevel("Professional")}
            activeOpacity={0.7}
          >
            <Text className="font-psemibold text-lg mb-4">Professional</Text>
            <Text className="text-gray-500 text-center font-pregular text-[12px]">
              I have a strong understanding with intermediate experience
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[48%] flex flex-col justify-center items-center h-[168px] p-4 bg-white rounded-xl mb-2 shadow-md"
            onPress={() => selectExperienceLevel("Expert")}
            activeOpacity={0.7}
          >
            <Text className="font-psemibold text-lg mb-7">Expert</Text>
            <Text className="text-gray-500 text-center font-pregular text-[12px]">
              I have an in-depth understanding and vast experience
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Third Section */}
      <View className="bg-blue-100 p-4 rounded-lg mb-6 mx-5">
        <Text className="text-blue-800 font-psemibold">
          <Text className="font-psemibold text-black">Why this? </Text> It would
          be helpful to know your current experience
        </Text>
      </View>

      <View className="flex-row items-center justify-between mb-5 mx-5">
        <View className="flex flex-col">
          <Text className="text-gray-800 font-psemibold">Step 2/3</Text>
          <View className="flex-row items-center mt-2">
            <View className="w-5 h-1 rounded-full bg-purple-800 mr-1"></View>
            <View className="w-5 h-1 rounded-full bg-purple-800 mr-1"></View>
            <View className="w-3 h-1 rounded-full bg-gray-300"></View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("screens/Steps/step3")}
          className="flex-row items-center bg-purple-800 p-3 rounded-full"
        >
          <Image
            source={require("../../../assets/images/individualAssets/bgDarkWaveLarge.png")}
            className="absolute w-28 h-10 rounded-full z-10 ml-1 opacity-70"
            resizeMode="cover"
          />
          <View className="flex flex-row z-20 px-5">
            <Text className="text-white font-psemibold mr-2">NEXT</Text>
            <Icon name="arrow-forward" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
