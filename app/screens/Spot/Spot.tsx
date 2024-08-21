import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import OrderBook from "@/components/trading/OrderBook";
import Execution from "@/components/trading/Execution";
import { fetchCoin, OrderBookBTCUSDT } from "@/data/order-book-data";
import TimeFrame from "@/components/trading/TimeFrame";
import { CoinData } from "@/components/trading/CoinCard";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { ExecutionTabParamList } from "@/navigation/types";
import CustomHeaderSwitch from "@/components/CustomHeaderSwitch";
import { fetchTradingData } from "@/data/chart";
import { CandleChart, LineCharts } from "@/components/trading/Chart";

type Props = MaterialTopTabScreenProps<ExecutionTabParamList, "Spot">;

const Spot = ({ route }: Props) => {
  const routes = ["Order Book", "Charts"];
  const [isFocused, setIsFocused] = useState("Order Book");
  const [coinData, setCoinData] = useState<CoinData>();
  const [chartType, setChartType] = useState("Candlestick");
  // console.log(isFocused);

  const { coinId } = route.params;

  const fetchCoinData = async () => {
    const coin = await fetchCoin(coinId);
    if (coin?.id) {
      setCoinData({
        id: coin.id,
        symbol: coin.symbol,
        image: coin.image,
        volume: coin.total_volume,
        price: coin.current_price,
        percentageChange: coin.price_change_percentage_24h,
      });
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchTradingData();
  }, []);

  const handleFocused = (route: string) => {
    setIsFocused(route);
  };

  const handleChartChange = (option: string) => {
    setChartType(option);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
        <View>
          <CustomHeaderSwitch routes={routes} onFocusRoute={handleFocused} />

          <View className="bg-white border-b-[0.5px] border-[#DBE1EB]">
            {/* Coin prices header */}
            {isFocused === "Order Book" && (
              <>
                <View className="flex-row justify-between px-4 py-2 bg-white border-[0.5px] border-[#DBE1EB]">
                  <Text className="font-pmedium text-[12px]">Coin</Text>
                  <Text className="font-pmedium text-[12px]">
                    Amount {`${coinData ? coinData?.symbol.toUpperCase() : ""}`}
                  </Text>
                  <Text className="font-pmedium text-[12px]">Price</Text>
                </View>
                {/* Coin Prices */}
                <View className="py-2">
                  <OrderBook
                    asks={OrderBookBTCUSDT.asks}
                    bids={OrderBookBTCUSDT.bids}
                  />
                </View>
              </>
            )}

            {isFocused === "Charts" && (
              <>
                <View className="min-[224px]">
                  <View className="flex-row justify-between px-4 py-2 bg-white border-[0.5px] border-r-0 border-[#DBE1EB]">
                    <Text className="font-pmedium text-[12px]">
                      {`${coinData ? coinData?.symbol.toUpperCase() : ""}`}
                    </Text>
                    <Text className="font-pmedium text-[12px]">Price</Text>
                  </View>
                  <View
                    className={`flex-shrink min-h-[200] ${
                      chartType === "Candlestick" && "pr-9"
                    }`}
                  >
                    {chartType === "Candlestick" && <CandleChart />}
                    {chartType === "Line" && <LineCharts />}
                  </View>
                </View>
              </>
            )}

            {/* TimeFrame */}
            <View className="pb-2 mt-2">
              <TimeFrame onChartChange={handleChartChange} />
            </View>
          </View>

          <View className="bg-white">
            {coinData && <Execution coinData={coinData} />}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Spot;
