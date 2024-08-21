import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchCoins } from "@/data/order-book-data";
import FilterButton from "../../../components/trading/FilterButton";
import CoinCard from "../../../components/trading/CoinCard";
import { router, Stack } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  total_volume: number;
  current_price: number;
  price_change_percentage_24h: number;
}

interface DexProps {
  modal?: boolean;
}
const Dex = ({ modal }: DexProps) => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [filter, setFilter] = useState("Popular coin");
  const [filteredCoins, setFilteredCoins] = useState<CoinData[]>();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getCoins = async () => {
      const data = await fetchCoins();
      if (data) {
        setCoins(data);
        setFilteredCoins(data);
        // console.log(JSON.stringify(coins, null, 2));
      }
    };
    getCoins();
  }, []);

  const filterCoins = (filter: string) => {
    const filteredCoins = coins.filter((coin, i) => {
      if (filter === "Gainers") {
        return coin.price_change_percentage_24h > 0;
      } else if (filter === "Losers") {
        return coin.price_change_percentage_24h < 0;
      } else {
        return coin;
      }
    });

    setFilteredCoins(filteredCoins);
  };

  const onfilterList = (search: string) => {
    const filteredCoinArray = coins?.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredCoins(filteredCoinArray);
  };

  const handleFilterSelect = (option: string) => {
    setFilter(option);
    filterCoins(option);
  };

  const filterOptions = ["Gainers", "Losers", "Popular coin"];
  return (
    <View className="flex-1 bg-white">
      {modal && (
        <View className="px-4">
          <View className="flex-row items-center border border-input-border py-2 px-4 h-[48px] bg-white my-3 rounded-xl">
            <TextInput
              placeholder="Search coin"
              className="flex-1 font-pmedium text-sm"
              onChangeText={(e) => {
                setSearch(e);
                onfilterList(e);
              }}
              value={search}
            />
            <Icon name="search" size={20} color={"#5C626A"} />
          </View>
        </View>
      )}
      <View className="flex-row px-4 pb-4 justify-center">
        {filterOptions.map((option, i) => (
          <FilterButton
            key={`${option}-${i}`}
            option={option}
            containerStyles="mr-3 "
            handleSelect={handleFilterSelect}
            selected={option === filter}
          />
        ))}
      </View>
      <View className="flex-row justify-between bg-[#F0F6FF] border-[0.5px] border-[#DBE1EB] px-4 py-[6px]">
        <Text className="text-[12px] font-pmedium text-primary-color">
          Coins
        </Text>
        <Text className="text-[12px] font-pmedium text-primary-color">
          Holdings
        </Text>
      </View>
      <FlatList
        data={filteredCoins}
        renderItem={({ item }) => {
          return (
            <CoinCard
              textStyles=""
              imageStyles="w-[22px] h-[22px]"
              coinData={{
                id: item.id,
                symbol: item.symbol,
                image: item.image,
                volume: item.total_volume,
                price: item.current_price,
                percentageChange: item.price_change_percentage_24h,
              }}
              onCoinPress={() => {
                router.push(`/screens/Dex/${item.id}`);
              }}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        className="flex-1 px-4"
      />
    </View>
  );
};

export default Dex;
