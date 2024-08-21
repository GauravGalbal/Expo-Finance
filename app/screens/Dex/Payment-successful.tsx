import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { icons, images } from "@/constants";
import { CustomButtonWithBg } from "@/components/CustomButton";

const PaymentSuccessful = () => {
  return (
    <SafeAreaView className="bg-white flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-row justify-between px-4 py-5">
        <TouchableOpacity onPress={() => router.navigate("/(tabs)/trade")}>
          <Icon name="close" size={24} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={icons.download}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 pb-5">
        <View className="flex-1 justify-between min-h-[90vh]">
          <View className="">
            <ImageBackground source={images.bgPattern} resizeMode="cover">
              <View className="h-[167px] justify-center mt-5">
                <View>
                  <Text className="font-psemibold text-[24px] uppercase text-center">
                    Congratulations
                  </Text>
                  <Text className="font-pmedium text-center text-[11px]">
                    You bought your first Cryptocurrencies!
                  </Text>
                </View>
              </View>
            </ImageBackground>

            <View className="p-4 mt-5">
              <View className="flex-row justify-between items-center bg-[#35109D] py-5 px-[18px] rounded-[2px]">
                <View className="flex-row items-center">
                  <View className="w-6 h-6">
                    <Image
                      source={icons.invoice}
                      className="w-6 h-6"
                      resizeMode="contain"
                    />
                  </View>
                  <Text className="font-pmedium text-base text-white ml-2">
                    Required Balance
                  </Text>
                </View>
                <View>
                  <Text className="font-pbold text-base text-white">
                    35 USDT{" "}
                  </Text>
                </View>
              </View>

              <View className="py-3 px-3 border-[0.5px] border-[#DBE1EB] rounded-b-lg">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row">
                    <Image
                      source={icons.eth}
                      className="w-5 h-5 mr-1"
                      resizeMode="contain"
                    />
                    <Text className="font-pregular text-sm text-primary-color uppercase">
                      ETHEREUM
                    </Text>
                  </View>
                  <View>
                    <Text className="font-pregular text-sm text-primary-color uppercase text-right">
                      00.1 ETH
                    </Text>
                    <Text className="font-pregular text-secondary-color text-sm uppercase text-right">
                      $256.0
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row justify-between mt-4 px-4 py-4 border-[0.5px] border-[#DBE1EB] rounded-2xl shadow-lg bg-white">
                <Image
                  source={icons.askKorraCircle}
                  className="w-8 h-8 mr-3"
                  resizeMode="contain"
                />
                <View className="flex-1">
                  <Text className="text-sm font-pmedium mb-4 text-secondary-color">
                    You can track the progress of your investments at any time
                    on your Portfolio Dashboard.
                  </Text>
                  <Text className="text-sm font-pmedium text-secondary-color">
                    Welcome to your Digital Financial future!
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className=" border border-b-0 border-[#DBE1EB] mt-3 px-4 py-4 pb-5 rounded-t-[20px] bg-white">
            <CustomButtonWithBg
              title="GO TO DASHBOARD"
              handleOnPress={() => {}}
              containerStyles="min-h-[56px] max-h-[56px]"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentSuccessful;
