import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, SafeAreaView, Dimensions, StyleSheet, Alert } from 'react-native';
import { AlertModalProps } from '@/types/AlertModal';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const { width } = Dimensions.get('window');

class AlertModal extends Component<AlertModalProps> {
  copyToClipboard = (text: string) => {
    Clipboard.setStringAsync(text);
    Alert.alert('Copied', 'Private key copied to clipboard');
  };

  formatString = (text: string) => {
    return `${text.slice(0, 3)}...${text.slice(-3)}`;
  };

  render() {
    const {
      isVisible,
      onClose,
      Title,
      closeIcon,
      Message,
      OkBtnText,
      CancelBtnText,
      onCancelPress,
      onOkPress,
      PrivateKeyEVM,
      PrivateKeySolana,
    } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={onClose}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.modalView}>
            <AntDesign
              onPress={onClose}
              style={styles.closeIcon}
              color="white"
              name={closeIcon as keyof typeof AntDesign.glyphMap}
              size={30}
            />
            <Text numberOfLines={1} style={styles.title}>
              {Title}
            </Text>
            <Text style={styles.message}>
              {Message.split('\n').map((line, index) => (
                <Text key={index} style={styles.messageLine}>
                  {this.formatString(line)}{'\n'}
                </Text>
              ))}
            </Text>
            <View style={styles.privateKeyContainer}>
              <Text style={styles.privateKeyText}>EVM Private Key: {this.formatString(PrivateKeyEVM)}</Text>
              <TouchableOpacity onPress={() => this.copyToClipboard(PrivateKeyEVM)}>
                <Ionicons name="copy-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.privateKeyContainer}>
              <Text style={styles.privateKeyText}>Solana Private Key: {this.formatString(PrivateKeySolana)}</Text>
              <TouchableOpacity onPress={() => this.copyToClipboard(PrivateKeySolana)}>
                <Ionicons name="copy-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              {CancelBtnText && (
                <TouchableOpacity style={styles.cancelButton} onPress={onCancelPress}>
                  <Text style={styles.buttonText}>{CancelBtnText}</Text>
                </TouchableOpacity>
              )}
              {OkBtnText && (
                <TouchableOpacity style={styles.okButton} onPress={onOkPress}>
                  <Text style={styles.buttonText}>{OkBtnText}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#2d2d2d',
    borderRadius: 10,
    width: width * 0.85,
    padding: 20,
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
    marginTop: 10,
    marginBottom: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 20,
  },
  messageLine: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  privateKeyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  privateKeyText: {
    fontSize: 14,
    color: 'white',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 8,
    marginLeft: 10,
    width: width * 0.35,
    alignItems: 'center',
  },
  okButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#0E61DE',
    borderRadius: 8,
    marginLeft: 10,
    width: width * 0.35,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AlertModal;
