import * as SecureStore from 'expo-secure-store';

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

// Function to send sniping request to backend
export const sendSnipeRequest = async (slippage: number, tokenAddress: string, amount: number) => {
  const { secretKey } = await getSolanaWallet();
  
  if (!secretKey) {
    throw new Error('Solana wallet secret key is not available');
  }

  const response = await fetch('http://192.168.0.51:3000/snipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      slippage,
      tokenAddress,
      amount,
      secretKey,
    }),
  });

  const data = await response.json();
  return data;
};
