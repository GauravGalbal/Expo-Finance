import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

interface ModalWrapperProp {
  children: React.ReactNode;
  contentWrapperStyles?: string;
  isVisible: boolean;
  showCloseButton?: boolean;
  modalTitle?: string;
  onCancel: () => void;
}
const ModalWrapper = ({
  children,
  contentWrapperStyles,
  isVisible,
  showCloseButton,
  modalTitle,
  onCancel,
}: ModalWrapperProp) => {
  const handleOnCancel = () => {
    onCancel();
  };
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <TouchableWithoutFeedback className="flex-1" onPress={handleOnCancel}>
        <View className="relative flex-1 bg-black/50 blur-3xl justify-end pt-9">
          <View
            className={`flex-1 h-auto bottom-0 bg-white rounded-t-2xl pt-3 ${contentWrapperStyles}`}
          >
            <View className="w-[53px] h-[2px] bg-black self-center rounded-full mb-2" />
            <View className=" px-4">
              {modalTitle && (
                <Text className="text-lg font-psemibold text-center">
                  {modalTitle}
                </Text>
              )}
            </View>
            {showCloseButton && (
              <TouchableOpacity
                onPress={handleOnCancel}
                className="absolute right-5 top-5"
              >
                <Icon name="close" size={24} />
              </TouchableOpacity>
            )}

            <View className="flex-1">{children}</View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalWrapper;
