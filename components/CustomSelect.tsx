import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface CustomSelectProps {
  isVisible: boolean;
  onConfirm: (data: any) => void;
  onCancel: () => void;
  mode: string;
  list: any;
  selected: string | undefined;
  overlayStyles?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  list,
  mode,
  selected,
  overlayStyles,
}) => {
  const [date, setDate] = useState(new Date());
  // const [selectedYear, setSelectedYear] = useState<number | null>(null);
  // const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  // const [selectedDay, setSelectedDay] = useState<number | null>(null);
  // const [mode, setMode] = useState<"year" | "month" | "day">("year");
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState(list);

  // const handleYearSelect = (year: number) => {
  //   setSelectedYear(year);
  //   setSelectedMonth(null);
  //   setSelectedDay(null);
  //   setDate(new Date(year, date.getMonth(), date.getDate()));
  //   setMode("month");
  // };

  // const handleMonthSelect = (month: number) => {
  //   setSelectedMonth(month);
  //   setSelectedDay(null);
  //   setDate(new Date(date.getFullYear(), month, date.getDate()));
  //   setMode("day");
  // };

  // const handleDaySelect = (day: number) => {
  //   setSelectedDay(day);
  //   const updatedDate = new Date(date.getFullYear(), date.getMonth(), day);
  //   setDate(updatedDate);
  //   onConfirm(updatedDate); // Pass the updated date to onConfirm
  // };

  const onfilterList = (search: string) => {
    const filteredListArray = list.filter(
      (item: { name: String; code: string }) =>
        item.name.includes(search) || item.code.includes(search)
    );

    setFilteredList(filteredListArray);
  };

  const handleModalDismiss = () => {
    onCancel();
  };

  // useEffect(() => {
  //   setFilteredList(list);
  // }, [isVisible]);

  // const generateList = (type: "year" | "month" | "day") => {
  //   let items: number[] = [];
  //   const currentYear = new Date().getFullYear();

  //   if (type === "year") {
  //     for (let i = currentYear - 50; i <= currentYear; i++) {
  //       items.push(i);
  //     }
  //   } else if (type === "month") {
  //     for (let i = 0; i < 12; i++) {
  //       items.push(i);
  //     }
  //   } else if (type === "day") {
  //     const daysInMonth = new Date(
  //       date.getFullYear(),
  //       date.getMonth() + 1,
  //       0
  //     ).getDate();
  //     for (let i = 1; i <= daysInMonth; i++) {
  //       items.push(i);
  //     }
  //   }
  //   return items;
  // };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={handleModalDismiss}>
        <View style={styles.overlay} className={overlayStyles}>
          {mode === "age" && (
            <TouchableWithoutFeedback onPress={() => {}}>
              <View className="bg-white max-w-[90%] w-full p-2 rounded-xl">
                <ScrollView showsVerticalScrollIndicator={false}>
                  {list.map((item: any) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => onConfirm(item)}
                      className={`p-4 mb-1 rounded-lg ${
                        selected === item ? "bg-[#DBE1EB]" : "bg-[#F0F6FF]"
                      }`}
                    >
                      <Text className="text-base text-left font-psemibold">
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          )}
          {mode === "country" && (
            <TouchableWithoutFeedback>
              <View className="bg-white max-w-full w-full p-2 rounded-t-3xl max-h-[60%]">
                <Text className="text-xl font-psemibold p-4">
                  Select Country
                </Text>
                <View className="flex-row items-center border border-input-border p-4 rounded-full bg-[#F4FBFF] mb-3">
                  <TextInput
                    placeholder="E.g. Egypt"
                    className="flex-1 font-pregular"
                    onChangeText={(e) => {
                      setSearch(e);
                      onfilterList(e);
                    }}
                    value={search}
                  />
                  <Icon name="search" size={24} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {filteredList.map((item: any) => (
                    <TouchableOpacity
                      key={item.code}
                      onPress={() => {
                        onConfirm(item);
                        setFilteredList(list);
                      }}
                      className={`p-4 mb-1 rounded-lg ${
                        selected === item.code ? "bg-[#F8F5FF]" : ""
                      }`}
                    >
                      <Text
                        className={`text-base text-left font-psemibold ${
                          selected === item.code
                            ? "text-[#4B17DD]"
                            : "text-[#5C626A]"
                        }`}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(128, 128, 128, 0.7)",
    // justifyContent: "center",
    // alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    maxHeight: 400,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "center",
  },
  itemContainer: {
    paddingVertical: 10,
    alignItems: "center",
  },
  itemText: {
    fontSize: 20,
    color: "#E1F7F5",
  },
  selectedItem: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default CustomSelect;
