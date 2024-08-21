import { View, Text, TouchableOpacity, Image } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ContractAudit from "@/components/ContractAudit";
import Icon from "react-native-vector-icons/Ionicons";
import { icons } from "@/constants";
import Spot from "../Spot/Spot";
import { ExecutionTabParamList } from "@/navigation/types";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Tab = createMaterialTopTabNavigator<ExecutionTabParamList>();

interface TopBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  position: any;
}

function TopBar({ state, descriptors, navigation, position }: TopBarProps) {
  return (
    <View className="flex-row px-4 pb-3 bg-white justify-between items-end mt-2 border-[0.5px] border-[#DBE1EB]">
      <TouchableOpacity
        className="items-center justify-center"
        onPress={() => router.navigate("/trade")}
      >
        <Icon name="arrow-back" size={20} />
      </TouchableOpacity>
      <View className="flex-1 flex-row  p-[2px]">
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              className={`flex-1 px-[10px] rounded-md relative ${
                isFocused ? "" : ""
              }`}
            >
              <View
                className={`border-t-[2px] pt-[9px]   top-0 bg-red w-[50%] self-center ${
                  isFocused ? "border-primary-purple" : "border-transparent"
                }`}
              />

              <Text
                className={`text-center font-pmedium text-sm ${
                  isFocused ? "text-primary-color" : "text-text-tertiary"
                }`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View>
        <TouchableOpacity
          className="flex-row items-center justify-center  pl-2 pr-1 h-[24px]  bg-[#F4FBFF] rounded-full border-[0.5px] border-[#DBE1EB]"
          onPress={() => navigation.navigate("Ask Korra")}
        >
          <View className="mr-2">
            <Text className="text-center font-psemibold text-[12px]">Ask</Text>
          </View>
          <View className=" items-center justify-center">
            <Image
              source={icons.askKorraCircle}
              className="w-4 h-4"
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const OrderPage = () => {
  const { coinId } = useLocalSearchParams();
  console.log(coinId);
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex-1 bg-white">
        <Stack.Screen options={{ headerShown: false }} />
        <Tab.Navigator
          tabBar={(props) => <TopBar {...props} />}
          screenOptions={{
            tabBarActiveTintColor: "#090E14",
            tabBarInactiveTintColor: "#8B919B",
            tabBarShowLabel: true,
            tabBarStyle: {
              paddingBottom: 5,
              paddingTop: 0,
              paddingHorizontal: 16,
              marginBottom: 0,
            },
            swipeEnabled: false,
          }}
        >
          <Tab.Screen name="Spot" component={Spot} initialParams={{ coinId }} />
          <Tab.Screen name="Convert" component={ContractAudit} />
        </Tab.Navigator>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default OrderPage;
