import React from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { Link, Stack, useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";

export default function Step2() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-col justify-between h-screen bg-gray-50 px-5 pt-1">
        <Stack.Screen options={{ headerShown: false }} />
        <StatusBar barStyle="dark-content" />
        {/* First Section */}
        <View>
          <View className="flex-row justify-end mb-3">
            <Link
              href="/(tabs)"
              className="text-[#375CF0] font-psemibold text-base"
            >
              SKIP
            </Link>
          </View>

          <View className="flex-row px-4">
            <Image
              source={icons.askKorraCircle}
              className="w-10 h-10 mr-4"
              resizeMode="contain"
            />
            <Text className="text-xl font-psemibold text-black w-[90%]">
              Great! Your wallet has been successfully created.
            </Text>
          </View>
        </View>

        {/* Second Section */}
        <View className="bg-[#F4FBFF] border border-[#DBE1EB] rounded-2xl p-1 ">
          <View className="flex flex-row justify-center items-center bg-[#F4FBFF] border border-[#DBE1EB] rounded-2xl p-4">
            {/* <View className="border justify-center items-center"> */}
            <Image
              source={icons.korraWallet}
              className="w-[100px] h-[85px]"
              resizeMode="contain"
            />
            {/* </View> */}
            <View className="flex flex-col px-4">
              <Text className="text-left mb-3 font-psemibold capitalize text-sm ">
                my korra wallet
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("/")}
                className="flex-row items-center justify-center bg-primary-purple p-4 rounded-lg flex-1 w-full"
              >
                <Image
                  className="w-4 h-4 mr-2"
                  source={icons.dollarInCircle}
                  resizeMode="contain"
                />
                <Text className="text-white font-psemibold uppercase mr-2 text-center">
                  fill wallet
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("(tabs)")}
              className="flex-row items-center justify-center bg-white border border-[#B8BEC7] mt-[2px] p-5 rounded-2xl w-full"
            >
              <Icon name={"add-outline"} color={"black"} size={24} />
              <Text className="text-black font-psemibold ml-2 uppercase text-center">
                connect existing wallets
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View className="flex flex-col justify-center items-center mt-5 ">
            <TouchableOpacity
              onPress={() => navigation.navigate("(tabs)")}
              className=" relative flex-row items-center justify-center bg-primary-purple rounded-full p-5 w-full overflow-hidden"
            >
              <Text className="text-white font-psemibold px-4 uppercase mr-2 text-center z-10">
                let's build my portfolio
              </Text>
              <ImageBackground
                source={images.lightWave}
                className="w-[400] h-[100] absolute border"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          <View className="bg-blue-100 p-4 rounded-lg mt-6">
            <Text className="text-blue-800 font-psemibold">
              <Text className="font-psemibold text-black">
                What to crypto wallet?{" "}
              </Text>{" "}
              Crypto Wallet act like a b..
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
