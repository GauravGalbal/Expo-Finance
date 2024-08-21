import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Loader = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });


  return (
    <Animated.View
      className="relative h-16 w-16  rounded-full overflow-hidden justify-center"
      style={{
        transform: [{ rotate }],
      }}
    >
      <LinearGradient
        colors={[
          "#4B17DD",
          "#4B17DD",
          "#4B17DD",
          "#4B17DD",
          "#4B17DD80",
          "#4B17DD80",
          "#76739900",
          "#76739900",
          "transparent",
        ]}
        className="h-16 w-16"
      />
      <View className="absolute w-14 h-14 bg-white border-red z-40 rounded-full self-center"></View>
    </Animated.View>
  );
};

export default Loader;
