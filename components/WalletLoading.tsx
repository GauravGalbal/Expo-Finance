// import React, { useEffect } from "react";
// import { View, Text, ActivityIndicator, StatusBar } from "react-native";
// import { useNavigation, Stack } from "expo-router";

// export default function LoadingScreen() {
//   const navigation = useNavigation();

//   useEffect(() => {
//     // Simulate a network request or any async operation
//     setTimeout(() => {
//       navigation.navigate("screens/AfterSteps/walletCreated");
//     }, 2000); // 3 seconds delay
//   }, [navigation]);

//   return (
//     <View className="flex-1 justify-center items-center bg-gray-50 px-5 pt-10">
//       <Stack.Screen options={{ headerShown: false }} />
//       <StatusBar barStyle="dark-content" />
//       <ActivityIndicator size="large" color="#0000ff" />
//       <Text className="mt-5 text-xl font-bold text-black">
//         Wallet is being created...
//       </Text>
//     </View>
//   );
// }
