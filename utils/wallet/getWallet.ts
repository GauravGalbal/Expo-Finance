import * as SecureStore from 'expo-secure-store';

// Function to retrieve the EVM wallet details
export const getEvmWallet = async () => {
  try {
    console.log('Retrieving EVM wallet address...');
    const address = await SecureStore.getItemAsync('evmWalletAddress');
    console.log('EVM wallet address retrieved:', address);

    console.log('Retrieving EVM wallet private key...');
    const privateKey = await SecureStore.getItemAsync('evmWalletPrivateKey');
    console.log('EVM wallet private key retrieved:', privateKey);

    return { address, privateKey };
  } catch (error) {
    console.error('Error retrieving EVM wallet details:', error);
    return { address: null, privateKey: null };
  }
};

// Function to retrieve the Solana wallet details
export const getSolanaWallet = async () => {
  try {
    console.log('Retrieving Solana wallet address...');
    const address = await SecureStore.getItemAsync('solanaWalletAddress');
    console.log('Solana wallet address retrieved:', address);

    console.log('Retrieving Solana wallet secret key...');
    const secretKey = await SecureStore.getItemAsync('solanaWalletSecretKey');
    console.log('Solana wallet secret key retrieved:', secretKey);

    return { address, secretKey };
  } catch (error) {
    console.error('Error retrieving Solana wallet details:', error);
    return { address: null, secretKey: null };
  }
};
