import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { router } from "expo-router";
import CustomHeaderSwitch from "@/components/CustomHeaderSwitch";
import {
  AirdropCardClaimed,
  AirdropCardUnClaimed,
  AirdropData,
} from "@/components/Airdrop/AirdropCard";
import { fetchAllAirdrops } from "@/data/airdrops";
import AllAirDropSkeletion from "@/components/loading/airdrop/AllAirDropSkeletion";
import { set } from "firebase/database";

const AirDrops = () => {
  const routes = ["All Airdrops", "My Airdrops"];
  const [isFocused, setIsFocused] = useState(routes[0]);
  const [allAirdrops, setAllAirdrops] = useState<AirdropData[]>([]);
  const [userAirdrops, setUserAirdrops] = useState<AirdropData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  // setTimeout(() => {
  //   setLoading(!loading);
  // }, 3000);
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = fetchAllAirdrops();
      setAllAirdrops(data);
      setUserAirdrops(data); // Assuming user airdrops are the same for this example
    } catch (error) {
      console.error("Error fetching airdrops:", error);
    } finally {
      setLoading(false);
    }
  };

  const setFocusRoute = (route: string) => {
    setIsFocused(route);
  };

  const renderContent = () => {
    if (loading) {
      return <AllAirDropSkeletion />;
    }

    if (isFocused === "All Airdrops") {
      return (
        <ScrollView>
          <View className="px-4">
            {allAirdrops.map((airdrop, i) => (
              <AirdropCardUnClaimed
                key={`${airdrop.name}-${i}`}
                airdropData={airdrop}
                onDetailsPress={() =>
                  router.navigate(
                    `/screens/Airdrop/${airdrop.id}?claimed=false`
                  )
                }
              />
            ))}
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView>
        <View className="px-4">
          {userAirdrops.map((airdrop, i) => (
            <AirdropCardClaimed
              key={`${airdrop.name}-${i}`}
              airdropData={airdrop}
              onDetailsPress={() =>
                router.navigate(`/screens/Airdrop/${airdrop.id}?claimed=true`)
              }
            />
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <CustomHeaderSwitch routes={routes} onFocusRoute={setFocusRoute} />
      {renderContent()}
    </View>
  );
};

export default AirDrops;
