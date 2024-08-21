import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";
import Icon from "react-native-vector-icons/Ionicons";
import { formatNumber } from "@/utils/helper";

export interface CoinData {
  id: string;
  symbol: string;
  image: string;
  volume: number;
  price: number;
  percentageChange: number;
}
interface CoinCardProps {
  textStyles?: string;
  imageStyles?: string;
  showChevron?: boolean;
  coinData: CoinData;
  onCoinPress?: () => void;
  onChevronPress?: () => void;
}

const CoinCard = ({
  textStyles,
  imageStyles,
  showChevron,
  coinData,
  onCoinPress,
  onChevronPress,
}: CoinCardProps) => {
  const trend = coinData.percentageChange > 0;

  const handleOnPress = () => {
    onCoinPress?.();
  };
  const handleChevronPress = () => {
    onChevronPress?.();
  };
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View className="flex-row justify-between items-center w-full py-2">
        <View className="flex-row items-center justify-center">
          <View className={`rounded-full ${imageStyles}`}>
            <Image
              source={{ uri: coinData.image }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
          <View className="ml-2">
            <Text className={`font-psemibold ${textStyles}`}>
              {coinData.symbol.toUpperCase()}
              <Text className="text-text-tertiary"> /USDT</Text>
            </Text>
            <Text className={`text-text-tertiary font-pregular ${textStyles}`}>
              Vol {formatNumber(coinData.volume)}
            </Text>
          </View>
          {showChevron && (
            <TouchableOpacity className="ml-2" onPress={handleChevronPress}>
              <Icon name="chevron-down" size={24} color={"#5C626A"} />
            </TouchableOpacity>
          )}
        </View>
        <View className="items-end">
          <Text className={`font-pmedium ${textStyles}`}>
            ${coinData.price}
          </Text>
          <View className="flex-row items-center justify-center">
            <Icon
              name={trend ? "arrow-up" : "arrow-down"}
              size={showChevron ? 16 : 14}
              color={trend ? "#009367" : "#F34943"}
            />

            <Text
              className={`font-pmedium ml-[2px] ${textStyles} ${
                trend ? "text-sinpe-green" : "text-sinpe-red"
              }`}
            >
              {Math.abs(coinData.percentageChange).toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CoinCard;
