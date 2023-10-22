
import React, { useState, useCallback, useEffect,useContext } from "react";

import Image from 'next/image';  
import Link from 'next/link';
import { useRouter } from 'next/router'; 

import { Web3ModalContext } from "../app/contexts/Web3ModalProvider";
import { BlockchainContext } from "../app/contexts/BlockchainProvider";



const imageUrls = [
  'https://gateway.pinata.cloud/ipfs/QmUndB5xnuoX7BXEaydXvJnM23jKPPdWdiBjUba9W9jr8U',
  'https://gateway.pinata.cloud/ipfs/QmX7UmuXDLZJ1S51ip4LDMdqVue7zoZKfKzuLmGzGGQHEZ',
  'https://gateway.pinata.cloud/ipfs/Qmaw3R18YohXs1wMW61vYEsXdDnqvN2a2mH5Uph8p2bCie',
  'https://gateway.pinata.cloud/ipfs/Qmc3csLR4S6v5KAPFioTGtoZNk31kmAoGkQswq5WSmg5AT',
  'https://gateway.pinata.cloud/ipfs/QmU8bFTSUX89D6vEfqsMvmSqZB3rrvK3dF6C6waPLqP28r',
  'https://gateway.pinata.cloud/ipfs/QmNec94dUYbCss3AkRT2jmbcaQaeFLtasVpimzrzokgUTo',
  'https://gateway.pinata.cloud/ipfs/Qmf9yuWehjaeQfPK1UPvqm9kpyKzFb9qJbTfhY7jpaRGoB',
  'https://gateway.pinata.cloud/ipfs/QmVFR51CEgv2ARXJht4MyprKYmFnnn1m2Ebx4JcM6ixuxR',
  'https://gateway.pinata.cloud/ipfs/QmQYny5UaZ2bq4Y8vikpGp1NWxFLT3rApQKDqHTnKqUS8x',
  'https://gateway.pinata.cloud/ipfs/QmQnj2MYm7fTVxFxXVJfJUWhC5CaAdXMWMPZkzo4unKyW1',
  'https://gateway.pinata.cloud/ipfs/QmNntUmq1qUMSjhq4UnGrqwmiBWwkwfFoo4tkkzw7CyCZK',
  'https://gateway.pinata.cloud/ipfs/QmaXv3sQpFsJfkFJcKSCzN4gowfqfiERJ2VMCLKhtagWkX',
  'https://gateway.pinata.cloud/ipfs/QmdysrCv5Hf4hvreNhz1L3JjeDxKrkRgZd5aQvCSL8BDhq',
  'https://gateway.pinata.cloud/ipfs/QmYjPsDb1Hv9YaXdnur84e5DcJhcmWzimy5wzrLmHe6qwQ',
  'https://gateway.pinata.cloud/ipfs/QmYar2VmfZLezpppdX5jXnEorQhWHVabHwYgbAdsGk4ecv',
  'https://gateway.pinata.cloud/ipfs/QmUDNYuQqoJTsokXwRapcSkMX3w3m5QJG5tVQobcQe89tc'
];

const Home: React.FC = () => {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [balances, setBalances] = useState<number[]>([]);

  const { web3, account, connect, disconnect, chainId } = React.useContext(Web3ModalContext);

  const handleConnectWallet = () => {
    connect();
    if (account) {
      setAddress(account);
    }
  };

  const handleDisconnectWallet = () => {
    disconnect();
  };

  function ellipseAddress(address: string = "", width: number = 4): string {
    return `xdc${address.slice(2, width + 2)}...${address.slice(-width)}`;
  }

  const { walletBalanceChecker } = useContext(BlockchainContext);

  const handleCheckBalance = useCallback(async () => {
    if (!address || !walletBalanceChecker) return;

    try {
      const result = await walletBalanceChecker.checkBalances(address);
      const numericBalances: number[] = result.map(Number);
      setBalances(numericBalances);
    } catch (error) {
      console.error("Error fetching balances:", error);
    }
  }, [address, walletBalanceChecker]);

  useEffect(() => {
    if (account) {
      setAddress(account);
      handleCheckBalance();
    }
  }, [account, handleCheckBalance]);

 
  const handleStake = () => {
    // Logic for staking or harvesting
  };



  const navigateHome = () => {
    router.push('/');
  };


  
  const convertWeiToEther = (wei: number) => wei / 10**18;

  // Convert and format the balances
  const formattedBalances: string[] = balances.map(balance => {
      const ether = convertWeiToEther(balance);
      return Math.round(ether).toString();  // This rounds off the value and ensures no decimal places.
  });
  
  const rearrangeBalances = (balances) => {
    const newOrder = [0, 1, 3, 2, 4];  // indices representing the new order
    return newOrder.map(index => balances[index]);
  };
  
  const reorderedBalances = rearrangeBalances(formattedBalances);


  const spacings = [155, 70, 70, 70, 70] 
  return (
    <div className="flex h-screen ">

      {/* Left Side: Contains Navbar and Main Content */}
      <div className="w-2/3 flex flex-col">
        
        {/* Navbar section */}
        <div 
      className="h-5 py-4 flex items-center bg-no-repeat bg-center" 
      style={{ backgroundImage: "url('/topbar.jpg')", backgroundSize: '100% 100%' }}
    >
      <div className="flex flex-row  "> 
        {reorderedBalances.map((balance, index) => (
          <div 
            key={index} 
            className="p-1 mt-2 px-5 w-20 rounded-md text-white font-bold" 
            style={{ marginLeft: `${spacings[index] || 0}px` }}  
          >
            {balance}
          </div>    
        ))}
      </div>
    </div>


        {/* Map section */}
        <div className="w-full flex-grow bg-green-200 rounded-lg p-5 relative overflow-hidden  ">
        <div className="box-border h-400 w-400  grid grid-rows-4 grid-flow-col gap-0 relative top-12 left-40 ">
      {imageUrls.map((url, index) => {
        const ipfsHash = url.split('/').pop();
        return (
          <Link href={`/users/${ipfsHash}`} key={index} passHref>
            <div className="block grid-item cursor-pointer w-100 h-50">
              <Image src={url} alt={`Image ${index + 1}`} width={100} height={50} className="object-cover" />
            </div>
          </Link>
        );
      })}
    </div>
</div>

      </div>

     {/* Right Side: Contains Sidebar with Harvest Resources */}
     <div 
    className="w-1/3 p-4 flex flex-col"
    style={{
        backgroundImage: `url('rightsidebar.jpg')`,
        backgroundSize: '100% 100%', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }}
>

{/* Button Section */}
<div className="p-0 space-y-6 ">

  {/* Buttons Row */}
  <div className="flex space-x-6">
      {/* My Holdings Button */}
      <button 
          className="bg-transparent  border-none mt-1 mx-4"
          onClick={() => router.push('/myholding')}
      >
          <div className="relative inline-block no-underline text-center w-12 h-12">
              <img 
                  src="/MyHoldings-Nav.jpg" 
                  alt="My Holdings" 
                  className="w-12 h-12"
              />
          </div>
      </button>

      {/* Trading Button */}
      <button 
          className="bg-transparent border-none mt-1 mx-4"
          onClick={() => router.push('/trading')}
      >
          <div className="relative inline-block no-underline text-center w-12 h-12">
              <img 
                  src="/Trading-Nav.jpg" 
                  alt="Trading" 
                  className="w-12 h-12"
              />
          </div>
      </button>

      {/* TownPort Button */}
      <button 
          className="bg-transparent  border-none mt-1 mx-4"
          onClick={() => router.push('/')}
      >
          <div className="relative inline-block no-underline text-center w-12 h-12">
              <img 
                  src="/TownPort-Nav.jpg" 
                  alt="landtiles" 
                  className="w-12 h-12"
              />
          </div>
      </button>

      {/* Landtiles Button */}
      <button 
          className="bg-transparent  border-none mt-1 mx-4"
          onClick={() => router.push('/landtiles')}
      >
          <div className="relative inline-block no-underline text-center  w-12 h-12">
              <img 
                  src="/TheBlockchainLandGameLogo.jpg" 
                  alt="landtiles" 
                  className="w-12 h-12"
              />
          </div>
      </button>

      {/* Wallet Connect/Disconnect Button */}
      {!account ? (
          <div 
              onClick={handleConnectWallet} 
              className="p-1 text-white rounded cursor-pointer bg-center bg-no-repeat bg-cover mt-1 mx-4"
              style={{ backgroundImage: `url('/Connect-Wallet-Nav.jpg')`, width: '48px', height: '48px' }}
          >
           
          </div>
      ) : (
        <div 
        onClick={handleDisconnectWallet} 
        className="p-1 text-white rounded cursor-pointer bg-center bg-no-repeat bg-cover transform scale-105 hover:shadow-xl transition-shadow duration-300 mt-1 mx-4"
        style={{
            backgroundImage: `url('/Connect-Wallet-Nav.jpg')`, 
            width: '48px', 
            height: '48px',
            boxShadow: '0 0 10px blue, 0 0 20px blue, 0 0 30px yellow'
        }}
    >
             
          </div>

      )}
  </div>
  </div>

        
<div className="flex items-center justify-center ">
  <h1 className="text-xl font-bold mb-3">Harvest Resources</h1>
</div>

        <span className="mb-4 ml-8 ">On LandNFT 0x0y_C2</span>

        <div className="mb-4 ml-8">
          <h2>Select Your Character to Stake</h2>
          <div className="flex space-x-4 mt-2 ml-8">
          <Image src="https://gateway.pinata.cloud/ipfs/Qma9UKohnTLEVSbzCEES4zQuRw5F2fsx5k8jUZ7oL5dRM9" alt="ruben" width={70} height={70} />
          <Image src="https://gateway.pinata.cloud/ipfs/QmatT6s9sgowNdn5Tw41ywvH9RfgAFdLeMJxFBKuEFHYpJ" alt="hans" width={70} height={70} />

          </div>
        </div>

        <div className="mb-4 ml-8">
          <h2>Select Tool to use</h2>
          <div className="mt-2 ml-8">
            <Image src="https://gateway.pinata.cloud/ipfs/QmaT7fBrTY49aZzuR7kYk7vS9fhD6SPzopkXBhP98w4Jvk" alt="Tool" width={70} height={70} />
          </div>
        </div>

        <div className="mb-4 ml-8">
          <h2>Select Resource to Harvest</h2>
          <div className="flex space-x-4 mt-2 ml-8">
            <Image src="https://gateway.pinata.cloud/ipfs/QmNMXhu6EMiyDRUHqV1mm27ABQYtGyLWLHVo97BEXnePML"alt="Resource 1" width={70} height={70} />
            <Image src="https://gateway.pinata.cloud/ipfs/QmYDnFZYqKGbG3VQTH4yKWUbMjSyRfy3K1p7Kz3ikMtuph" alt="Resource 2" width={70} height={70} />
            <Image src="https://gateway.pinata.cloud/ipfs/QmQjodW7SiQCpkNY1d2M9B39mmXTANyzcNY21cor6vSqpq" alt="Resource 2" width={70} height={70} />
          </div>
        </div>

        <div className="flex justify-center items-center">
  <button style={{ width: '150px' }} className="h-10 px-4 bg-blue-500 text-white rounded" onClick={handleStake}>
    Stake Character
  </button>
</div>



      </div>
    </div>
  );
};

export default Home;
