import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import CoinCard, { CoinData } from "./CoinCard";
import OrderInput from "./OrderInput";
import CustomDropdown from "./CustomDropdown";
import { CustomButtonWithBg } from "../CustomButton";
import Dex from "@/app/screens/Dex/Dex";
import ModalWrapper from "../ModalWrapper";
import { router } from "expo-router";
import { icons } from "@/constants";

interface ExecutionProps {
  coinData: CoinData;
}
const Execution = ({ coinData }: ExecutionProps) => {
  const [action, setAction] = useState("buy");
  const [baseValue, setBaseValue] = useState<number | string>(0);
  const [quoteValue, setQuoteValue] = useState<number | string>(0);
  const [totalValue, setTotalValue] = useState<number | string>(0);
  const [isCoinModalVisible, setIsCoinModalVisible] = useState(false);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);

  const actionDisabled = false;

  const executionOptions = [
    "Set Limit",
    "Limit",
    "Market",
    "Stop Limit",
    "Buy Stop",
    "Sell Stop",
  ];
  const percentageOptions = ["25%", "50%", "75%", "100%"];

  const accountOptions = [
    {
      name: "KORRA1",
      price: "$200",
    },
    {
      name: "KORRA2",
      price: "$300",
    },
    {
      name: "KORRA3",
      price: "$400",
    },
  ];

  return (
    <View className="">
      <View className="px-4">
        <CoinCard
          imageStyles="w-[32px] h-[32px]"
          textStyles="text-base"
          showChevron
          coinData={coinData}
          onChevronPress={() => setIsCoinModalVisible(!isCoinModalVisible)}
          onCoinPress={() => setIsCoinModalVisible(!isCoinModalVisible)}
        />

        <ModalWrapper
          isVisible={isCoinModalVisible}
          onCancel={() => setIsCoinModalVisible(false)}
          modalTitle="Markets"
          showCloseButton
          contentWrapperStyles="max-h-[90vh]"
        >
          <Dex modal />
        </ModalWrapper>
      </View>
      <View className="flex-row justify-between mt-2 mb-3 px-4">
        <View className="flex-row flex-1 p-1 border border-[#DBE1EB] rounded-md mr-2 max-w-[242px]">
          <TouchableOpacity
            onPress={() => setAction("buy")}
            className={`py-1 px-3 flex-1 rounded-md mr-[2px] ${
              action === "buy" ? "bg-sinpe-green/10" : ""
            }`}
          >
            <Text
              className={`text-[12px] text-center  ${
                action === "buy"
                  ? "text-sinpe-green font-pbold"
                  : "text-secondary-color font-pmedium"
              }`}
            >
              Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setAction("sell")}
            className={`py-1 px-3  flex-1 rounded-md mr-[2px] ${
              action === "sell" ? "bg-sinpe-red/10" : ""
            }`}
          >
            <Text
              className={`text-[12px] text-center  ${
                action === "sell"
                  ? "text-sinpe-red font-pbold"
                  : "text-secondary-color font-pmedium"
              }`}
            >
              Sell
            </Text>
          </TouchableOpacity>
        </View>

        <CustomDropdown
          options={executionOptions}
          defaultOption={executionOptions[0]}
          conatinerStyles="min-w-[85px]"
        />
      </View>

      <View className="px-4">
        <OrderInput
          placeholder="BTC"
          value={baseValue}
          setValue={setBaseValue}
          containerStyles="mb-3"
        />
        <OrderInput
          placeholder="Price (USDT)"
          value={quoteValue}
          setValue={setQuoteValue}
          containerStyles="mb-3"
        />

        <View className="flex-row justify-between mb-5">
          {percentageOptions.map((option, i) => (
            <TouchableOpacity key={`${option}-${i}`}>
              <View className="bg-[#F4FBFF] rounded-sm border-[0.5px] border-input-border py-[6px] px-[14px] w-[80px] shadow-md">
                <Text className="font-pmedium text-[11px] text-center">
                  {option}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="py-3 px-4 rounded-t-lg border border-b-[0] border-[#DBE1EB] bg-white shadow-2xl">
        <OrderInput
          placeholder="Total (USDT)"
          value={totalValue}
          setValue={setTotalValue}
          containerStyles="mb-3"
        />

        <View className="flex-row">
          <CustomDropdown
            options={accountOptions}
            defaultOption={accountOptions[0]}
            labelText
            conatinerStyles="min-w-[95px] rounded-xl bg-white"
            top
          />
          <CustomButtonWithBg
            title={action === "buy" ? "Buy" : "Sell"}
            handleOnPress={() => setIsPaymentVisible(!isPaymentVisible)}
            containerStyles="ml-2 flex-1"
            disabled={actionDisabled}
          />

          <ModalWrapper
            isVisible={isPaymentVisible}
            onCancel={() => setIsPaymentVisible(false)}
            contentWrapperStyles="max-h-[65vh] h-max"
          >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View className="flex-1">
                <View className="px-4">
                  <View className="flex-row justify-between items-center bg-[#35109D] h-[88px] px-[18px] rounded-xl">
                    <View className="flex-row items-center">
                      <View className="w-6 h-6">
                        <Image
                          source={icons.invoice}
                          className="w-6 h-6"
                          resizeMode="contain"
                        />
                      </View>
                      <Text className="font-pmedium text-base text-white ml-2">
                        Total pay
                      </Text>
                    </View>
                    <View>
                      <Text className="font-pbold text-base text-white">
                        $235/-
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => router.push("/screens/Dex/AssetInvoice")}
                  >
                    <View className="mt-4">
                      <Text className="text-right w-full text-[11px] font-pmedium text-[#35109D] underline">
                        View asset invoice
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View className="flex-row items-center px-4 py-3 mt-4 border-[0.5px] border-[#DBE1EB] bg-[#FFFCF4]">
                  <Icon
                    name="alert-circle-outline"
                    size={24}
                    color={"#AE9435"}
                  />
                  <View className="ml-2">
                    <Text className="text-[12px] font-pbold text-[#AE9435]">
                      Insufficient Wallet Balance{" "}
                    </Text>
                    <Text className="text-[12px] font-pregular text-[#AE9435]">
                      Add more than $35 to complete the order
                    </Text>
                  </View>
                </View>

                <View className="mt-4 px-4">
                  <Text className="text-[11px] font-pmedium text-secondary-color uppercase">
                    Pay with wallet
                  </Text>
                  <View className="mt-2 flex-row">
                    <View className="py-1 px-3 bg-white border-[0.5px] border-[#DBE1EB] rounded-xl shadow-md">
                      <Text className="text-[11px] font-pregular text-secondary-color uppercase">
                        wallet BALANCE
                      </Text>
                      <Text className="text-base font-pregular text-primary-color uppercase">
                        $200
                      </Text>
                    </View>

                    <TouchableOpacity className="bg-[#35109D] py-[18px] px-4 rounded-xl flex-1 ml-2">
                      <Text className="text-white font-psemibold text-sm text-center">
                        Add balance & buy
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View className="flex-row items-center px-5 mt-8">
                  <View className="border-t-[0.5px] border-[#DBE1EB] mr-2 flex-1" />
                  <Text className="text-primary-color font-pregular">OR</Text>
                  <View className="border-t-[0.5px] border-[#DBE1EB] ml-2 flex-1" />
                </View>

                <TouchableOpacity
                  onPress={() => router.push("/screens/Dex/AssetInvoice")}
                  className="px-4"
                >
                  <View className="mt-4">
                    <Text className="text-left uppercase w-full text-[11px] font-pmedium text-secondary-color">
                      View asset invoice
                    </Text>
                  </View>
                </TouchableOpacity>
                <View className="flex-1 justify-end pb-6 pt-8 px-4">
                  <CustomButtonWithBg
                    title="Continue with deposit"
                    containerStyles="min-h-[56px] max-h-[56px]"
                    handleOnPress={() => router.push("/screens/Dex/Payment")}
                  />
                </View>
              </View>
            </ScrollView>
          </ModalWrapper>
        </View>
      </View>
    </View>
  );
};

export default Execution;
