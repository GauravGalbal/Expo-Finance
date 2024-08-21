import React from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Link, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import { router } from "expo-router";

function Profile() {
  const transactions = [
    {
      id: 1,
      date: "12 Jul,2023",
      tokenName: "bnb",
      operation: "deposit",
      coin: "USDT",
      amount: "9,407.87",
    },
    {
      id: 2,
      date: "12 Jul,2023",
      tokenName: "bnb",
      operation: "deposit",
      coin: "USDT",
      amount: "9,407.87",
    },
    {
      id: 3,
      date: "12 Jul,2023",
      tokenName: "bnb",
      operation: "deposit",
      coin: "USDT",
      amount: "9,407.87",
    },
    {
      id: 4,
      date: "12 Jul,2023",
      tokenName: "bnb",
      operation: "deposit",
      coin: "USDT",
      amount: "9,407.87",
    },
    {
      id: 5,
      date: "12 Jul,2023",
      tokenName: "bnb",
      operation: "deposit",
      coin: "USDT",
      amount: "9,407.87",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        {/* <Stack.Screen
          options={{
            title: "My profile",
            headerStyle: { backgroundColor: "white" },
            headerTintColor: "black",
            headerTitleStyle: {
              fontWeight: "normal",
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
            },
            headerTitleAlign: "left",
            headerShadowVisible: false,
            contentStyle: {
              borderTopColor: "#DBE1EB",
              borderTopWidth: 0.5,
            },
          }}
        /> */}
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <View className="flex-row items-center px-4 py-4 border-b-[0.5px] border-[#DBE1EB] bg-white">
          <TouchableOpacity
            className="absolute left-4 z-10"
            onPress={() => router.back()}
          >
            <View className="mr-3">
              <Icon name="arrow-back" size={24} />
            </View>
          </TouchableOpacity>
          <Text className="font-psemibold text-base text-center flex-1 capitalize">
            My profile
          </Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
          {/* Section1 */}
          <ImageBackground source={images.bgPattern} resizeMode="cover">
            <View className="flex flex-row justify-between mb-6 px-4">
              <View>
                <Image
                  source={{ uri: "https://via.placeholder.com/100" }}
                  className="w-24 h-24 rounded-full mb-4"
                />
              </View>
              <View className="flex flex-col justify-center gap-y-1 items-start">
                <Text className="text-sm font-psemibold">Mark wood</Text>
                <Text className="text-gray-600 font-pregular">
                  markwood@example.com
                </Text>
                <TouchableOpacity>
                  <Text className="text-white bg-black font-pregular underline px-2 py-1 rounded-full">
                    Profile edit
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <Link href="/screens/SettingsScreen/SettingsScreen">
                  <Icon name="settings" size={28} color="black" />
                </Link>
              </View>
            </View>
          </ImageBackground>

          {/* Section2 */}
          <View className="px-4">
            <View className="bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-md ">
              {/* Section2.1 */}

              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-col">
                  <Text className="text-lg font-psemibold">My Wallet</Text>
                  <Text className="text-base text-gray-500 font-pregular">
                    Copy wallet address
                  </Text>
                </View>
                <View>
                  <TouchableOpacity className="bg-primary-purple  px-3 py-1 rounded-full">
                    <Text className="text-white font-pregular">Open</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Section2.2 */}
              <View className="bg-white border-[0.5px] border-[#DBE1EB] rounded-[11px] flex flex-row justify-between items-center px-4 py-2 mt-3">
                <View className=" h-[53px] w-[59px]">
                  <Image
                    source={icons.korraWallet}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                </View>
                <Text className="font-pregular">19i91283u128398du2</Text>
                <Icon name="copy-outline" size={20} />
              </View>
            </View>
          </View>
          {/* Section3 */}
          <View className="bg-white border border-gray-200 px-4 py-5 mt-3 rounded-t-3xl ">
            {/* Section3.1 */}

            <View className="flex flex-row justify-between items-center mb-4">
              <Text className="text-lg font-psemibold">
                Transaction History
              </Text>
              <View>
                <TouchableOpacity className="bg-primary-purple px-3 py-1 rounded-full">
                  <Text className="text-white font-pregular">Open</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Section3.2 */}
            <View className="flex flex-col gap-y-2">
              {transactions?.map((transaction, index) => (
                <View
                  key={transaction.id}
                  className="bg-white border-[0.5px] border-[#DBE1EB] rounded-[14px] px-2 py-2"
                >
                  <View className=" rounded-xl p-1 px-2 flex flex-row justify-between items-center">
                    <Text className="font-psemibold text-lg uppercase">
                      {transaction.tokenName}
                    </Text>
                    <Text className="font-psemibold">{transaction.date}</Text>
                  </View>
                  <View className=" rounded-xl p-1 px-2 flex flex-row justify-between items-center">
                    <Text className="font-psemibold text-[#375CF0] bg-primary-purple/5 rounded-full border border-[#375CF0] px-2 py-1 text-xs ">
                      {transaction.operation}
                    </Text>
                    <View className="flex flex-row justify-between">
                      <Text className=" text-green-500 mr-1 font-psemibold">
                        {transaction.coin}
                      </Text>
                      <Text className="font-psemibold">
                        {transaction.amount}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Profile;
