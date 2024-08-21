import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface GaugeProps {
  value: number;
  maxValue: number;
}

const Gauge: React.FC<GaugeProps> = ({ value, maxValue }) => {
  const determineCircleSpot = (value: number) => {
    interface Types {
      [key: number]: string;
    }
    let positionStyles: Types = {
      1: "bottom-[0px] left-[-4px] bg-[#ff0000]",
      2: "bottom-[20px] left-[-4px] bg-[#ff0000]",
      3: "bottom-[50px] left-[6px] bg-[#ff0000]",
      4: "bottom-[80px] left-[35px] bg-[#ff0000]",
      5: "bottom-[90px] left-[55px] bg-[#ff0000]",
      6: "bottom-[96px] left-[90px] bg-[#ff0000]",
      7: "bottom-[95px] right-[75px] bg-[#FCB500]",
      8: "bottom-[80px] right-[40px] bg-[#FFEB3A]",
      9: "bottom-[40px] right-[7px] bg-[#7FE47E]",
      10: "bottom-[0px] right-[-2px] bg-[#7FE47E]",
    };

    return positionStyles[value];
  };

  // console.log(determineCircleSpot(value));

  return (
    <View>
      <View>
        <View className="relative w-[214px] h-[110px] borde overflow-hidden rounded-ful">
          <View className="w-[212px] h-[200px] rounded-full flex-row overflow-hidden bg-slate-100">
            <View className="w-[20px] h-full  bg-[#ff0000]"></View>
            <View className="w-[20px] h-full  bg-[#ff0000]"></View>
            <View className="w-[20px] h-full  bg-[#ff0000]"></View>
            <View className="w-[20px] h-full  bg-[#ff0000]"></View>
            <View className="w-[20px] h-full  bg-[#ff0000]"></View>
            <View className="w-[10px] h-full  bg-[#ff0000] mr-1"></View>
            <View className="w-[30px] h-full  bg-[#FCB500] mr-1"></View>
            <View className="w-[30px] h-full  bg-[#FFEB3A] mr-1"></View>
            <View className="w-[10px] h-full rounded-tr-ful bg-[#7FE47E]"></View>
            <View className="w-[20px] h-full rounded-tr-ful bg-[#7FE47E]"></View>
            {/* <View className="w-[20px] h-full rounded-tr-ful bg-green-500"></View> */}
            <View className="w-[90%] h-[90%] bg-slate-50 absolute bottom-3 left-[10px] z-10 rounded-full"></View>
          </View>
        </View>
        <View
          className={`w-[20px] h-[20px] absolute z-30 rounded-full items-center justify-center ${determineCircleSpot(
            value
          )}`}
        >
          <View className="w-[10px] h-[10px] bg-black rounded-full"></View>
        </View>
        <View className="w-[11px] h-[20px] absolute bottom-[-3px] right-[2.7px] bg-[#7FE47E] rounded-full"></View>
        <View className="w-[11px] h-[20px] absolute bottom-[-3px] left-[-0.6px] bg-[#ff0000] rounded-full"></View>
      </View>
      <View className="w-[150px] h-[100px] absolute bottom-[-50px] left-[30px] justify-center items-center z-40">
        <Text className="font-psemibold text-3xl text-primary-purple">{`${value}/${maxValue}`}</Text>
        <Text className="font-pmedium text-[8px] text-primary-purple text-center mt-5">
          Contract Safety Rating
        </Text>
      </View>
    </View>
  );
};

export default Gauge;

// 1: "bottom-[0px] left-[-4px]"
// 2: "bottom-[20px] left-[-4px]"
// 3: "bottom-[50px] left-[6px]"
// 4: "bottom-[80px] left-[35px]"
// 5: "bottom-[90px] left-[55px]"
// 6: "bottom-[96px] left-[90px]"
// 7: "bottom-[95px] right-[75px]"
// 8: "bottom-[80px] right-[40px]"
// 9: "bottom-[40px] right-[7px]"
// 10: "bottom-[0px] right-[-2px]"
