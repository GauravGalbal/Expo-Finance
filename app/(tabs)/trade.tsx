import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import ContractAudit from "@/components/ContractAudit";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Dex from "@/app/screens/Dex/Dex";
import TradeSkeleton from "@/components/loading/TradeSkeletion";

import { Animated, TouchableOpacity } from "react-native";

// function TopBar({ state, descriptors, navigation, position }: TopBarProps) {
//   return (
//     <View className="flex-row px-4 bg-white py-3">
//       <View className="flex-1 flex-row border-[0.5px] p-[2px] rounded-lg border-[#DBE1EB] shadow-2xl">
//         {state.routes.map((route: any, index: any) => {
//           const { options } = descriptors[route.key];
//           const label =
//             options.tabBarLabel !== undefined
//               ? options.tabBarLabel
//               : options.title !== undefined
//               ? options.title
//               : route.name;

//           const isFocused = state.index === index;

//           const onPress = () => {
//             const event = navigation.emit({
//               type: "tabPress",
//               target: route.key,
//               canPreventDefault: true,
//             });

//             if (!isFocused && !event.defaultPrevented) {
//               navigation.navigate(route.name, route.params);
//             }
//           };

//           const onLongPress = () => {
//             navigation.emit({
//               type: "tabLongPress",
//               target: route.key,
//             });
//           };

//           return (
//             <TouchableOpacity
//               key={index}
//               accessibilityRole="button"
//               accessibilityState={isFocused ? { selected: true } : {}}
//               accessibilityLabel={options.tabBarAccessibilityLabel}
//               testID={options.tabBarTestID}
//               onPress={onPress}
//               onLongPress={onLongPress}
//               className={`flex-1 py-[14px] px-[10px] rounded-md ${
//                 isFocused ? "bg-primary-purple" : ""
//               }`}
//             >
//               <Text
//                 className={`text-center font-pmedium ${
//                   isFocused ? "text-white" : "text-text-tertiary"
//                 }`}
//               >
//                 {label}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

function Trade() {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Vaults');

    setTimeout(() => {
        setLoading(false);
        // setLoading(!loading);
    }, 1000);

    if (loading) {
        return <TradeSkeleton />;
    }


    return (
        <View>
            <View className="flex-row rounded-lg mx-4 overflow-hidden my-2 border border-gray-200">
                <TouchableOpacity
                    className={`flex-1 py-2 items-center ${activeTab === 'dex' ? 'bg-button-bg' : 'bg-white'}`}
                    onPress={() => setActiveTab('dex')}
                >
                    <Text className="text-lg font-medium text-black">DEX</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 py-2 items-center ${activeTab === 'vaults' ? 'bg-button-bg' : 'bg-white'}`}
                    onPress={() => setActiveTab('vaults')}
                >
                    <Text className="text-lg font-medium text-black">Vaults</Text>
                </TouchableOpacity>
            </View>

            {
                (activeTab === "dex") ?
                    <Text>DEX</Text>
                    :
                    <Text>Vaults</Text>

            }
        </View>
    );
}

export default Trade;
