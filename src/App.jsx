import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";


import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet, bsc } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CampainDetail from './pages/campaign';
import CampaignListNew from './pages/campaignListNew'; // Ensure the correct import for your components
import CampaignListRun from './pages/campaignListRun';
import CampaignListDone from './pages/campaignListDone';

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = '2c94dbc1fd1e3249ba9ebbf7438854f6'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [
  // mainnet, arbitrum,
  bsc
]
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

function App() {
  const { pathname } = useLocation();


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>


          {!(pathname == '/sign-in' || pathname == '/sign-up') && (
            <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
              <Navbar routes={routes} />
            </div>
          )
          }
          <Routes>
            {routes.map(
              ({ path, element }, key) =>
                element && <Route key={key} exact path={path} element={element} />
            )}
            <Route path="*" element={<Navigate to="/home" replace />} />
            <Route path="/campaign/:id" element={<CampainDetail />} />
            <Route path="/campaignListNew" element={<CampaignListNew />} />
            <Route path="/campaignListRun" element={<CampaignListRun />} />
            <Route path="/campaignListDone" element={<CampaignListDone />} />Î
          </Routes>

        </WagmiProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
