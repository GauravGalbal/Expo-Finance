import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Utility function to create an EVM wallet
export const createEvmWallet = async () => {
  const response = await axios.post('http://192.168.0.51:3000/create-evm-wallet');
  const { address, privateKey } = response.data;

  // Save the EVM wallet details to the secure store
  await SecureStore.setItemAsync('evmWalletAddress', address);
  await SecureStore.setItemAsync('evmWalletPrivateKey', privateKey);

  return { address, privateKey };
};

// Utility function to create a Solana wallet
export const createSolanaWallet = async () => {
  const response = await axios.get('http://192.168.0.51:3000/create-solana-wallet');
  const { publicKey, secretKey } = response.data;

  // Save the Solana wallet details to the secure store
  await SecureStore.setItemAsync('solanaWalletAddress', publicKey);
  await SecureStore.setItemAsync('solanaWalletSecretKey', secretKey);

  return { publicKey, secretKey };
};
