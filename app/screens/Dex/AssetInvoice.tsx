import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { icons } from "@/constants";
import { CustomButtonWithBg } from "@/components/CustomButton";

const AssetInvoice = () => {
  const [showInvoice, setShowInvoice] = useState(false);
  return (
    <SafeAreaView className="bg-white flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-row items-center px-4 py-4 border-b-[0.5px] border-[#DBE1EB] bg-white">
        <TouchableOpacity
          className="absolute left-4 z-10"
          onPress={() => router.back()}
        >
          <View className="mr-3">
            <Icon name="arrow-back" size={24} />
          </View>
        </TouchableOpacity>
        <Text className="font-psemibold text-base text-center flex-1 uppercase">
          Select asset
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-between">
          <View className="p-4 border-[0.5px] border-[#DBE1EB] bg-white shadow-xl">
            <View className="flex-row justify-between items-center bg-[#35109D] py-5 px-[18px] rounded-t-xl">
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

            {showInvoice && (
              <View className="py-3 px-3 border-[0.5px] border-[#DBE1EB] rounded-b-lg">
                <View className="flex-row justify-between">
                  <Text className="font-psemibold text-sm text-primary-color uppercase">
                    Total amount
                  </Text>
                  <Text className="font-psemibold text-sm text-primary-color uppercase">
                    235 USDT
                  </Text>
                </View>

                <View className="border-t-[0.5px] border-[#DBE1EB] mt-3" />
                <View className="flex-row justify-between my-4">
                  <Text className="font-pmedium text-[11px] text-secondary-color uppercase">
                    wallet BALANCE
                  </Text>
                  <Text className="font-pregular text-sm text-secondary-color uppercase">
                    200 USDT
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="font-pmedium text-[11px] text-secondary-color uppercase">
                    Add more
                  </Text>
                  <Text className="font-pregular text-sm text-secondary-color uppercase">
                    35 USDT
                  </Text>
                </View>
              </View>
            )}

            <View className="flex-row justify-between mt-3 px-2">
              <Text className="font-psemibold text-[11px] underline text-primary-color">
                Edit
              </Text>
              <TouchableOpacity onPress={() => setShowInvoice(!showInvoice)}>
                <Text className="font-pmedium text-[11px] underline text-primary-purple">
                  {showInvoice ? "Close asset invoice" : "View asset invoice"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-4">
            <View className="px-4">
              <Text className="font-psemibold text-base text-primary-color">
                Additional Payable amount
              </Text>
              <View className="flex-row px-5 py-4 border border-input-border rounded-lg mt-4">
                <TextInput className="flex-1" keyboardType="numeric" />
                <Image
                  source={icons.dollarInCircleSolid}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
              </View>
            </View>

            <View className="flex-row items-center px-4 py-3 mt-8 border-[0.5px] border-[#DBE1EB] bg-[#FFFCF4]">
              <Icon name="alert-circle-outline" size={24} color={"#AE9435"} />
              <View className="ml-2">
                <Text className="text-[12px] font-pbold text-[#AE9435]">
                  Insufficient Wallet Balance{" "}
                </Text>
                <Text className="text-[12px] font-pregular text-[#AE9435]">
                  Add more than $35 to complete the order
                </Text>
              </View>
            </View>

            <View className="p-4 mt-3 border border-b-0 min-h-[108px] rounded-t-[20px] border-[#DBE1EB] shadow-lg bg-white">
              <CustomButtonWithBg
                title="Add wallet balance & Pay"
                handleOnPress={() => {}}
                containerStyles="min-h-[56px] max-h-[56px]"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssetInvoice;
