import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { images } from "@/constants";
import { CustomButtonWithBg, CustomButtonWithoutBg } from "../CustomButton";

export interface AirdropData {
  id: string;
  name: string;
  description: string;
  image: ImageSourcePropType;
  expiryDate?: string;
  timeLeft?: string;
}
interface AirdropCardProps {
  airdropData: AirdropData;
  onClaimPress?: () => void;
  onDetailsPress?: () => void;
}

export const AirdropCardUnClaimed = ({
  airdropData,
  onClaimPress,
  onDetailsPress,
}: AirdropCardProps) => {
  const handleClaimPress = () => {
    onClaimPress?.();
  };
  const handleDetailsPress = () => {
    onDetailsPress?.();
  };
  return (
    <View className="bg-white px-3 py-4 rounded-2xl border-[0.5px] border-[#DBE1EB] mb-3 shadow-sm shadow-primary-purple">
      <View className="flex-row items-start mb-4">
        <View className="w-[44px] h-[44px] mr-3">
          <Image
            source={airdropData.image}
            className="w-full h-full rounded-full"
            resizeMode="contain"
          />
        </View>
        <View className="flex-1">
          <Text className="font-psemibold text-base mb-[10px]">
            {airdropData.name}
          </Text>
          <Text className="font-pregular text-secondary-color text-sm">
            {airdropData.description}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between px-2 pt-[18px] pb-[14px] border-[0.5px] bg-white border-[#DBE1EB] shadow-xl mb-4 rounded-lg">
        <View>
          <Text className="font-psemibold text-[12px]">Expiry Date</Text>
          <View className="border-[0.5px] bg-[#F1ECFF] border-primary-purple shadow-xl py-[10px] px-2 rounded-[4px] min-w-[77px]">
            <Text className="font-pregular text-[12px] text-center whitespace-nowrap">
              {airdropData.expiryDate}
            </Text>
          </View>
        </View>
        <View>
          <Text className="font-psemibold text-[12px] text-center">
            Time left
          </Text>
          <View className="border-[0.5px] bg-[#F1ECFF] border-primary-purple shadow-xl py-[10px] px-2 rounded-[4px] min-w-[77px]">
            <Text className="font-psemibold text-[12px] text-center whitespace-nowrap">
              {airdropData.timeLeft}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row">
        <CustomButtonWithoutBg
          title="View details"
          handleOnPress={handleDetailsPress}
          containerStyles="border border-input-border shadow-2xl mr-1 py-2 min-h-[44px] flex-1"
        />
        <CustomButtonWithBg
          title="Claim"
          handleOnPress={handleClaimPress}
          containerStyles="shadow-2xl min-h-[44px] flex-1"
        />
      </View>
    </View>
  );
};

export const AirdropCardClaimed = ({
  airdropData,
  onClaimPress,
  onDetailsPress,
}: AirdropCardProps) => {
  const handleClaimPress = () => {
    onClaimPress?.();
  };
  const handleDetailsPress = () => {
    onDetailsPress?.();
  };
  return (
    <View className="bg-white px-3 py-4 rounded-2xl border-[0.5px] border-[#DBE1EB] mb-3 shadow-2xl shadow-black">
      <View className="flex-row items-start justify-center mb-6">
        <View className="w-[44px] h-[44px] mr-3">
          <Image
            source={airdropData.image}
            className="w-full h-full rounded-full"
            resizeMode="contain"
          />
        </View>
        <View className="flex-1">
          <Text className="font-psemibold text-base mb-[10px]">
            {airdropData.name}
          </Text>
          <Text className="font-pregular text-secondary-color text-sm">
            {airdropData.description}
          </Text>
        </View>
      </View>

      <View className="flex-row">
        <CustomButtonWithoutBg
          title="View details"
          handleOnPress={handleDetailsPress}
          containerStyles="border border-input-border shadow-sm mr-1 min-h-[44px] py-2 flex-1"
        />
        <CustomButtonWithBg
          title="Claimed"
          handleOnPress={handleClaimPress}
          containerStyles="shadow-sm min-h-[44px] shadow-primary-purple flex-1"
        />
      </View>
    </View>
  );
};
