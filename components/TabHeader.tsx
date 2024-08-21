import { icons, images } from "@/constants";
import { Link, router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const TabHeader = ({
  screen,
  navigation,
}: {
  screen: string;
  navigation: any;
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const menuRef = useRef<FlatList | null>(null);
  const options = ["Profile", "Option 2", "Option 3"];

  const handleMenuSelect = (item: string) => {
    setSelectedOption(item);
    hideMenu();
    if (item === "Profile") {
      router.push("screens/Profile/profile");
    }
  };

  const showMenu = () => {
    setMenuVisible(true);
  };

  const hideMenu = () => {
    setMenuVisible(false);
  };
  return (
    <View className="relative flex flex-row justify-between items-center p-4 border-b-[0.5px] border-b-[#DBE1EB] bg-[#FFFFFF]">
      <View className="w-10 h-10 rounded-full">
        <Image
          source={images.profileImage}
          className="w-full h-full rounded-full"
          resizeMode="contain"
        />
      </View>
      <View className="flex-row items-center">
        {screen === "Airdrops" && (
          <View className="mr-2">
            <TouchableOpacity
              className="flex-row items-center justify-center  pl-3 pr-2 h-[40px]  bg-[#F4FBFF] rounded-full border-[0.5px] border-[#DBE1EB]"
              onPress={() => navigation.navigate("Ask Korra")}
            >
              {/* <Link href={"/explore"}> */}
              <View className="mr-2">
                <Text className="text-center font-psemibold text-[12px]">
                  Ask Korra
                </Text>
              </View>
              <View className=" items-center justify-center">
                <Image
                  source={icons.askKorraCircle}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </View>
              {/* </Link> */}
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          onPress={showMenu}
          className="bg-white p-2 rounded-full border border-gray-200 w-10 h-10 items-center justify-center"
        >
          <Icon name="ellipsis-vertical" size={20} />
        </TouchableOpacity>
        <Modal visible={menuVisible} transparent={true} animationType="fade">
          <TouchableOpacity
            className="flex-1 justify-start items-end  px-4"
            onPress={hideMenu}
          >
            <View className="bg-white border border-[#DBE1EB] rounded-md absolute top-16 right-3 min-w-[150px] shadow-lg">
              <FlatList
                ref={menuRef}
                data={options}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleMenuSelect(item)}>
                    <Text className="p-3 mt-1 text-center font-psemibold text-sm rounded-xl text-gray-900">
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
};

export default TabHeader;
