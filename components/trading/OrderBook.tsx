import React from "react";
import { View, Text } from "react-native";

interface OrderBookProps {
  asks: Order[];
  bids: Order[];
}

interface Order {
  price: number;
  amount: number;
}

const OrderBook = ({ asks, bids }: OrderBookProps) => {
  const RenderItem = ({ item, type }: { item: Order; type: "ask" | "bid" }) => (
    <View
      className={`justify-between w-full px-3 ${
        type === "bid" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <Text
        className={`font-pmedium text-[12px] ${
          type === "bid" ? "text-sinpe-green" : "text-sinpe-red"
        }`}
      >
        {item.price}
      </Text>
      <Text className={`font-pmedium text-[12px] text-text-tertiary`}>
        {item.amount}
      </Text>
    </View>
  );

  return (
    <View>
      <View className="flex-row">
        <View className="w-[50%] ">
          {bids.map((item, i) => (
            <RenderItem key={`bid${i}`} item={item} type="bid" />
          ))}
        </View>
        <View className="w-[50%]">
          {asks.map((item, i) => (
            <RenderItem key={`ask-${i}`} item={item} type="ask" />
          ))}
        </View>
      </View>
    </View>
  );
};

export default OrderBook;
