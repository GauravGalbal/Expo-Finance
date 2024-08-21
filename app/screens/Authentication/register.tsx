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
import { Link, router, Stack } from "expo-router";
import { auth } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchUsers, signUp } from "@/redux/slices/userSlice";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { UseSelector } from "react-redux";
import { selectUser, selectIsLoggedIn } from "@/redux/slices/userSelector";
import { selectError } from "@/redux/slices/userSelector";
import { AppDispatch } from "@/redux/store/store";
import { icons, images } from "@/constants";

export default function Register() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false); // State to track checkbox
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser);
  const stateError = useSelector(selectError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // console.log(user);
  // console.log(stateError);

  const validateInputs = () => {
    let isValid = true;

    // Reset errors
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    // Phone validation
    if (!phone) {
      setPhoneError("Phone number is required");
      isValid = false;
    } else if (!/^\+?[1-9]\d{1,14}$/.test(phone)) {
      // Simple E.164 validation
      setPhoneError("Invalid phone number format");
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const requestError = () => {
    let isValid = true;
    if (stateError?.code === "auth/invalid-email") {
      setEmailError("Email is invalid!");
      isValid = false;
      return;
    }
    if (stateError?.code === "auth/weak-password") {
      setPasswordError("Password should be at least 6 characters!");
      isValid = false;
      return;
    }
    if (stateError?.code === "auth/email-already-in-use") {
      setEmailError("The email address is already in use!");
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

  const handleRegister = async () => {
    if (!agreed) {
      Alert.alert(
        "Error",
        "Please check the 'I agree to terms and conditions' checkbox."
      );
      return;
    }
    if (!validateInputs()) {
      return;
    }
    if (!requestError()) {
      return;
    }
    setLoading(true);
    try {
      // await createUserWithEmailAndPassword(auth, email, password);
      dispatch(signUp({ email, password }));
      if (user?.uid) {
        dispatch(fetchUsers(user?.uid));
      }
      // Alert.alert("Success", "User registered successfully!");
      // setEmail("");
      // setPhone("");
      // setPassword("");
      // setConfirmPassword("");
      // router.replace("screens/Steps/step1");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestError();
  }, [stateError]);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("screens/Steps/step1");
    }
  }, [isLoggedIn]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white/40">
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
              backgroundColor: "white",
            }}
          >
            <ImageBackground
              source={images.bgPattern}
              className="w-full mt-2 mb bg-white"
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
                <Text className="text-2xl font-psemibold mb-4 ml-1 text-black">
                  Sign up
                </Text>

                <View className="mb-4">
                  <TextInput
                    className="border border-input-border bg-white rounded-lg p-4 text-base font-pregular"
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
                <View className="mb-4">
                  <TextInput
                    className="border border-input-border bg-white rounded-lg p-4 text-base font-pregular"
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    placeholderTextColor={"#AEAEAE"}
                  />
                  {phoneError && (
                    <Text className="text-red-500 text-base pt-1 px-3 font-pregular">
                      {phoneError}
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
                <View className="mb-4 relative">
                  <TextInput
                    className="border border-input-border bg-white rounded-lg p-4 text-base font-pregular"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
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
                  {confirmPasswordError && (
                    <Text className="text-red-500 text-base pt-1 px-3 font-pregular">
                      {confirmPasswordError}
                    </Text>
                  )}
                </View>
                {error && (
                  <Text className="text-red-500 text-center text-base pt-1 px-3 font-pregular">
                    {error}
                  </Text>
                )}
              </View>

              <View className="w-full  mt-4  mb-1">
                <View className="flex flex-row items-center ml-2 mb-2">
                  <TouchableOpacity onPress={() => setAgreed(!agreed)}>
                    <Icon
                      name={agreed ? "checkbox" : "square-outline"}
                      size={24}
                      color={agreed ? "#000" : "#000"}
                    />
                  </TouchableOpacity>
                  <Text className="ml-2 text-gray-400 flex-row font-pregular">
                    I agree to the{" "}
                    <Text className="underline">Terms and conditions</Text>
                  </Text>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={handleRegister}
                    disabled={loading}
                    className={`py-4 rounded-full relative ${
                      loading ? "bg-gray-300" : "bg-primary-purple"
                    } mt-0`}
                  >
                    <Image
                      source={require("../../../assets/images/individualAssets/bgPurpleWave.png")}
                      className="absolute w-full h-12 rounded-full z-10"
                      resizeMode="cover"
                    />
                    <Text className="text-white text-center font-psemibold">
                      {loading ? "Loading..." : "SIGN UP"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex flex-row justify-center items-center mt-2">
                  <Text className="text-gray-400 font-pregular">
                    Already have an Account?
                  </Text>
                  <Link
                    className="text-blue-500 ml-2 font-psemibold"
                    href="/screens/Authentication/login"
                  >
                    Sign In
                  </Link>
                </View>
              </View>
              {/* <Link
              href="/screens/Authentication/login"
              className="mb-0 bg-white border-purple-800 border-2 p-2 rounded-xl font-semibold"
            >
              <Text className="text-purple-800 text-center font-semibold">
                Go to Login Screen
              </Text>
            </Link> */}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
