import React from "react";
import { View, ScrollView } from "react-native";
import { NativeWindStyleSheet } from "nativewind";

const CryptoHoldingsSkeletonLoader = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="p-3">
        <View className="bg-gray-200 rounded-xl h-14 mb-4" />
        <View className="flex-row justify-between ">
          {[...Array(5)].map((_, index) => (
            <View key={index} className="bg-gray-200 rounded-xl h-9 w-16" />
          ))}
        </View>
      </View>
      <View className="bg-gray-100 p-2 flex-row justify-between">
        <View className="bg-gray-300 h-5 w-16 rounded" />
        <View className="bg-gray-300 h-5 w-20 rounded" />
      </View>
      <View>
        {[...Array(7)].map((_, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center p-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
              <View>
                <View className="bg-gray-200 h-4 w-24 rounded mb-2" />
                <View className="bg-gray-200 h-3 w-16 rounded" />
              </View>
            </View>
            <View className="bg-gray-200 h-4 w-20 rounded" />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CryptoHoldingsSkeletonLoader;

NativeWindStyleSheet.setOutput({
  default: "native",
});
