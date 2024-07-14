import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
var provider = null
const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';
const getProvider = async () => {
  const providerOptions = {};
  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
  });
  try {
    const connectProvider = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(connectProvider);
    console.log("dataProvider:", provider)
    return provider;
  } catch (error) {

  }
}
const sendUSDT = async (amount, recipient) => {
  // provider = new ethers.providers.Web3Provider(window.ethereum);
  //  provider = new ethers.providers.Web3Provider(connector.ethereum);
   await getProvider()
  if (provider) {
    try {

      const ERC20_ABI = [
        'function balanceOf(address owner) view returns (uint256)',
        'function transfer(address to, uint256 value) returns (bool)',
      ];
      const signer = provider.getSigner();
      const usdtContract = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, signer);
      const tx = await usdtContract.transfer(recipient, ethers.utils.parseUnits(amount, 18)); // USDT uses 6 decimal places
      // settransactionHash(tx.hash);
      // console.log('Transaction sent:', tx);
      return tx.hash
    } catch (error) {
      console.error('Failed to send USDT:', error);
    }
  } else {
    console.log("Provider not found")
  }
};
const fetchUSDTBalance = async (account = '0xbc5A2cF010db44cBD42aE6c1eaC6337969A4FEE5') => {
  await getProvider()
  // provider = new ethers.providers.Web3Provider(window.ethereum);
  if (provider) {
    try {
      const ERC20_ABI = ['function balanceOf(address owner) view returns (uint256)'];
      const signer = provider.getSigner();
      const walletContract = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, signer);
      const amountBalance = await walletContract.balanceOf(account);
      return ethers.utils.formatUnits(amountBalance, 18)
    } catch (error) {
      console.error('Failed to fetch USDT balance:', error);
    }
  }
};

const USDT_ABI = [
  // Simplified ABI, add more methods as needed
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint amount) returns (bool)"
];

const getUSDTContract = (provider) => {
  return new ethers.Contract(USDT_ADDRESS, USDT_ABI, provider);
};
export { sendUSDT, fetchUSDTBalance ,getUSDTContract};

