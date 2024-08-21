import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { icons, images } from "@/constants";
import {
  CustomButtonWithBg,
  CustomButtonWithIcon,
} from "@/components/CustomButton";
import ModalWrapper from "@/components/ModalWrapper";
import Loader from "@/components/Loader";

const Payment = () => {
  const [showInvoice, setShowInvoice] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const networks = [
    {
      name: "Tron (TRC20)",
      blockConfirmations: 1,
      minDeposit: "0.01 USDT",
      estArrival: "2 mins",
    },
    {
      name: "BNB Smart Chain (BEP20)",
      blockConfirmations: 1,
      minDeposit: "0.01 USDT",
      estArrival: "2 mins",
    },
    {
      name: "Tron (TRC20)",
      blockConfirmations: 1,
      minDeposit: "0.01 USDT",
      estArrival: "2 mins",
    },
    {
      name: "BNB Smart Chain (BEP20)",
      blockConfirmations: 1,
      minDeposit: "0.01 USDT",
      estArrival: "2 mins",
    },
    {
      name: "Tron (TRC20)",
      blockConfirmations: 1,
      minDeposit: "0.01 USDT",
      estArrival: "2 mins",
    },
    {
      name: "BNB Smart Chain (BEP20)",
      blockConfirmations: 1,
      minDeposit: "0.01 USDT",
      estArrival: "2 mins",
    },
  ];

  const onPayClick = () => {
    setShowLoadingModal(true);

    setTimeout(() => {
      router.push("/screens/Dex/Payment-successful");
    }, 2000);
  };
  return (
    <SafeAreaView className="bg-white flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-row items-center px-4 py-4 border-b-[0.5px] border-[#DBE1EB] bg-white">
        <TouchableOpacity
          className="absolute left-4 z-10"
          onPress={() => router.back()}
        >
          <View className="mr-3">
            <Icon name="arrow-back" size={24} />
          </View>
        </TouchableOpacity>
        <Text className="font-psemibold text-base text-center flex-1">
          Payment
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-between">
          <View>
            <View className="p-4 border-[0.5px] border-[#DBE1EB] bg-white shadow-xl">
              <View className="flex-row justify-between items-center bg-[#35109D] py-5 px-[18px] rounded-[2px]">
                <View className="flex-row items-center">
                  <View className="w-6 h-6">
                    <Image
                      source={icons.invoice}
                      className="w-6 h-6"
                      resizeMode="contain"
                    />
                  </View>
                  <Text className="font-pmedium text-base text-white ml-2">
                    Required Balance
                  </Text>
                </View>
                <View>
                  <Text className="font-pbold text-base text-white">
                    35 USDT{" "}
                  </Text>
                </View>
              </View>

              {showInvoice && (
                <View className="py-3 px-3 border-[0.5px] border-[#DBE1EB] rounded-b-lg">
                  <View className="flex-row justify-between">
                    <Text className="font-psemibold text-sm text-primary-color uppercase">
                      Total amount
                    </Text>
                    <Text className="font-psemibold text-sm text-primary-color uppercase">
                      235 USDT
                    </Text>
                  </View>

                  <View className="border-t-[0.5px] border-[#DBE1EB] mt-3" />
                  <View className="flex-row justify-between my-4">
                    <Text className="font-pmedium text-[11px] text-secondary-color uppercase">
                      wallet BALANCE
                    </Text>
                    <Text className="font-pregular text-sm text-secondary-color uppercase">
                      200 USDT
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="font-pmedium text-[11px] text-secondary-color uppercase">
                      Add more
                    </Text>
                    <Text className="font-pregular text-sm text-secondary-color uppercase">
                      35 USDT
                    </Text>
                  </View>
                </View>
              )}

              <View className="flex-row justify-between mt-3 px-2">
                <Text className="font-psemibold text-[11px] underline text-primary-color">
                  Edit
                </Text>
                <TouchableOpacity onPress={() => setShowInvoice(!showInvoice)}>
                  <Text className="font-pmedium text-[11px] underline text-primary-purple">
                    {showInvoice ? "Close asset invoice" : "View asset invoice"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="justify-center mt-10">
              <View className="items-center">
                <Image
                  source={images.barcode}
                  className="w-24 h-24"
                  resizeMode="contain"
                />
              </View>
              <View className="px-8 mt-6">
                <TouchableOpacity onPress={() => setShowModal(true)}>
                  <View className="flex-row items-center justify-between p-4 border-[0.5px] border-[#DBE1EB] rounded-full mb-2">
                    <Text className="text-[12px] font-pmedium">
                      TRON Network
                    </Text>
                    <Icon name="caret-up" size={20} />
                  </View>
                </TouchableOpacity>
                <View className="flex-row items-center justify-between p-4 border-[0.5px] border-[#DBE1EB] rounded-full">
                  <Text
                    className="text-[12px] font-pmedium mr-5 overflow-ellipsis flex-1"
                    numberOfLines={1}
                  >
                    xv15395001030ffx12834939031vvv
                  </Text>
                  <Image
                    source={icons.copy}
                    className="w-5 h-5"
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          </View>

          <ModalWrapper
            isVisible={showModal}
            onCancel={() => setShowModal(false)}
            contentWrapperStyles="max-h-[85vh]"
            modalTitle="Choose Network"
            showCloseButton
          >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View className="px-4 py-5">
                {networks.map((network, i) => (
                  <TouchableOpacity
                    key={`${network.name}-${i}`}
                    className="px-4 py-5 border border-[#DBE1EB] rounded-xl mb-2 bg-white"
                  >
                    <Text className="text-sm font-psemibold mb-4">
                      {network.name}
                    </Text>
                    <Text className="text-[12px] font-pregular text-text-tertiary">
                      {network.blockConfirmations} block confirmation/s
                    </Text>
                    <Text className="text-[12px] font-pregular text-text-tertiary">
                      Min. deposit {network.minDeposit}
                    </Text>
                    <Text className="text-[12px] font-pregular text-text-tertiary">
                      Est. arrival {network.estArrival}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </ModalWrapper>

          <View className="px-4 pt-6 pb-3 mt-4">
            <View className="">
              <Text className="text-sm font-pmedium mb-3">
                Pay via credit card
              </Text>
              <CustomButtonWithIcon
                title="ADD CARD"
                handleOnPress={onPayClick}
                containerStyles="bg-[#060A10] rounded-[12px] min-h-[56px] max-h-[56px] mb-3"
                textStyles="text-white"
                icon={"add-circle-outline"}
                iconColor="#fff"
              />
            </View>
            <View className="mt-8">
              <Text className="text-sm font-pmedium mb-3">
                Or continue with
              </Text>
              <CustomButtonWithIcon
                title="Pay"
                handleOnPress={onPayClick}
                containerStyles="bg-white rounded-[12px] min-h-[56px] max-h-[56px] border-[0.5px] border-[#999FA8] mb-2"
                textStyles="text-primary-color"
                icon={icons.google}
                iconColor="#fff"
              />
              <CustomButtonWithIcon
                title="Pay"
                handleOnPress={onPayClick}
                containerStyles="bg-white rounded-[12px] min-h-[56px] max-h-[56px] border-[0.5px] border-[#999FA8]"
                textStyles="text-primary-color"
                icon={"logo-apple"}
                iconColor="#090E14"
              />
            </View>
            <ModalWrapper
              isVisible={showLoadingModal}
              onCancel={() => setShowLoadingModal(false)}
              contentWrapperStyles="max-h-[100vh]"
            >
              <View className="items-center justify-center flex-1">
                <View>
                  <Text className="font-psemibold text-base text-primary-color">
                    Payment processing
                  </Text>
                  <View className="items-center justify-center mt-10">
                    <Loader />
                    <Text className="font-pregular text-sm text-primary-color mt-7">
                      Waiting for payment...
                    </Text>
                  </View>
                </View>
              </View>
            </ModalWrapper>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;
