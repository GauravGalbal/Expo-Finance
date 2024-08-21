import { View, Text, TouchableOpacity, Animated } from "react-native";
import React from "react";

interface FilterButtonProps {
  option: string;
  handleSelect?: (option: string) => void;
  containerStyles?: string;
  selected: boolean;
}
const FilterButton = ({
  option,
  handleSelect,
  containerStyles,
  selected,
}: FilterButtonProps) => {
  // const active = true;

  const handleOnPress = () => {
    handleSelect?.(option);
  };
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View
        className={`py-[7.5px] flex items-center justify-center border  rounded-lg shadow-md ${
          selected
            ? "border-[#6F45E4] bg-[#6F45E4]/20 text-[#6F45E4] px-[10px]"
            : "border-[#DBE1EB] bg-white px-[10px]"
        } ${containerStyles}`}
      >
        <Text
          className={`text-[11px] font-pmedium bg-transparent ${
            selected ? "text-[#6F45E4]" : "text-secondary-color/70"
          }`}
        >
          {option}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FilterButton;
