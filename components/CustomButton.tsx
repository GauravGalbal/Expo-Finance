import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ImageSourcePropType,
  Image,
} from "react-native";
import React from "react";
import { images } from "@/constants";
import Icon from "react-native-vector-icons/Ionicons";

interface CustomButtonProps {
  title: string;
  handleOnPress: () => void;
  disabled?: boolean;
  containerStyles?: string;
  textStyles?: string;
  icon?: string | ImageSourcePropType;
  iconColor?: string;
}
export const CustomButtonWithBg = ({
  title,
  handleOnPress,
  disabled,
  containerStyles,
  textStyles,
  icon,
  iconColor,
}: CustomButtonProps) => {
  return (
    <View
      className={`rounded-full overflow-hidden flex-1 bg-primary-purple ${containerStyles}`}
    >
      <ImageBackground
        source={images.lightWave}
        className="bg-primary-purple flex-1"
      >
        <TouchableOpacity
          onPress={handleOnPress}
          className={`relative flex-1 flex-row items-center justify-center rounded-full overflow-hidden  ${
            disabled ? "opacity-50" : "opacity-100"
          }`}
          disabled={disabled}
        >
          <Text
            className={`text-white font-psemibold uppercase text-center z-10 ${textStyles}`}
          >
            {title}
          </Text>
          {icon ? (
            <View className=" items-center justify-center">
              {typeof icon === "string" ? (
                <Icon name={icon} size={16} color={iconColor} />
              ) : (
                <Image source={icon} className="w-5 h-5" resizeMode="contain" />
              )}
            </View>
          ) : (
            ""
          )}
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export const CustomButtonWithoutBg = ({
  title,
  handleOnPress,
  disabled,
  containerStyles,
  textStyles,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      className={`relative flex-1 flex-row items-center justify-center bg-white rounded-full overflow-hidden ${containerStyles} ${
        disabled ? "opacity-50" : "opacity-100"
      }`}
      disabled={disabled}
    >
      <Text
        className={`text-primary-color font-psemibold uppercase text-center z-10 ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export const CustomButtonWithIcon = ({
  title,
  handleOnPress,
  disabled,
  containerStyles,
  textStyles,
  icon,
  iconColor,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handleOnPress}
      className={`relative flex-row items-center justify-center bg-white rounded-full overflow-hidden ${containerStyles} ${
        disabled ? "opacity-50" : "opacity-100"
      }`}
      disabled={disabled}
    >
      {typeof icon === "string" ? (
        <Icon name={icon} size={20} color={iconColor} />
      ) : (
        <Image source={icon} className="w-5 h-5" resizeMode="contain" />
      )}
      <Text
        className={`text-primary-color font-psemibold text-center z-10 ml-3 ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
