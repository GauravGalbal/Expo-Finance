import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface CustomDropdownProps {
  options: any;
  defaultOption: any;
  labelText?: boolean;
  conatinerStyles?: string;
  dropdownContainerStyles?: string;
  top?: boolean;
  handleValueChange?: (value: any) => void;
}

const CustomDropdown = ({
  options,
  defaultOption,
  labelText,
  conatinerStyles,
  top,
  handleValueChange,
  dropdownContainerStyles,
}: CustomDropdownProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownOption, setDropdownOption] = useState(defaultOption);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownButtonRef = useRef<TouchableOpacity>(null);

  const openDropdown = () => {
    if (dropdownButtonRef.current) {
      dropdownButtonRef.current.measure((fx, fy, width, height, px, py) => {
        // console.log(width, height, py, px, fy, fx);
        setDropdownPosition(
          top
            ? {
                top: py - (height * 2 + height / 3.5),
                left: px - width / 1.5 + 55,
              }
            : { top: py + 10, left: px - width / 1.5 }
        );
        setModalVisible(true);
      });
    }
  };

  const handleSelect = (option: string) => {
    handleValueChange?.(option);
    setDropdownOption(option);
    setModalVisible(false);
  };
  return (
    <View>
      <TouchableOpacity
        className={`px-[10px] py-[9px] border border-[#DBE1EB] rounded-md ${conatinerStyles}`}
        onPress={openDropdown}
        ref={dropdownButtonRef}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-[11px] text-center font-pmedium text-secondary-color mr-[6px]">
            {typeof dropdownOption === "string"
              ? dropdownOption
              : dropdownOption.name}
          </Text>
          <Icon name="chevron-down" size={12} color={"#5C626A"} />
        </View>
        {labelText && (
          <Text className="font-pmedium text-base ">
            {typeof dropdownOption === "string"
              ? dropdownOption
              : dropdownOption.price}
          </Text>
        )}
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          className="flex flex-1"
        >
          <View
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
            }}
            className={`p-2 pt-4 border max-w-[150px] border-[#DBE1EB] rounded-md bg-slate-50 ${dropdownContainerStyles}`}
          >
            <ScrollView>
              {options.map((option: any, i: number) => (
                <TouchableOpacity
                  className="mb-1"
                  onPress={() => handleSelect(option)}
                  key={`${option}${i}`}
                >
                  <View
                    className={`${
                      option === dropdownOption
                        ? "bg-secondary-color/20 rounded-sm"
                        : ""
                    }`}
                  >
                    <Text className="font-pregular text-[12px] text-secondary-color text-center">
                      {typeof option !== "string" ? option.name : option}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomDropdown;
