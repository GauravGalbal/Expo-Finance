import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";

interface CustomHeaderSwitchProps {
  routes: string[];
  onFocusRoute: (route: string) => void;
}
const CustomHeaderSwitch = ({
  routes,
  onFocusRoute,
}: CustomHeaderSwitchProps) => {
  const [isFocused, setIsFocused] = useState(routes[0]);

  const handleFocused = (route: string) => {
    setIsFocused(route);
    onFocusRoute(route);
  };

  return (
    <View className="px-4 py-2 bg-white">
      <View className="flex-row border-[0.5px] p-[2px] rounded-lg border-[#DBE1EB] shadow-2xl">
        {routes.map((route, i) => (
          <TouchableOpacity
            key={`${route}-*${i}`}
            className={`flex-1 py-[14px] px-[10px] rounded-md ${
              isFocused === route ? "bg-primary-purple" : ""
            }`}
            onPress={() => handleFocused(route)}
          >
            <Text
              className={`text-center font-pmedium ${
                isFocused === route ? "text-white" : "text-text-tertiary"
              }`}
            >
              {route}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CustomHeaderSwitch;
