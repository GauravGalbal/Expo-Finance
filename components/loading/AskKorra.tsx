import { icons } from "@/constants";
import * as React from "react";
import { View, Text, Image } from "react-native";

function AskKorraLoading() {
  return (
    <View className="flex flex-col justify-between h-full pt-1.5 bg-white ">
      <View className="flex flex-col justify-center px-2 py-1.5 w-full">
        <View className="flex flex-row gap-2 w-full">
          <Image
            source={icons.askKorraCircle}
            className="w-6 h-6  "
            resizeMode="contain"
          />
          <View className="flex flex-col w-full pr-16">
            <View className="flex flex-col justify-center items-start mr-20 px-4 py-3 bg-white rounded-xl border border-solid shadow-sm border-zinc-200">
              <View className="shrink-0 h-3 rounded-md bg-zinc-300 w-[170px]" />
            </View>
            <View className="flex flex-col p-4 mt-1.5 bg-white rounded-xl border border-solid shadow-sm border-zinc-200">
              <View className="shrink-0 h-3 rounded-md bg-zinc-300" />
              <View className="shrink-0 mt-3 h-2 rounded-md bg-zinc-300" />
              <View className="shrink-0 mt-3 h-2 rounded-md bg-zinc-300" />
              <View className="shrink-0 mt-3 h-2 rounded-md bg-zinc-300" />
              <View className="shrink-0 mt-3 h-2 rounded-md bg-zinc-300" />
            </View>
            <View className="flex flex-col justify-center p-4 mt-1.5 bg-white rounded-xl border border-solid shadow-sm border-zinc-200">
              <View className="shrink-0 h-2.5 rounded-md bg-zinc-300" />
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-col  z-10 justify-center items-center py-3 mt-11 w-full bg-white rounded-3xl border rounded-b-none shadow-sm border-zinc-200">
        <View className="flex flex-row gap-2 items-start px-4 pb-3 w-full text-xs font-medium text-zinc-100">
          <View className="px-2.5 py-2 text-transparent border border-solid bg-zinc-100 border-zinc-200 rounded-[50px]">
            <Text className="text-transparent">Buy a car</Text>
          </View>
          <View className="self-stretch px-5 py-2 max-w-lg border border-solid bg-zinc-100 border-zinc-200 rounded-[50px]">
            <Text className="text-transparent px-5">
              Child education Saving
            </Text>
          </View>
          <View className="px-2.5 py-2 whitespace-nowrap border border-solid bg-zinc-100 border-zinc-200 rounded-[50px]">
            <Text className="text-transparent">Traveling</Text>
          </View>
        </View>
        <View className="flex flex-col justify-center mt-6 px-4 w-full">
          <View className="flex gap-5 ml-2 justify-center items-center p-6 rounded-lg border border-solid bg-zinc-100 border-zinc-200"></View>
        </View>
      </View>
    </View>
  );
}

export default AskKorraLoading;
