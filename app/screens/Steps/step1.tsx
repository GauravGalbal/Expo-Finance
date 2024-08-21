import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Link, useNavigation, Stack, Redirect, router } from "expo-router";
// import RNPickerSelect from "react-native-picker-select";
import { ref, set } from "firebase/database";
import { database, auth } from "../../../firebaseConfig";
// import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store/store";
// import { setUser } from "../../../redux/slices/userSlice";
// import { User } from "@/types/User"; // Ensure this path is correct
import CustomSelect from "@/components/CustomSelect";
import CountryData from "@/data/country-data";
import Icon from "react-native-vector-icons/Ionicons";
import { selectUser } from "@/redux/slices/userSelector";
import { icons } from "@/constants";

const AgeOptions = ["14 - 18", "18 - 25", "26 - 32", "32 - 42", "46+"];

export default function Step1_1() {
  const [username, setUsername] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [country, setCountry] = useState<{ name: string; code: string }>();
  const [isAgeModal, setIsAgeModal] = useState(false);
  const [isCountryModal, setIsCountryModal] = useState(false);
  const user = useSelector(selectUser);
  const navigation = useNavigation();

  // Listen for authentication state changes
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(
  //     auth,
  //     (firebaseUser: FirebaseUser | null) => {
  //       if (firebaseUser) {
  //         dispatch(
  //           setUser({
  //             uid: firebaseUser.uid,
  //             email: firebaseUser.email || "",
  //             user: "",
  //             experienceLevel: "",
  //           })
  //         ); // Ensure email is a string
  //       } else {
  //         // Navigate to login screen if not authenticated
  //         navigation.navigate("screens/Authentication/login");
  //       }
  //     }
  //   );

  //   return () => unsubscribe();
  // }, [dispatch, navigation]);

  // Function to save user decisions
  const saveStep1Data = async () => {
    if (!user) return;
    if (!country || !username || !ageRange) return;
    try {
      const userRef = ref(database, `users/${user.uid}/step1`);
      await set(userRef, {
        username,
        ageRange,
        country: country?.name,
      });
      console.log("Step 1 data saved successfully");
    } catch (error) {
      console.error("Error saving Step 1 data: ", error);
    }
  };

  if (user && user.users) {
    const userObj = JSON.parse(user?.users);
    // console.log(userObj)
    if (userObj?.step1?.username) {
      return <Redirect href={"/(tabs)"} />;
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 min-h-[100vh] justify-between pb-4">
        <View className="flex-row justify-end mb-5 px-5 pt-10">
          <Link href="/screens/Steps/step2" asChild>
            <TouchableOpacity>
              <Text className="text-[#375CF0] font-psemibold text-base">
                SKIP
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <ScrollView className="flex-1 px-5">
          <View className="flex-row items-center mb-8">
            <Image
              source={icons.askKorraCircle}
              className="w-10 h-10 mr-4"
              resizeMode="contain"
            />
            <Text className="text-2xl font-psemibold text-black">
              Tell us more about you
            </Text>
          </View>

          <View className="border-2 border-input-border bg-blue-50 rounded-xl p-4 mb-4">
            <TextInput
              className="text-base text-secondary-color font-pregular"
              placeholder="Add username"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor={"#5C626A"}
            />
          </View>

          <View className="mb-4 border-2 border-gray-300 bg-blue-50 rounded-lg text-base">
            <TouchableOpacity onPress={() => setIsAgeModal(true)}>
              <View className="p-4 flex-row justify-between items-center">
                <Text className="text-base text-secondary-color font-pregular">
                  {ageRange ? ageRange : "Age range"}
                </Text>
                <Icon name="chevron-down" size={20} color={"#5C626A"} />
                <CustomSelect
                  list={AgeOptions}
                  isVisible={isAgeModal}
                  onCancel={() => setIsAgeModal(false)}
                  mode="age"
                  onConfirm={(item) => {
                    setAgeRange(item);
                    setIsAgeModal(false);
                  }}
                  selected={ageRange}
                  overlayStyles="items-center justify-center"
                />
              </View>
            </TouchableOpacity>
          </View>

          <View className="mb-4 border-2 border-gray-300 bg-blue-50 rounded-lg text-base">
            <TouchableOpacity
              onPress={() => {
                setIsCountryModal(true);
              }}
            >
              <View className="p-4 flex-row justify-between items-center">
                <Text className="text-base text-secondary-color font-pregular">
                  {country ? country?.name : "Select country"}
                </Text>
                <Icon name="chevron-down" size={20} color={"#5C626A"} />
                <CustomSelect
                  list={CountryData}
                  isVisible={isCountryModal}
                  onCancel={() => setIsCountryModal(false)}
                  mode="country"
                  onConfirm={(item) => {
                    setCountry(item);
                    setIsCountryModal(false);
                  }}
                  selected={country?.code}
                  overlayStyles="items-center justify-end"
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View className=" p-5">
          <View className="flex-row items-center justify-between mt-10">
            <View className="flex flex-col">
              <Text className="text-gray-800 font-psemibold">Step 1/3</Text>
              <View className="flex-row items-center mt-2">
                <View className="w-5 h-1 rounded-full bg-purple-800 mr-1"></View>
                <View className="w-3 h-1 rounded-full bg-gray-300 mr-1"></View>
                <View className="w-3 h-1 rounded-full bg-gray-300"></View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                saveStep1Data();
                router.push("screens/Steps/step2");
              }}
              className="flex-row items-center justify-center bg-primary-purple p-3 px-8 rounded-full"
            >
              <Text className="text-white font-psemibold mr-2">NEXT</Text>
              <Icon name={"arrow-forward-outline"} color={"white"} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
