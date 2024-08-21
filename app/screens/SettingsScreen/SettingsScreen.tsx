import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { auth } from "../../../firebaseConfig";
import { signOut } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Alert.alert("Success", "Logged out successfully!");
      navigation.navigate("screens/Authentication/login");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View style={{ height: "100%", backgroundColor: "#f7fafc" }}>
        <Stack.Screen
          options={{
            title: "Settings",
            headerStyle: { backgroundColor: "#4B17DD" },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View className="items-center mb-6">
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              className="w-24 h-24 rounded-full mb-4"
            />
            <Text className="text-2xl font-bold">John Doe</Text>
            <Text className="text-gray-600">johndoe@example.com</Text>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold mb-2">Account Settings</Text>
            <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white mb-2 rounded-lg">
              <Text className="text-base">Personal Information</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white mb-2 rounded-lg">
              <Text className="text-base">Change Password</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white mb-2 rounded-lg">
              <Text className="text-base">Security</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold mb-2">Preferences</Text>
            <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white mb-2 rounded-lg">
              <Text className="text-base">Notifications</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white mb-2 rounded-lg">
              <Text className="text-base">Language</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white mb-2 rounded-lg">
              <Text className="text-base">Privacy</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold mb-2">Support</Text>
            <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white mb-2 rounded-lg">
              <Text className="text-base">Help Center</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white mb-2 rounded-lg">
              <Text className="text-base">Contact Us</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white mb-2 rounded-lg">
              <Text className="text-base">Feedback</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold mb-2">Legal</Text>
            <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white mb-2 rounded-lg">
              <Text className="text-base">Terms of Service</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-between items-center p-4 bg-white mb-2 rounded-lg">
              <Text className="text-base">Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="flex-row justify-between items-center p-4 bg-red-600 rounded-lg w-1/2 self-center mt-4 mb-8"
            onPress={handleSignOut}
          >
            <Text className="text-base text-white">Logout</Text>
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
