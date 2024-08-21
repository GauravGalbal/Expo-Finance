import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CustomDropdown from "./CustomDropdown";
import Icon from "react-native-vector-icons/Ionicons";
interface MyComponentProps {
  onOptionChange?: (option: string) => void;
  onChartChange?: (option: string) => void;
}

interface MyComponentState {
  timeFrame: string;
  chartType: "Candlestick" | "Line";
  showChartOptions: boolean;
}

const timeFrames = ["1H", "4H", "24H", "1W", "1M", "1Y"];
const timeFramesDropdown = ["1H", "4H", "24H", "1W", "1M", "1Y"];

class TimeFrame extends Component<MyComponentProps, MyComponentState> {
  constructor(props: MyComponentProps) {
    super(props);
    this.state = {
      timeFrame: "1H",
      chartType: "Candlestick",
      showChartOptions: false,
    };
  }

  handleSelect = (option: string) => {
    this.setState({ timeFrame: option }, () => {
      this.props.onOptionChange?.(this.state.timeFrame);
      console.log("TimeFrame changed", this.state);
    });
  };

  handleChartSelect = (option: "Candlestick" | "Line") => {
    this.setState({ chartType: option }, () => {
      this.props.onChartChange?.(this.state.chartType);
      console.log("chart changed", this.state);
    });
  };

  render() {
    return (
      <View className="flex-row px-4 justify-between w-full">
        {timeFrames.map((time, i) => (
          <TouchableOpacity
            key={`${time}-${i}`}
            className={`px-[9px] py-[7px] min-w-[33px] ${
              this.state.timeFrame === time
                ? "bg-primary-purple/10 rounded-md"
                : ""
            }`}
            onPress={() => this.handleSelect(time)}
          >
            <Text
              className={`font-pmedium text-[12px] text-center  ${
                this.state.timeFrame === time
                  ? "text-primary-purple"
                  : "text-text-tertiary"
              }`}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
        <CustomDropdown
          options={timeFramesDropdown}
          defaultOption={"All"}
          handleValueChange={this.handleSelect}
          conatinerStyles="bg-[#F0F6FF]"
          dropdownContainerStyles="w-[90px]"
        />
        <View className=" justify-center relative">
          <TouchableOpacity
            onPress={() => {
              this.setState({ showChartOptions: !this.state.showChartOptions });
            }}
            className="flex-row border-[0.5px] border-[#DBE1EB] px-[9px] py-[8px] bg-[#F0F6FF] justify-center items-center rounded-md flex-1"
          >
            <Icon name="stats-chart-sharp" color={"#5C626A"} size={16} />
            <Icon name="chevron-down" color={"#5C626A"} size={14} />
          </TouchableOpacity>

          {this.state.showChartOptions && (
            <View className="border-[0.5px] border-[#DBE1EB]  py-3 absolute right-0 bottom-10 z-50 bg-white w-[100px] rounded-md">
              <TouchableOpacity
                className={`mb-1 px-3 py-1 ${
                  this.state.chartType === "Candlestick"
                    ? "bg-primary-purple/10"
                    : ""
                }`}
                onPress={() => {
                  this.handleChartSelect("Candlestick");
                  this.setState({ showChartOptions: false });
                }}
              >
                <Text className="text-[11px] font-pregular">Candlestick</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.handleChartSelect("Line");
                  this.setState({ showChartOptions: false });
                }}
                className={`px-3 py-1 ${
                  this.state.chartType === "Line" ? "bg-primary-purple/10" : ""
                }`}
              >
                <Text className="text-[11px] font-pregular">Line</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default TimeFrame;
