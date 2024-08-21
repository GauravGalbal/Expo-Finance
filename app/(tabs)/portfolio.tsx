import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "expo-router";

function Portfolio() {
  const navigation = useNavigation();

  return (
    <View className="flex justify-center items-center text-3xl h-screen bg-white">
      <Text className="text-3xl font-pregular">Portfolio PAGE</Text>
      <Button title="Go to Step 3" onPress={() => navigation.navigate("screens/Steps/step3")} />
    </View>
  );
}

export default Portfolio;
