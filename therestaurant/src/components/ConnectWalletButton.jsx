import { initializeBlockchain } from '../services/blockchainService.js';

function ConnectWalletButton() {
  const connectWallet = async () => {
    try {
      await initializeBlockchain();
      alert('Wallet connected!');
    } catch (error) {
      alert('Failed to connect wallet');
      console.error(error);
    }
  };

  return (
    <button onClick={connectWallet}>
      Connect Wallet
    </button>
  );
}

export default ConnectWalletButton;