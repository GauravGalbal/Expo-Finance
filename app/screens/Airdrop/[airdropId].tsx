import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomButtonWithBg } from "@/components/CustomButton";
import { fetchAirdrop } from "@/data/airdrops";
import { AirdropData } from "@/components/Airdrop/AirdropCard";

interface AirdropDetailsProps {
  airdropId: string | string[] | undefined;
  claimed: string | string[] | undefined;
}

interface AirdropDetailsState {
  show: boolean;
  airdropData?: AirdropData;
}

class AirdropDetails extends Component<
  AirdropDetailsProps,
  AirdropDetailsState
> {
  constructor(props: AirdropDetailsProps) {
    super(props);
    this.state = {
      show: false,
      airdropData: undefined,
    };

    this.handleClaimPress = this.handleClaimPress.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  componentDidMount() {
    this.fetchAirdropData();
  }

  fetchAirdropData() {
    const { airdropId } = this.props;
    const data = fetchAirdrop(airdropId);
    this.setState({ airdropData: data });
  }

  handleClaimPress() {
    // onClaimPress?.();
  }

  toggleDetails() {
    this.setState((prevState) => ({ show: !prevState.show }));
  }

  render() {
    const { show, airdropData } = this.state;
    const { claimed } = this.props;

    return (
      <SafeAreaView className="flex-1 bg-white">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
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
            {airdropData?.name}
          </Text>
        </View>
        
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View className="h-[90vh] justify-between px-4 ">
            <View>
              <View className="mt-8 bg-white">
                <View className="justify-center items-center mb-6">
                  <View className="w-[100px] h-[100px] mb-4">
                    <Image
                      source={airdropData?.image}
                      className="w-full h-full rounded-full"
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <Text className="font-psemibold text-[20px] mb-[10px] text-center">
                      {airdropData?.name}
                    </Text>
                    <Text className="font-pregular text-secondary-color text-[12px] text-center">
                      {airdropData?.description}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row justify-between px-2 pt-[18px] pb-[14px] border-[0.5px] bg-white border-[#DBE1EB] shadow-xl mb-4 rounded-xl">
                <View>
                  <Text className="font-pmedium uppercase text-secondary-color text-[12px] mb-[14px]">
                    Airdrop vAlue
                  </Text>
                  <Text className="font-psemibold uppercase text-primary-color text-[12px] mb-[10px]">
                    $ 200k
                  </Text>
                  <Text className="font-pregular uppercase text-primary-color text-[12px]">
                    SparkX TOKENS
                  </Text>
                </View>
                <View>
                  <Text className="font-pmedium uppercase text-secondary-color text-[12px] mb-[14px] text-right">
                    No of winners
                  </Text>
                  <Text className="font-psemibold uppercase text-primary-color text-[12px] mb-[10px] text-right">
                    40K
                  </Text>
                  <Text className="font-pregular uppercase text-primary-color text-[12px] text-right">
                    5$ per winner
                  </Text>
                </View>
              </View>

              <View className="w-full p-4 bg-white overflow-hidden rounded-lg border-[0.5px] border-[#F1F4F7] shadow-lg">
                <View className="flex-row justify-between items-center">
                  <Text className="text-primary-color font-psemibold">
                    Details
                  </Text>
                  <TouchableOpacity onPress={this.toggleDetails}>
                    <Icon name="chevron-down" size={18} />
                  </TouchableOpacity>
                </View>
                {show && (
                  <Text className="text-[11px] font-pregular">
                    Crypto Wallet act like a bank to store, deposit and withdraw
                    your crypto currency
                  </Text>
                )}
              </View>
            </View>

            <View className="">
              <View className="flex-row justify-between px-2 pt-[18px] pb-[14px] border-[0.5px] bg-white border-[#DBE1EB] shadow-xl mb-4 rounded-lg">
                <View>
                  <Text className="font-psemibold text-[12px]">
                    Expiry Date
                  </Text>
                  <View className="border-[0.5px] bg-[#F1ECFF] border-primary-purple shadow-xl py-[10px] px-2 rounded-[4px] min-w-[77px]">
                    <Text className="font-pregular text-[12px] text-center whitespace-nowrap">
                      {airdropData?.expiryDate}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text className="font-psemibold text-[12px] text-right">
                    Time left
                  </Text>
                  <View className="border-[0.5px] bg-[#F1ECFF] border-primary-purple shadow-xl py-[10px] px-2 rounded-[4px] w-[59px] min-w-[77px]">
                    <Text className="font-psemibold text-[12px] text-center whitespace-nowrap">
                      {airdropData?.timeLeft}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row">
                <CustomButtonWithBg
                  title={claimed === "true" ? "Claimed" : "claim"}
                  handleOnPress={this.handleClaimPress}
                  containerStyles="shadow-2xl min-h-[68px]"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default (props: any) => {
  const { airdropId, claimed } = useLocalSearchParams();
  return <AirdropDetails airdropId={airdropId} claimed={claimed} />;
};
