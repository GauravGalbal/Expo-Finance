import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ActivityIndicator,
  Modal,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure this import
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { selectUser } from '@/redux/slices/userSelector';
import { icons, images } from '@/constants';
import { createEvmWallet, createSolanaWallet } from '@/utils/wallet/createWallet';
import { useWeb3Modal } from '@web3modal/ethers5-react-native';
import * as Clipboard from 'expo-clipboard';
import AlertModal from '@/components/AlertModal/AlertModal';

const Step3 = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [walletInfo, setWalletInfo] = useState({ evmAddress: '', solanaPublicKey: '', evmPrivateKey: '', solanaPrivateKey: '' });
  const user = useSelector(selectUser);
  const { open } = useWeb3Modal();

  // Function to handle creating both EVM and Solana wallets
  const handleCreateWallets = async () => {
    setLoading(true);
    try {
      const evmWallet = await createEvmWallet();
      const solanaWallet = await createSolanaWallet();

      console.log('EVM Wallet Address:', evmWallet.address);
      console.log('EVM Wallet Private Key:', evmWallet.privateKey);
      console.log('Solana Public Key:', solanaWallet.publicKey);
      console.log('Solana Secret Key:', solanaWallet.secretKey);

      setWalletInfo({
        evmAddress: evmWallet.address,
        solanaPublicKey: solanaWallet.publicKey,
        evmPrivateKey: evmWallet.privateKey,
        solanaPrivateKey: solanaWallet.secretKey.toString(), // Convert to string if it's a Uint8Array
      });
      setModalVisible(true);

      // Navigate to another screen after wallet creation if needed
      // router.push('/screens/AfterSteps/walletCreated');

    } catch (error) {
      console.error('Error creating wallets:', error);
      Alert.alert('Error', 'Failed to create wallets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    Clipboard.setStringAsync(text);
    Alert.alert('Copied', 'Private key copied to clipboard');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#F7F9FC', paddingHorizontal: 20, paddingTop: 40, justifyContent: 'space-between', paddingBottom: 20 }}>
        <Stack.Screen options={{ headerShown: false }} />
        <StatusBar barStyle="dark-content" />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 12 }}>
          <Link href="/screens/AfterSteps/walletCreated" style={{ color: '#375CF0', fontFamily: 'Poppins-SemiBold', fontSize: 16 }}>
            SKIP
          </Link>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          <Image source={icons.askKorraCircle} style={{ width: 40, height: 40, marginRight: 16 }} resizeMode="contain" />
          <Text style={{ fontSize: 24, fontFamily: 'Poppins-SemiBold', color: '#000', width: '90%' }}>
            Finally, let’s set up your crypto wallet.
          </Text>
        </View>
        <View style={{ width: '100%', padding: 16, backgroundColor: '#E9EFF9', borderRadius: 8, overflow: 'hidden' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#375CF0', fontFamily: 'Poppins-SemiBold' }}>
              What to do with crypto wallet?
            </Text>
            <TouchableOpacity onPress={() => setShow(!show)}>
              <Ionicons name="chevron-down" size={18} />
            </TouchableOpacity>
          </View>
          {show && (
            <Text style={{ fontSize: 11, fontFamily: 'Poppins-Regular' }}>
              Crypto Wallet acts like a bank to store, deposit and withdraw your cryptocurrency.
            </Text>
          )}
        </View>
        <Image source={images.wallet} style={{ marginVertical: 64, width: 300, height: 300 }} resizeMode="contain" />
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={handleCreateWallets}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#6C63FF', paddingVertical: 20, borderRadius: 8, width: '100%' }}
          >
            <Ionicons name="wallet-outline" size={20} color="white" />
            <Text style={{ color: '#FFF', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 16, textTransform: 'uppercase', textAlign: 'center' }}>
              Create Wallet with Korra
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => open()}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF', borderColor: '#E0E0E0', borderWidth: 2, marginTop: 8, paddingVertical: 20, borderRadius: 8, width: '100%' }}
          >
            <Ionicons name="link-outline" size={20} color="black" />
            <Text style={{ color: '#000', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 16, textTransform: 'uppercase', textAlign: 'center' }}>
              Connect Existing Wallet
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ color: '#808080', fontFamily: 'Poppins-SemiBold' }}>Step 3/3</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <View style={{ width: 16, height: 4, backgroundColor: '#6C63FF', borderRadius: 2, marginRight: 4 }}></View>
              <View style={{ width: 16, height: 4, backgroundColor: '#6C63FF', borderRadius: 2, marginRight: 4 }}></View>
              <View style={{ width: 16, height: 4, backgroundColor: '#6C63FF', borderRadius: 2, marginRight: 4 }}></View>
            </View>
          </View>
        </View>
        {loading && (
          <Modal transparent={true} animationType="slide" visible={loading}>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: '#FFF', borderRadius: 24, paddingHorizontal: 20, paddingVertical: 40, justifyContent: 'space-between', width: '100%' }}>
                <View>
                  <Text style={{ textAlign: 'left', fontSize: 24, fontFamily: 'Poppins-Bold', marginBottom: 16 }}>
                    Creating Wallet
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <ActivityIndicator style={{ width: 96, height: 96 }} size="large" color="#4B0082" />
                  <Text style={{ marginTop: 20, fontSize: 18, fontFamily: 'Poppins-Bold', color: '#808080' }}>
                    Wallet is being created...
                  </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={handleCancel} style={{ marginTop: 20 }}>
                    <Text style={{ textAlign: 'center', color: '#FF0000', fontFamily: 'Poppins-SemiBold', textDecorationLine: 'underline', textTransform: 'uppercase' }}>
                      Cancel, I changed my mind
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
        {modalVisible && (
          <AlertModal
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
            Title="Wallet Created"
            closeIcon="closecircle"
            Message={`EVM Address: ${walletInfo.evmAddress}\nSolana Public Key: ${walletInfo.solanaPublicKey}`}
            PrivateKeyEVM={walletInfo.evmPrivateKey}
            PrivateKeySolana={walletInfo.solanaPrivateKey}
            OkBtnText="OK"
            onOkPress={() => setModalVisible(false)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Step3;
