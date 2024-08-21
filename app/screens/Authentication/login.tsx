import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Link, Stack, useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchUsers, signIn } from "@/redux/slices/userSlice";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import {
  selectError,
  selectUser,
  selectIsLoggedIn,
} from "@/redux/slices/userSelector";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import { getDataFromDatabase } from "@/utils/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser);
  const stateError = useSelector(selectError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // console.log(user);
  // console.log(error);

  const requestError = () => {
    let isValid = true;
    if (stateError?.code === "auth/invalid-email") {
      setEmailError("Email is invalid!");
      isValid = false;
      return;
    }
    if (stateError?.code === "auth/invalid-credential") {
      setError("Invalid credentials!");
      isValid = false;
      return;
    }
    if (stateError?.code === "auth/network-request-failed") {
      setError("An unexpected error occured!");
      isValid = false;
      return;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!email) {
      setEmailError("Email is required!");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
      return;
    }
    if (!password) {
      setEmailError("Password is required!");
      return;
    }
    if (!requestError()) {
      return;
    }
    setLoading(true);
    try {
      dispatch(signIn({ email, password }));
      if (user?.uid) {
        dispatch(fetchUsers(user?.uid));
      }
      // setEmail("");
      // setPassword("");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestError();
  }, [stateError]);

  const getUserDoc = async (userId: string) => {
    const user = await getDataFromDatabase(`users/${userId}`);

    return user;
  };

  useEffect(() => {
    const fetch = async () => {
      if (isLoggedIn) {
        if (user?.uid) {
          const userObj = await getUserDoc(user.uid);
          if (userObj?.step1?.username) {
            return router.replace("/(tabs)");
          }
        }
        router.replace("screens/Steps/step1");
      }
    };
    fetch();
  }, [isLoggedIn]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <Stack.Screen options={{ headerShown: false }} />
        <StatusBar barStyle="dark-content" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={images.bgPattern}
              className="w-full mt-2 mb"
              resizeMode="cover"
            >
              <View className="relative w-full mt-3 p-4">
                <View className="mb-3">
                  <Image
                    source={icons.korraLogoFullLight}
                    className="w-[120px] h-[30px] mr-3"
                    resizeMode="contain"
                  />
                </View>

                <View className="bg-white rounded-xl border-2 border-gray-100 px-3 py-4 shadow-lg">
                  <Text className="text-lg font-psemibold text-black mb-2">
                    Welcome !!!
                  </Text>
                  <Text className="text-base text-primary-color font-pregular">
                    Leverage Korra’s AI to supercharge your trading experience.
                  </Text>
                  <Text className="text-base text-primary-color mt-4 font-pregular">
                    Please log in or sign up...
                  </Text>
                </View>
              </View>
            </ImageBackground>
            <View className="flex flex-1 items-center justify-between px-4 w-full bg-white rounded-t-3xl py-8">
              <View className="w-full mb-4">
                <Text className="text-3xl font-pbold mb-4 text-black ">
                  Login
                </Text>
                <View className="flex flex-col space-y-3 mb-4">
                  <TouchableOpacity className="bg-black p-4 rounded-md flex-row items-center justify-center">
                    <Image
                      source={icons.facebook}
                      className="w-4 h-4"
                      resizeMode="contain"
                    />
                    <Text className="text-white text-center text-base ml-3 font-pregular">
                      Continue with Facebook
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-black p-4 rounded-md flex-row items-center justify-center">
                    <Image
                      source={icons.google}
                      className="w-4 h-4"
                      resizeMode="contain"
                    />
                    <Text className="text-white text-center text-base ml-3 font-pregular">
                      Continue with Google
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center mb-4">
                  <View className="flex-1 border-b border-gray-500 mr-2"></View>
                  <Text className="text-gray-500 font-pregular">Or</Text>
                  <View className="flex-1 border-b border-gray-500 ml-2"></View>
                </View>
                <View className=" mb-4">
                  <TextInput
                    className="border border-input-border bg-white rounded-lg p-4 text-base font-pregular "
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor={"#AEAEAE"}
                  />
                  {emailError && (
                    <Text className="text-red-500 text-base pt-1 px-3 font-pregular">
                      {emailError}
                    </Text>
                  )}
                </View>
                <View className="mb-4 relative">
                  <TextInput
                    className="border border-input-border bg-white rounded-lg p-4 text-base font-pregular"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    placeholderTextColor={"#AEAEAE"}
                  />
                  <Icon
                    style={{ position: "absolute", right: 10, top: 18 }}
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#000"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                  {passwordError && (
                    <Text className="text-red-500 text-base pt-1 px-3 font-pregular">
                      {passwordError}
                    </Text>
                  )}
                </View>
                {error && (
                  <Text className="text-red-500 text-center text-base pt-1 px-3 font-pregular">
                    {error}
                  </Text>
                )}
              </View>
              <View className="w-full my-4">
                <TouchableOpacity
                  onPress={handleLogin}
                  disabled={loading}
                  className={`py-4 rounded-full relative  ${
                    loading ? "bg-gray-300" : "bg-primary-purple"
                  }`}
                >
                  <Image
                    source={require("../../../assets/images/individualAssets/bgPurpleWave.png")}
                    className="absolute w-full h-12 rounded-full "
                    resizeMode="cover"
                  />
                  <Text className="text-white text-center font-psemibold">
                    {loading ? "Loading..." : "Login"}
                  </Text>
                </TouchableOpacity>
                <View className="flex flex-row justify-center items-center mt-2">
                  <Text className="text-gray-400 font-pregular">
                    Don't have an Account?
                  </Text>
                  <Link
                    className="text-primary-purple ml-2 font-psemibold"
                    href="/screens/Authentication/register"
                  >
                    Sign Up
                  </Link>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
