import React from "react";
import { View } from "react-native";

interface GradientBarProps {
  className?: string;
}

const GradientBar: React.FC<GradientBarProps> = ({ className = "" }) => {
  return (
    <View
      className={`shrink-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.12)_12.9%,rgba(28,28,28,0.12)_51.4%,rgba(102,102,102,0.07)_100%)] h-[68px] rounded-[100px] ${className}`}
    />
  );
};

export default GradientBar;
