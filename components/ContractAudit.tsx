import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Gauge from "./Guage";
import Icon from "react-native-vector-icons/Ionicons";

const contractData = {
  token_holder: {
    number_holder: 83,
    upgradable: "No",
  },
  financials: {
    liquidity: "$856",
    gas_fee: "$0.80",
  },
  taxes: {
    buy_tax: "5%",
    sell_tax: "8%",
    transfer_tax: "9%",
    highest_tax: "15%",
  },
  risk: {
    honeypot_risk: "high",
    value: 4,
  },
};
const ContractAudit = () =>
  // contractData: any
  {
    const [isVisible, setIsVisible] = useState(false);
    return (
      <View className="items-start w-full">
        <TouchableOpacity
          className="self-end"
          onPress={() => setIsVisible(true)}
        >
          <View className="border-2 rounded-full items-center justify-center p-1">
            <Icon name="information-outline" size={20} />
          </View>
        </TouchableOpacity>
        <ContractModal
          isVisible={isVisible}
          onCancel={() => setIsVisible(false)}
        />
        {/**Token Holders */}
        <Text className="font-psemibold text-sm">Token Holders:</Text>
        <View className="flex-row pl-2 items-center justify-center">
          <Text className="text-lg mr-3">{`\u2022`}</Text>
          <Text className="font-psemibold text-sm items-center justify-center">
            Number of Holders:{" "}
            <Text className="font-pregular">
              {contractData.token_holder.number_holder}
            </Text>
          </Text>
        </View>
        <View className="flex-row items-center justify-center pl-2">
          <Text className="text-lg mr-3">{`\u2022`}</Text>
          <Text className="font-psemibold text-sm items-center justify-center">
            Upgradable/Changeable:{" "}
            <Text className="font-pregular">
              {contractData.token_holder.upgradable}
            </Text>
          </Text>
        </View>
        {/**Financials */}
        <Text className="font-psemibold text-sm">Financials:</Text>
        <View className="flex-row items-center justify-center pl-2">
          <Text className="text-lg mr-3">{`\u2022`}</Text>
          <Text className="font-psemibold text-sm items-center justify-center">
            Liquidity:{" "}
            <Text className="font-pregular">
              {contractData.financials.liquidity}
            </Text>
          </Text>
        </View>
        <View className="flex-row items-center justify-center pl-2">
          <Text className="text-lg mr-3">{`\u2022`}</Text>
          <Text className="font-psemibold text-sm items-center justify-center">
            Average Gas Fee:{" "}
            <Text className="font-pregular">
              {contractData.financials.gas_fee}
            </Text>
          </Text>
        </View>
        {/**Taxes*/}
        <Text className="font-psemibold text-sm">Taxes:</Text>
        <View className="flex-row items-center justify-center pl-2">
          <Text className="text-lg mr-3">{`\u2022`}</Text>
          <Text className="font-psemibold text-sm items-center justify-center">
            Buy Tax:{" "}
            <Text className="font-pregular">{contractData.taxes.buy_tax}</Text>
          </Text>
        </View>
        <View className="flex-row items-center justify-center pl-2">
          <Text className="text-lg mr-3">{`\u2022`}</Text>
          <Text className="font-psemibold text-sm items-center justify-center">
            Sell Tax:{" "}
            <Text className="font-pregular">{contractData.taxes.sell_tax}</Text>
          </Text>
        </View>
        <View className="flex-row items-center justify-center pl-2">
          <Text className="text-lg mr-3">{`\u2022`}</Text>
          <Text className="font-psemibold text-sm items-center justify-center">
            Transfer Tax:{" "}
            <Text className="font-pregular">
              {contractData.taxes.transfer_tax}
            </Text>
          </Text>
        </View>
        <View className="flex-row items-center justify-center pl-2">
          <Text className="text-lg mr-3">{`\u2022`}</Text>
          <Text className="font-psemibold text-sm items-center justify-center">
            Highest Tax:{" "}
            <Text className="font-pregular">
              {contractData.taxes.highest_tax}
            </Text>
          </Text>
        </View>
        {/**Risk*/}
        <Text className="font-psemibold text-sm">Risk:</Text>
        <View className="flex-row items-center justify-center pl-2">
          <Text className="text-lg mr-3">{`\u2022`}</Text>
          <Text
            className={`font-psemibold text-sm items-center justify-center `}
          >
            Honeypot Risk:{" "}
            <Text
              className={`capitalize text-[14px] ${
                contractData.risk.honeypot_risk === "high"
                  ? "text-[#f00]"
                  : "text-[#7FE47E]"
              }`}
            >
              {contractData.risk.honeypot_risk}
            </Text>
          </Text>
        </View>
        <View className="self-center mt-5">
          <Gauge value={contractData.risk.value} maxValue={10} />
        </View>
      </View>
    );
  };

const ContractModal = ({
  isVisible,
  onCancel,
}: {
  isVisible: boolean;
  onCancel: () => void;
}) => {
  const handleModalDismiss = () => {
    onCancel();
  };
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={() => {}}>
        <View className={"bg-white/90 flex-1 p-5"}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="bg-white p-4 px-7 rounded-2xl shadow-md shadow-primary-color">
              <TouchableOpacity
                className="self-end"
                onPress={handleModalDismiss}
              >
                <View className="border-2 rounded-full items-center justify-center p-1">
                  <Icon name="close" size={20} />
                </View>
              </TouchableOpacity>
              <View className="px-4">
                <Text className="font-psemibold text-sm">Token Holders:</Text>
                <View className="flex-row pl-2">
                  <Text className="text-lg mr-3">{`\u2022`}</Text>
                  <Text className="font-psemibold text-sm">
                    Number of Holders:{" "}
                    <Text className="font-pregular">
                      There are only {contractData.token_holder.number_holder}{" "}
                      addresses that hold this token.
                    </Text>
                  </Text>
                </View>
                <View className="flex-row pl-2">
                  <Text className="text-lg mr-3">{`\u2022`}</Text>
                  <Text className="font-psemibold text-sm items-center justify-center">
                    Upgradable/Changeable:{" "}
                    <Text className="font-pregular">
                      This token{" "}
                      {contractData.token_holder.upgradable === "No"
                        ? "cannot"
                        : "can"}{" "}
                      be modified or upgraded in the future.
                    </Text>
                  </Text>
                </View>
                {/**Financials */}
                <Text className="font-psemibold text-sm">Financials:</Text>
                <View className="flex-row pl-2">
                  <Text className="text-lg mr-3">{`\u2022`}</Text>
                  <Text className="font-psemibold text-sm items-center justify-center">
                    Liquidity:{" "}
                    <Text className="font-pregular">
                      This is the amount of money available for trading the
                      token. Currently, there is only{" "}
                      {contractData.financials.liquidity}, which is very low and
                      might make it hard to buy or sell the token easily.
                    </Text>
                  </Text>
                </View>
                <View className="flex-row  pl-2">
                  <Text className="text-lg mr-3">{`\u2022`}</Text>
                  <Text className="font-psemibold text-sm items-center justify-center">
                    Average Gas Fee:{" "}
                    <Text className="font-pregular">
                      The cost to perform transactions on the blockchain. For
                      this token, it's {contractData.financials.gas_fee} per
                      transaction.
                    </Text>
                  </Text>
                </View>
                {/**Taxes*/}
                <Text className="font-psemibold text-sm">Taxes:</Text>
                <View className="flex-row pl-2">
                  <Text className="text-lg mr-3">{`\u2022`}</Text>
                  <Text className="font-psemibold text-sm items-center justify-center">
                    Buy Tax:{" "}
                    <Text className="font-pregular">
                      When you buy the token, you are charged a{" "}
                      {contractData.taxes.buy_tax} fee.
                    </Text>
                  </Text>
                </View>
                <View className="flex-row pl-2">
                  <Text className="text-lg mr-3">{`\u2022`}</Text>
                  <Text className="font-psemibold text-sm items-center justify-center">
                    Sell Tax:{" "}
                    <Text className="font-pregular">
                      When you sell the token, you are charged an{" "}
                      {contractData.taxes.sell_tax} fee.
                    </Text>
                  </Text>
                </View>
                <View className="flex-row pl-2">
                  <Text className="text-lg mr-3">{`\u2022`}</Text>
                  <Text className="font-psemibold text-sm items-center justify-center">
                    Transfer Tax:{" "}
                    <Text className="font-pregular">
                      When you transfer the token to another person or address,
                      you are charged a {contractData.taxes.transfer_tax} fee.
                    </Text>
                  </Text>
                </View>
                <View className="flex-row pl-2">
                  <Text className="text-lg mr-3">{`\u2022`}</Text>
                  <Text className="font-psemibold text-sm items-center justify-center">
                    Highest Tax:{" "}
                    <Text className="font-pregular">
                      The maximum tax rate you might face is{" "}
                      {contractData.taxes.highest_tax}.
                    </Text>
                  </Text>
                </View>
                {/**Risk*/}
                <Text className="font-psemibold text-sm">Risk:</Text>
                <View className="flex-row pl-2">
                  <Text className="text-lg mr-3">{`\u2022`}</Text>
                  <Text
                    className={`font-psemibold text-sm items-center justify-center `}
                  >
                    Honeypot Risk:{" "}
                    <Text className={`font-pregular`}>
                      This measures the risk of the token being a scam where you
                      can't sell once bought. For this token, the risk is{" "}
                      {contractData.risk.honeypot_risk}.
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ContractAudit;
