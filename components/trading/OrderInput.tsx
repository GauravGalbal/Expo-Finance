import { TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface OrderInputProps {
  placeholder: string;
  value: number | string;
  setValue: (e: string | number) => void;
  containerStyles?: string;
}

const OrderInput = ({
  placeholder,
  value,
  setValue,
  containerStyles,
}: OrderInputProps) => {
  const handleValueDecrease = () => {
    if (value) {
      setValue(Number(value) - 1);
    }
  };

  const handleValueIncrease = () => {
    if (value) {
      setValue(Number(value) + 1);
    }
  };
  return (
    <View
      className={`flex-row border p-2 border-[#DBE1EB] rounded-md ${containerStyles}`}
    >
      <TouchableOpacity
        className="p-2 border-r-[1px] border-r-[#DBE1EB]"
        onPress={handleValueDecrease}
      >
        <Icon name="remove-outline" size={24} color={"#5C626A"} />
      </TouchableOpacity>
      <View className="flex-1 justify-center items-center">
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#5C626A"}
          className=" px-2 text-left font-pregular text-secondary-color min-w-[50%]"
          keyboardType="numeric"
          value={value ? String(value) : ""}
          onChangeText={(e) => setValue(e)}
        />
      </View>
      <TouchableOpacity
        className="p-2 border-l-[1px] border-l-[#DBE1EB]"
        onPress={handleValueIncrease}
      >
        <Icon name="add-outline" size={24} color={"#5C626A"} />
      </TouchableOpacity>
    </View>
  );
};

export default OrderInput;
