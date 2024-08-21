import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

import { CandlestickChart, LineChart } from "react-native-wagmi-charts";
import { fetchTradingData } from "@/data/chart";
import { OrderBookBTCUSDT } from "@/data/order-book-data";
import { formatDate } from "@/utils/helper";

export function CandleChart() {
  const [tradingData, setTradingData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTradingData();
      setTradingData(result);
    };
    fetchData();
  }, []);

  // if (Array.isArray(tradingData)) {
  //   // console.log(true);
  //   // console.log(JSON.stringify(tradingData, null, 2));
  //   // console.log(JSON.stringify(Object.entries(tradingData), null, 2));
  // }

  return (
    <View className=" bg-white flex-row pr-7">
      <View className="border-r border-[#DBE1EB]">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <CandlestickChart.Provider data={tradingData}>
            <CandlestickChart width={1000} height={200}>
              <CandlestickChart.Candles />
              {/* <CandlestickChart.Crosshair>
              <CandlestickChart.Tooltip />
            </CandlestickChart.Crosshair> */}
            </CandlestickChart>
            <CandlestickChart.PriceText type="open" />
            <CandlestickChart.PriceText type="high" />
            <CandlestickChart.PriceText type="low" />
            <CandlestickChart.PriceText type="close" />
            <CandlestickChart.DatetimeText />
          </CandlestickChart.Provider>
        </ScrollView>
      </View>
      <View className="max-h-[200px]">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-[100px] flex-1">
            {OrderBookBTCUSDT.asks.map((price, i) => (
              <View key={`${price}-${i}`} className="">
                <Text className="text-[11px] font-pregular text-secondary-color mb-4">{`-${price.price}`}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
export function LineCharts() {
  const [tradingData, setTradingData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchTradingData();
      if (result) {
        const formattedData = result.map((price, i) => {
          return {
            timestamp: price.timestamp,
            value: price.high,
          };
        });
        setTradingData(formattedData);
      }
      // console.log()
      // if (result) {
      //   // console.log(JSON.parse(result));
      //   // console.log(Object.keys(tradingData));
      // }
    };
    fetchData();
  }, []);

  // if (Array.isArray(tradingData)) {
  //   // console.log(true);
  //   console.log(JSON.stringify(tradingData, null, 2));
  //   // console.log(JSON.stringify(Object.entries(tradingData), null, 2));
  // }

  return (
    <View className=" bg-white">
      <View className="border-r border-[#DBE1EB]">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View className="flex-1">
            {tradingData && (
              <LineChart.Provider data={tradingData}>
                <LineChart height={200}>
                  <LineChart.Path color="#5349C46E">
                    <LineChart.Gradient color="#0F30DA" />
                  </LineChart.Path>
                  <LineChart.CursorCrosshair>
                    <LineChart.Tooltip
                      position="top"
                      textStyle={{
                        backgroundColor: "white",
                        borderRadius: 4,
                        color: "black",
                        fontSize: 12,
                        paddingHorizontal: 4,
                        paddingVertical: 2,
                        fontFamily: "Poppins-Light",
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 8,
                        borderWidth: 0.5,
                        borderColor: "#DBE1EB",
                        backgroundColor: "#fff",
                        borderRadius: 8,
                        paddingHorizontal: 6,
                      }}
                    >
                      <LineChart.PriceText
                        format={({ value }) => {
                          "worklet";
                          const formattedPrice = `$${value}`;
                          return formattedPrice;
                        }}
                        style={{
                          fontFamily: "Poppins-Medium",
                          fontSize: 12,
                        }}
                      />
                      <LineChart.DatetimeText
                        format={({ value }) => {
                          "worklet";
                          const date = new Date(value);
                          const months = [
                            "JAN",
                            "FEB",
                            "MAR",
                            "APR",
                            "MAY",
                            "JUN",
                            "JUL",
                            "AUG",
                            "SEP",
                            "OCT",
                            "NOV",
                            "DEC",
                          ];
                          const monthIndex = date.getMonth();
                          const day = date.getDate();
                          return `${months[monthIndex]} ${day}`;
                        }}
                        style={{
                          fontFamily: "Poppins-Regular",
                          fontSize: 12,
                        }}
                      />
                    </LineChart.Tooltip>
                  </LineChart.CursorCrosshair>
                  <LineChart.CursorLine />
                </LineChart>
              </LineChart.Provider>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
