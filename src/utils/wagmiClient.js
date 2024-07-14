import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

// import { WagmiProvider } from 'wagmi';
import { QueryClient } from '@tanstack/react-query';
import { arbitrum,bsc, mainnet } from 'wagmi/chains';

// 0. Setup queryClient
const queryClient = new QueryClient();
// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '2c94dbc1fd1e3249ba9ebbf7438854f6'
// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://iicoteck.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};
const chains = [
  // mainnet, 
  // arbitrum,
  bsc
];
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  //...wagmiOptions, // Optional - Override createConfig parameters
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});
export { config, queryClient };

