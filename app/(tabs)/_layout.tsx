import React, { useRef, useEffect, useState } from "react";
import { Image, Text, View, Animated, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getHeaderTitle } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AskKorra from ".";
import Trade from "./trade";
import AirDrops from "./airdrops";
import Explore from "./explore";
import Portfolio from "./portfolio";
import { icons } from "@/constants";
import TabHeader from "@/components/TabHeader";
import '@walletconnect/react-native-compat'
import '@ethersproject/shims'

import { createWeb3Modal, defaultConfig, Web3Modal } from '@web3modal/ethers5-react-native'

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = '9f77325b0a9e4a936ba894cf50b6c8b9'

// 2. Create config
const metadata = {
  name: 'Korra Defi',
  description: 'AppKit RN Example',
  url: 'https://www.korra.finance/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'com.mast-web3dao.Korra-Defi'
  }
}

const config = defaultConfig({ metadata })

// 3. Define your chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const polygon = {
  chainId: 137,
  name: 'Polygon',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrl: 'https://polygon-rpc.com'
}

const chains = [mainnet, polygon]

// 4. Create modal
createWeb3Modal({
  projectId,
  chains,
  config,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get("window");

interface LayoutMeasurement {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface AnimatedIndicatorProps {
  measureLayout: (LayoutMeasurement | undefined)[];
  scrollX: Animated.Value;
}

const AnimatedIndicator: React.FC<AnimatedIndicatorProps> = ({
  measureLayout,
  scrollX,
}) => {
  const inputRange = [0, 1, 2, 3, 4];
  const indicatorWidth = 50;

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: inputRange.map((_, i) => {
      const layout = measureLayout[i];
      return layout
        ? layout.x + (layout.width - indicatorWidth) / 2
        : i * (width / 5);
    }),
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        height: 4,
        width: indicatorWidth,
        borderRadius: 2,
        backgroundColor: "#6A5AE0",
        bottom: 0,
        transform: [{ translateX }],
      }}
    />
  );
};

interface TabIconProps {
  icon: any; // Consider creating a union type of all possible icon names
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View className={`items-center justify-center gap-1 pt-1 h-full`}>
      <View
        className={`${name === "Ask Korra" ? "p-2 rounded-full" : ""}`}
        style={{
          backgroundColor:
            name === "Ask Korra"
              ? focused
                ? "#090E14"
                : "#8B919B"
              : "transparent",
        }}
      >
        <Image
          source={name === "Trade" && !focused ? icons.inactiveTrade : icon}
          resizeMode="contain"
          tintColor={
            name === "Ask Korra"
              ? undefined
              : name === "Trade"
              ? focused
                ? undefined
                : undefined
              : color
          }
          className={`${name === "Ask Korra" ? "w-5 h-5 z-30" : "w-6 h-6"}`}
        />
      </View>
      <Text
        className={`font-pregular text-[11px] ${focused && "font-pbold"} `}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

interface Route {
  name: string;
  component: React.ComponentType<any>;
  icon: any;
}

const TabLayout: React.FC = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const [measureLayout, setMeasureLayout] = useState<
    (LayoutMeasurement | undefined)[]
  >([]);
  const [isLayoutMeasured, setIsLayoutMeasured] = useState(false);

  useEffect(() => {
    if (
      measureLayout.length === 5 &&
      measureLayout.every((layout) => layout !== undefined)
    ) {
      setIsLayoutMeasured(true);
    }
  }, [measureLayout]);

  const handleTabPress = (index: number) => {
    if (isLayoutMeasured) {
      Animated.spring(tabOffsetValue, {
        toValue: index,
        useNativeDriver: true,
      }).start();
    }
  };

  const routes: Route[] = [
    { name: "Portfolio", component: Portfolio, icon: icons.portfolio },
    { name: "Trade", component: Trade, icon: icons.trade },
    { name: "Ask Korra", component: AskKorra, icon: icons.askKorra },
    { name: "Airdrops", component: AirDrops, icon: icons.airdrop },
    { name: "Explore", component: Explore, icon: icons.explore },
  ];

  const screenOptions: BottomTabNavigationOptions = {
    tabBarActiveTintColor: "#090E14",
    tabBarInactiveTintColor: "#8B919B",
    tabBarShowLabel: false,
    headerShown: true,
    tabBarStyle: {
      paddingBottom: 5,
      paddingTop: 0,
      paddingHorizontal: 16,
      height: 72,
      marginBottom: 0,
      backgroundColor: "#fff",
    },
    header: ({ navigation, route, options }) => {
      const title = getHeaderTitle(options, route.name);
      return <TabHeader screen={title} navigation={navigation} />;
    },
  };

  return (
    <GestureHandlerRootView>
      <Web3Modal/>
      <SafeAreaView style={{ flex: 1 }} className="bg-white">
        <Tab.Navigator screenOptions={screenOptions}>
          {routes.map((route, index) => (
            <Tab.Screen
              key={route.name}
              name={route.name}
              component={route.component}
              options={{
                tabBarIcon: ({ focused, color }) => (
                  <TabIcon
                    focused={focused}
                    color={color}
                    icon={route.icon}
                    name={route.name}
                  />
                ),
              }}
              listeners={{
                tabPress: () => handleTabPress(index),
              }}
            />
          ))}
        </Tab.Navigator>
        {isLayoutMeasured && (
          <View
            style={{
              width: "100%",
              height: 4,
              backgroundColor: "transparent",
              position: "absolute",
              bottom: 68,
            }}
          >
            <AnimatedIndicator
              measureLayout={measureLayout}
              scrollX={tabOffsetValue}
            />
          </View>
        )}
        {routes.map((route, index) => (
          <View
            key={route.name}
            style={{
              position: "absolute",
              bottom: 72,
              left: (width / 5) * index + CalculateNumber(index),
              width: width / 5,
              height: 4,
            }}
            onLayout={(event) => {
              const { x, y, width, height } = event.nativeEvent.layout;
              setMeasureLayout((prev) => {
                const newLayout = [...prev];
                newLayout[index] = { x, y, width, height };
                return newLayout;
              });
            }}
          />
        ))}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default TabLayout;

const CalculateNumber = (index: number) => {
  // console.log("Index", index);
  if (index === 0) {
    return 12;
  } else if (index === 1) {
    return 5;
  } else if (index === 3) {
    return -5;
  } else if (index === 4) {
    return -12;
  }
  return -1;
};
