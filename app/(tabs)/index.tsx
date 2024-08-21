// src/components/AskKorra.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { icons, images } from "@/constants";
import ContractAudit from "@/components/ContractAudit";
import AskKorraLoading from "@/components/loading/AskKorra";
import {
  CustomButtonWithBg,
  CustomButtonWithoutBg,
} from "@/components/CustomButton";
import { getSolanaWallet } from "@/utils/wallet/getWallet";
import 'react-native-get-random-values';
import { Buffer } from 'buffer';
import randomBytes from 'randombytes';

// Polyfill randomBytes for ethers.js
if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}

if (typeof window !== 'undefined') {
  if (typeof window.crypto === 'undefined') {
    window.crypto = {};
  }
  if (typeof window.crypto.getRandomValues === 'undefined') {
    window.crypto.getRandomValues = (array) => randomBytes(array.length);
  }
} else {
  if (typeof global.crypto === 'undefined') {
    global.crypto = {};
  }
  if (typeof global.crypto.getRandomValues === 'undefined') {
    global.crypto.getRandomValues = (array) => randomBytes(array.length);
  }
}

type Message = {
  type: "user" | "bot";
  text: string;
};

const AskKorra: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isAudit, setIsAudit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNetworkOptions, setShowNetworkOptions] = useState<boolean>(false);
  const [showSolanaInputs, setShowSolanaInputs] = useState<boolean>(false);
  const [slippage, setSlippage] = useState<string>("");
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const scrollViewRef = useRef<ScrollView>(null);
  const [screenLoading, setScreenLoading] = useState<boolean>(true);
  const [showBottomOptions, setShowBottomOptions] = useState<boolean>(true);

  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  const options = ["Profile", "Option 2", "Option 3", "Sniping"];

  const handleSendMessage = (text: string) => {
    if (text.trim().length > 0) {
      const newMessage: Message = { type: "user", text };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");
      setIsTyping(false);

      // Determine bot response
      let botMessage: Message = { type: "bot", text: "" };
      setIsLoading(true);

      if (newMessage.text.toLowerCase().includes("yes")) {
        botMessage.text = "Oh, amazing! Thank you so much! 😎";
      } else if (newMessage.text.toLowerCase().includes("no")) {
        botMessage.text =
          "Oh, sorry for the inconvenience. We will work harder!.";
      }

      if (newMessage.text.toLowerCase().includes("smart contract auditing")) {
        botMessage.text =
          "Please enter the contract address you would like to audit.";
      } else if (newMessage.text.toLowerCase().includes("0x")) {
        setIsAudit(true);
        setShowBottomOptions(false);
      }

      if (newMessage.text.toLowerCase() === "sniping") {
        setShowNetworkOptions(true);
        setShowBottomOptions(false);
        botMessage.text = "Please select the network:";
      }

      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        scrollViewRef.current?.scrollToEnd({ animated: true });
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleNetworkSelection = (network: string) => {
    const networkMessage: Message = { type: "user", text: network };
    setMessages((prevMessages) => [...prevMessages, networkMessage]);
    setShowNetworkOptions(false);

    if (network === "Solana") {
      setShowSolanaInputs(true);
    }

    setShowBottomOptions(true);
  };

  const handleSnipeSubmit = async () => {
    const { secretKey } = await getSolanaWallet();
    if (!secretKey) {
      alert('Solana wallet secret key is not available');
      return;
    }

    const snipeRequestData = {
      slippage,
      tokenAddress,
      amount,
      secretKey,
    };

    try {
      const response = await fetch('http://192.168.0.51:3000/snipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(snipeRequestData),
      });

      const data = await response.json();
      alert(`Trade executed successfully! Transaction ID: ${data.transactionId}`);
    } catch (error) {
      console.error('Error executing trade:', error);
      alert('Error executing trade');
    }
  };

  // Initial bot message
  useEffect(() => {
    const initialMessage: Message = {
      type: "bot",
      text: "Hello User,\nDo you like our Mockup Chatbot? 🥺",
    };
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 200,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    if (inputText.trim().length > 0) {
      setIsTyping(true);
      const timeoutId = setTimeout(() => {
        setIsTyping(false);
      }, 1500);
      animateDot(dot1, 0);
      animateDot(dot2, 100);
      animateDot(dot3, 200);
    } else {
      setIsTyping(false);
    }

    return () => {
      dot1.stopAnimation();
      dot2.stopAnimation();
      dot3.stopAnimation();
    };
  }, [inputText]);

  const bottomOptions = [
    "Bridging",
    "Smart Contract Auditing",
    "Sniping",
    "Example",
    "Example",
    "Example",
  ];

  // Change this when calling API
  setTimeout(() => {
    setScreenLoading(false);
  }, 2000);

  if (screenLoading) {
    return <AskKorraLoading />;
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View className="bg-gray-50 flex-1">
        <ImageBackground
          source={images.bgPattern}
          className="flex-1 w-full h-full bg-white"
          resizeMode="contain"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            ref={scrollViewRef}
          >
            <View className="flex-1 px-0  ">
              <View className="flex-1 flex-col  gap-y-3 px-2 py-2 z-10">
                {messages.map((message, index) => (
                  <View
                    key={index}
                    className={`flex  flex-row items-end gap-2 p-2 ${
                      message.type === "user" ? "self-end" : "self-start"
                    }`}
                  >
                    {message.type === "bot" && (
                      <Image
                        source={icons.askKorraCircle}
                        className="w-6 h-6"
                        resizeMode="contain"
                      />
                    )}
                    <View
                      className={`rounded-2xl px-3 py-2.5 border border-slate-200 shadow-md flex-shrink ${
                        message.type === "user"
                          ? "bg-[#6F45E4] rounded-br-none"
                          : "bg-white rounded-tl-none"
                      }`}
                    >
                      <Text
                        className={`text-sm  ${
                          message.type === "user"
                            ? "text-left text-slate-100  font-pregular"
                            : "text-left font-psemibold text-gray-700"
                        }`}
                      >
                        {message.text ||
                          ` Sorry\n I am still in development ⚙️`}
                      </Text>
                    </View>
                  </View>
                ))}
                {isTyping && (
                  <View className="flex flex-row rounded-2xl justify-end">
                    <View className="flex-row items-center justify-center h-[50px] max-w-[100px]">
                      <Animated.View style={[styles.dot, { opacity: dot1 }]} />
                      <Animated.View style={[styles.dot, { opacity: dot2 }]} />
                      <Animated.View style={[styles.dot, { opacity: dot3 }]} />
                    </View>
                  </View>
                )}

                {/** Smart contract Auditing */}
                {isAudit && (
                  <View>
                    <View>
                      <View className="flex-row items-end gap-2 p-2">
                        <Image
                          source={icons.askKorraCircle}
                          className="w-6 h-6 mt-2"
                          resizeMode="contain"
                        />
                        <View className="bg-white border border-slate-200 rounded-2xl p-3 shadow-lg rounded-tl-none pb-10 flex-1 max-w-[300px]">
                          <ContractAudit />
                        </View>
                      </View>
                      <View className="flex-row items-end gap-2 p-2">
                        <Image
                          source={icons.askKorraCircle}
                          className="w-6 h-6 mt-2"
                          resizeMode="contain"
                        />
                        <View className="bg-white border border-slate-200 rounded-2xl p-3 shadow-lg rounded-tl-none pb-7 flex-1 max-w-[300px]">
                          <Text className="text-sm font-pregular">
                            Would you like to save this audit for future
                            reference or discard it?
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View className="mr-7 gap-3 mb-2 px-4 justify-center border-[0.5px] border-[#DBE1EB] rounded-t-[20px] w-[100vw] relative right-[-18px] py-4 bg-white self-center bottom-0 mt-5">
                      <CustomButtonWithBg
                        title="Purchase"
                        handleOnPress={() => {}}
                        containerStyles="min-h-[48px] mb-2"
                        icon={"arrow-forward"}
                        iconColor="#fff"
                        textStyles="mr-2 text-base"
                      />
                      <CustomButtonWithoutBg
                        title="cancel"
                        handleOnPress={() => {
                          setIsAudit(false);
                          setShowBottomOptions(true);
                        }}
                        containerStyles="min-h-[48px]  border border-[#B8BEC7]"
                      />
                    </View>
                  </View>
                )}

                {/** Network selection */}
                {showNetworkOptions && (
                  <View className="px-4 py-2">
                    <Text className="text-sm font-pregular mb-3">Select Network:</Text>
                    <View className="flex flex-row gap-2">
                      <TouchableOpacity
                        onPress={() => handleNetworkSelection("Ethereum")}
                        className="py-1.5 px-3 border border-gray-200 rounded-full"
                      >
                        <Text className="text-gray-500 font-pregular text-[12px]">
                          Ethereum
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleNetworkSelection("BSC")}
                        className="py-1.5 px-3 border border-gray-200 rounded-full"
                      >
                        <Text className="text-gray-500 font-pregular text-[12px]">
                          BSC
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleNetworkSelection("Solana")}
                        className="py-1.5 px-3 border border-gray-200 rounded-full"
                      >
                        <Text className="text-gray-500 font-pregular text-[12px]">
                          Solana
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {/** Solana input fields */}
                {showSolanaInputs && (
                  <View className="px-4 py-2">
                    <Text className="text-sm font-pregular mb-3">Enter the following details:</Text>
                    <View className="mb-3">
                      <Text className="text-sm font-pregular">Slippage:</Text>
                      <TextInput
                        placeholder="Enter slippage"
                        value={slippage}
                        onChangeText={setSlippage}
                        className="border border-gray-200 rounded-full px-3 py-1 mt-1"
                      />
                    </View>
                    <View className="mb-3">
                      <Text className="text-sm font-pregular">Token Address:</Text>
                      <TextInput
                        placeholder="Enter token address"
                        value={tokenAddress}
                        onChangeText={setTokenAddress}
                        className="border border-gray-200 rounded-full px-3 py-1 mt-1"
                      />
                    </View>
                    <View className="mb-3">
                      <Text className="text-sm font-pregular">Amount:</Text>
                      <TextInput
                        placeholder="Enter amount"
                        value={amount}
                        onChangeText={setAmount}
                        className="border border-gray-200 rounded-full px-3 py-1 mt-1"
                      />
                    </View>
                    <CustomButtonWithBg
                      title="Submit"
                      handleOnPress={handleSnipeSubmit}
                      containerStyles="min-h-[48px] mb-2"
                      icon={"arrow-forward"}
                      iconColor="#fff"
                      textStyles="mr-2 text-base"
                    />
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </ImageBackground>

        <View className="bg-white pt-2 rounded-t-3xl shadow-xl ">
          {showBottomOptions && (
            <View className=" px-4 ">
              <ScrollView
                className="flex flex-row gap-2"
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {bottomOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      handleSendMessage(option);
                    }}
                    className="py-1.5 px-3 border border-gray-200 rounded-full"
                  >
                    <Text className="text-gray-500 font-pregular text-[12px]">
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
          <View className="flex flex-row items-center relative bg-blue-50 border-2 border-gray-200 rounded-2xl px-4 py-2.5 mx-2 my-2">
            <View className="border-r-0.5 pr-3 border-[#ADBACE]">
              <Icon name="mic" size={24} style={{}} />
            </View>
            <TextInput
              placeholder="Type here..."
              value={inputText}
              onChangeText={setInputText}
              className="flex-1 ml-3 text-base font-pregular"
            />
            <TouchableOpacity
              // disabled={inputText.trim().length === 0}
              onPress={() => handleSendMessage(inputText)}
              className="border-l-0.5 pl-3  border-[#ADBACE]"
            >
              <Icon
                name="send"
                size={24}
                color={inputText.trim().length === 0 ? "gray" : "purple"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#555",
    marginHorizontal: 5,
  },
});

export default AskKorra;
