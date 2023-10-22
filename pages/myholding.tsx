import React, { useState, useCallback, useEffect,useContext } from "react";
import { useRouter } from 'next/router'; 
import { Web3ModalContext } from "../app/contexts/Web3ModalProvider";
import { BlockchainContext } from "../app/contexts/BlockchainProvider";
import '../app/globals.css';



const nftImages = [ 
"https://ipfs.blocksscan.io/unsafe/https://gateway.pinata.cloud/ipfs/QmdKgHEsYGWLFA5tu47TPtChEbnTDFqqKE7PoncFz2imqe/Maxwell.jpg",
"https://ipfs.blocksscan.io/unsafe/https://gateway.pinata.cloud/ipfs/QmdKgHEsYGWLFA5tu47TPtChEbnTDFqqKE7PoncFz2imqe/axe.jpg",
"https://ipfs.blocksscan.io/unsafe/https://gateway.pinata.cloud/ipfs/QmVNkURhjGhN4pZY7Y5zdSddTKE3jTfnpPCdHq3qEaZ19T",
"https://ipfs.blocksscan.io/unsafe/https://gateway.pinata.cloud/ipfs/QmaNnS2tTaP889iQewvmx3wsQ1fyZKwdLhBwxtaSzgVmPd",
"https://ipfs.blocksscan.io/unsafe/https://gateway.pinata.cloud/ipfs/QmdKgHEsYGWLFA5tu47TPtChEbnTDFqqKE7PoncFz2imqe/pickaxe.jpg",
"https://ipfs.blocksscan.io/unsafe/https://gateway.pinata.cloud/ipfs/QmdKgHEsYGWLFA5tu47TPtChEbnTDFqqKE7PoncFz2imqe/anvil.jpg",
"https://ipfs.blocksscan.io/unsafe/https://gateway.pinata.cloud/ipfs/QmdKgHEsYGWLFA5tu47TPtChEbnTDFqqKE7PoncFz2imqe/Row%20Boat1.jpg",
"https://ipfs.blocksscan.io/unsafe/https://gateway.pinata.cloud/ipfs/QmXiaa2oEcPnjxRGzrGPcD72Cw5PbBTPL54npYU7UZAR8e",
"https://ipfs.blocksscan.io/unsafe/https://gateway.pinata.cloud/ipfs/Qmc9opVaTEE2Y522YNvvHkQ9Z54sGJua2p6JrfTD73Vszt",
"https://ipfs.blocksscan.io/unsafe/https://gateway.pinata.cloud/ipfs/QmX7CgG5nyH1XPzkXn72okhJEQvyxXR2xc7tx2GSYBVwYL"

]

const MyHoldingPage: React.FC = () => {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [balances, setBalances] = useState<number[]>([]);

  const handleBack = () => {
    router.push('/');  // Navigate back to the home page
  };

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

  // Function to check if an image is accessible on the server
  const checkImage = (url: string) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          console.error(`Image not accessible: ${url}`);
        } else {
          console.log(`Image accessible: ${url}`);
        }
      })
      .catch(error => {
        console.error(`Error fetching image: ${url}`, error);
      });
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

// Detect when the wallet is connected and update the address, then check balance
useEffect(() => {
  if (account) {
    setAddress(account);
    handleCheckBalance();
  }
}, [account, handleCheckBalance]);


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


  const [nftBalances, setNftBalances] = useState<number[]>([]);

  const { nftWalletBalanceChecker } = useContext(BlockchainContext);


  const handleCheckNFTBalance = useCallback(async () => {
    if (!address || !nftWalletBalanceChecker) return;

    try {
      const result = await nftWalletBalanceChecker.checkNFTBalances(address);
        const numericBalances: number[] = result.map(Number);
        setNftBalances(numericBalances);
    } catch (error) {
        console.error("Error fetching NFT balances:", error);
    }
}, [address, nftWalletBalanceChecker]);

useEffect(() => {
    if (account) {
        setAddress(account);
        handleCheckNFTBalance();
    }
}, [account, handleCheckNFTBalance]);


const spacings = [155, 70, 70, 70, 70] 

   

 
return (
  <div className="flex h-screen ">
    
    {/* Main Content and Navbar Section */}
    <div className="flex flex-col w-2/3">
      
      {/* Navbar Section */}
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

      {/* Main Content */}
      <div className="flex-grow bg-cover bg-center relative" 
        style={{ 
          backgroundImage: "url('/myHoldings.jpg')", 
          backgroundSize: '100% 100%',
          backgroundPosition: 'center' 
        }}
      >
        <div className=" overflow-y-scroll scrollbar-hide w-1/2 h-72 mx-auto mt-16">
            <div className="grid grid-cols-4 gap-5 p-5">
                {nftBalances.map((balance, index) => (
                    balance > 0 ? (
                        <div key={index} className="flex flex-col items-center justify-center">
                            <img src={nftImages[index]} alt={`NFT ${index}`} className="w-16 h-16 object-cover" />
                            <div className="bg-yellow-300 p-1 mt-2 rounded-md">{balance}</div>
                        </div>
                    ) : null
                ))}
            </div>
        </div>
        <p className="text-yellow-300 font-bold text-center mt-6">
            Scroll to see more item tiles below
        </p>
      </div>

    </div>

    {/* Sidebar Section */}
    <div className="w-1/3 bg-no-repeat bg-center flex-grow" 
      style={{ 
        backgroundImage: "url('/rightsidebar.jpg')", 
        backgroundSize: '100% 100%',
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat'
      }}
    >
        {/* Potential Content for Sidebar */}
 {/* Buttons Container */}
 <div className="p-4 space-y-6 ">

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


    </div>
  </div>

);
};

export default MyHoldingPage;