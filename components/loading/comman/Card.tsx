import React from "react";
import { View, Text } from "react-native";
import { NativeWindStyleSheet } from "nativewind";

const Card = () => {
  return (
    <View className="bg-white rounded-2xl p-4 border-[0.6px] border-gray-200 mx-4 mb-4 shadow">
      <View className="flex-row items-start mb-4">
        <View className="w-12 h-12 bg-gray-200 rounded-full mr-3" />
        <View>
          <View className="bg-gray-200 h-3.5 w-24 rounded mb-2" />
          <View className="bg-gray-200 h-2.5 w-56 rounded" />
          <View className="bg-gray-200 h-2.5 w-32 mt-2 rounded" />
        </View>
      </View>
      <View className="bg-white border-[0.6px] border-gray-200 rounded-lg p-3 w-full mb-4">
        <View className="flex-row justify-between mb-2">
          <Text className="font-bold text-sm">Expiry Date</Text>
          <Text className="font-bold text-sm">Time left</Text>
        </View>
        <View className="flex-row justify-between ">
          <View className=" rounded p-2 w-24">
            <View className="bg-gray-200 h-4 w-16 rounded" />
          </View>
          <View className="rounded  p-2 w-24">
            <View className="bg-gray-200 ml-5 h-4 w-16 rounded" />
          </View>
        </View>
      </View>
      <View className="flex-row gap-2 mr-3 justify-between">
        <View className="bg-gray-200 h-10 w-1/2 rounded-full" />
        <View className="bg-gray-200 h-10 w-1/2 rounded-full" />
      </View>
    </View>
  );
};

export default Card;

NativeWindStyleSheet.setOutput({
  default: "native",
});
