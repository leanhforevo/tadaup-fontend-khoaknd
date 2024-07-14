import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Avatar, Typography, Button, Input } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import { sendUSDT, fetchUSDTBalance, getUSDTContract } from '../utils/walletActions';
import { ethers } from 'ethers';
import { useAccount, useWalletClient, useSendTransaction, } from 'wagmi';

export function Campaign({ wagmiClient }) {
  const { id } = useParams();
  const { address, isConnected, connector } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [value, setValue] = useState("");
  const [balance, setBalance] = useState(0);
  const [campainDetail, setcampainDetail] = useState([]);



  // const provider = useProvider();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  useEffect(() => {
    if (isConnected && walletClient) {
      loadBalance()
    }

  }, [isConnected, walletClient])

  useEffect(() => {
    const fetchcampainDetail = async () => {
      try {
        const response = await fetch(`https://tadaup.com/public/api/homecampainfx/campainDetail/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API response data:', data);  // Log the response data
        setcampainDetail(data);
      } catch (error) {
        console.error('Failed to fetch campainDetail:', error);  // Log any errors
        //setError(error.message);
      } finally {
        //setLoading(false);
      }
    };
    fetchcampainDetail();
  }, []);

  const loadBalance = async () => {
    // if(!isConnected) return false;

    // const dataBalance = await fetchUSDTBalance().catch((e) => {
    //   console.log("error:" + e)
    //   return 0
    // })
    try {
      const getConnectProvider = await connector.getProvider();
      const provider = new ethers.providers.Web3Provider(getConnectProvider);
      const usdtContract = getUSDTContract(provider);
      const balance = await usdtContract.balanceOf(address);
      setBalance(ethers.utils.formatUnits(balance, 18));
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
    // setBalance(dataBalance || 0)
  }
  const handleChange = (e) => {
    const rawValue = e.target.value;
    const cleanedValue = rawValue.replace(/[^0-9.]/g, '');
    const formattedValue = cleanedValue.replace(/(\.\d{2})\d+/, '$1');
    setValue(formattedValue);
  };


  const _evtSendUSDT = () => {
    // sendUSDT(value, "0x1C068dFf6a6a3e42227f35BB907Bac32E3303Ce4")
    sendUsdt2()
  }
  const {
    data: hash,
    isPending,
    sendTransaction
  } = useSendTransaction();

  const sendUsdt2 = async () => {
    try {
      // const formData = new FormData(e.target as HTMLFormElement)
      const usdtContractAddress = '0x55d398326f99059fF775485246999027B3197955'; // Replace with actual USDT contract address on Binance Smart Chain (BEP-20)
      const usdtDecimals = 18;

      const recipient = campainDetail.ewalletAddress
      const amount = value
      const amountToSend = parseFloat(amount) * Math.pow(10, usdtDecimals);
      const transactionObject = {
        to: usdtContractAddress,
        data: `0xa9059cbb000000000000000000000000${recipient.toLowerCase().replace('0x', '')}${Math.floor(amountToSend).toString(16).padStart(64, '0')}`,
        value: '0x0',
      };
      sendTransaction(transactionObject)
    } catch (error) {
      console.error("Failed to send USDT", error);
    }
  };
  return (
    <>

      <div className="relative flex h-[50vh] content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-4.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                {campainDetail.campainName}
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                {campainDetail.campainDescription || ''}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <section className="relative bg-white py-16">
        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between">

              {/* <div className="mt-4 container space-y-2"> */}
              <div className="mt-12 mb-12 flex lg:flex-col justify-between lg:justify-end lg:mb-0 lg:px-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                  <Typography className="font-medium text-blue-gray-500">
                    Campaign Expected Amount: {campainDetail.campain_amount || 'N/A'}
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                  <Typography className="font-medium text-blue-gray-500">
                    Duration: {campainDetail.fromDate || 'N/A'} - {campainDetail.toDate || 'N/A'}
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                  <Typography className="font-medium text-blue-gray-500">
                    Wallet Campaign: {campainDetail.ewalletAddress || 'N/A'}
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                  <Typography className="font-medium text-blue-gray-500">
                    Chain {campainDetail.network || 'N/A'} - {campainDetail.currency || 'N/A'} - {campainDetail.status || 'N/A'}
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500" />
                  <Typography className="font-medium text-blue-gray-500">
                    Profit Info: {campainDetail.profitAmount || 'N/A'} - {campainDetail.profirPercent || 'N/A'} - {campainDetail.profitAmtLast || 'N/A'}
                  </Typography>
                </div>
              </div>

              <div className="mt-12 mb-12 flex lg:flex-col justify-between lg:justify-end lg:mb-0 lg:px-6 flex-wrap">
                <div className="mx-auto mt-10 mb-8  ">
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Your Balance: {parseFloat(balance || 0).toFixed(2)} USDT
                    </Typography>
                    <Input
                      size="lg"
                      type="text"
                      label="Input Amount (USDT)"
                      value={value}
                      onChange={handleChange}
                      className="outline-none focus:shadow-outline"
                      containerProps={{
                        className: "mb-4",
                      }}

                    />

                  </div>

                  <Button className="" fullWidth onClick={_evtSendUSDT}>Invest Now</Button>
                </div>

                <div className="flex  justify-between">
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      500$
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Total
                    </Typography>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      10
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      People
                    </Typography>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase"
                    >
                      123.00$
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      Your Invest
                    </Typography>
                  </div>
                </div>

              </div>
            </div>

            <div className="mb-10 py-12">
              <div className="flex w-full flex-col items-start pt-4">
                <p dangerouslySetInnerHTML={{ __html: campainDetail.content }}>
                </p>
              </div>
            </div>
          </div>


        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>

    </>
  );
}

export default Campaign;
