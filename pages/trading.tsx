import React, { useState, useCallback, useEffect,useContext } from "react";
import { useRouter } from 'next/router'; 
import { Web3ModalContext } from "../app/contexts/Web3ModalProvider";
import { BlockchainContext } from "../app/contexts/BlockchainProvider";
import { HashLoader } from "react-spinners";
import Modal from 'react-bootstrap/Modal';


interface QuerriedOffer {
  id: number;
  offerString: string | null;
  offerCrreator: string | null;
}

const App: React.FC = () => {
  // Accessing the Web3ModalContext
  const { web3, account, connect, disconnect, signer, chainId } = React.useContext(
    Web3ModalContext
  );
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [balances, setBalances] = useState<number[]>([]);

  const handleBack = () => {
    router.push('/');  // Navigate back to the home page
  };


  // add the blockchain context 
  const {
    woodInTheBlockchainLand: WoodInTheBlockchainLandWrapper,
    rockInTheBlockchainLand: RockInTheBlockchainLandWrapper,
    CLAYInTheBlockchainLand: CLAYInTheBlockchainLandWrapper,
    woolInTheBlockchainLand: WoolInTheBlockchainLandWrapper,
    fishInTheBlockchainLand: FishInTheBlockchainLandWrapper,
    tradeOffer: tradeOfferWrapper

  } = React.useContext(BlockchainContext);

  //Loading state
  const [loading, setLoading] = useState<boolean>(false)

  //allowance status
  const [woodAllowance, setWoodAllowance] = useState("");
  const [rockAllowance, setRockAllowance] = useState("");
  const [clayAllowance, setClayAllowance] = useState("");
  const [woolAllowance, setWoolAllowance] = useState("");
  const [fishAllowance, setFishAllowance] = useState("");

  //available Offers data
  const [numberOfOffers, setNumberOfOffers] = useState(0);
  const [offerStringArray, setOfferStringArray] = useState<string[]>([]);
  const [offerCreatorArray, setOfferCreatorArray] = useState<string[]>([]);


  // State for qurried offers
  const [querriedOffers, setQuerriedOffers] = useState<QuerriedOffer[]>([]);

  const [tokenAmounts, setTokenAmounts] = useState(Array(10).fill(undefined));
  const [tokensOfferedData, setTokensOfferedData] = useState(Array(5).fill(undefined));
  const [tokensWantedData, setTokensWantedData] = useState(Array(5).fill(undefined));
  const [isApproved, setIsApproved] = useState({
    WOOD: false,
    ROCK: false,
    CLAY: false,
    WOOL: false,
    FISH: false
  })

  // State for tokens offered and tokens wanted
  const [tokensOffered, setTokensOffered] = useState([
    { id: 1, token: "", amount: 0 }
  ]);
  const [tokensWanted, setTokensWanted] = useState([
    { id: 1, token: "", amount: 0 }
  ]);

  // Declare counter states for each button
  const [counterWanted, setCounterWanted] = useState(0);
  const [counterOffered, setCounterOffered] = useState(0);


  const [marketplacePopulated, setMarketplacePopulated] = useState<number>(0);

  const [marketplaceButtonName, setMarketplaceButtonName] = useState<string[]>([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    handleShow();
  }, [])

  useEffect(() => {
    if (woodAllowance !== "0" && rockAllowance !== "0" && clayAllowance !== "0" && woolAllowance !== "0" && fishAllowance !== "0") {
      handleClose();
      console.log("all apprved");
    } else {
      handleShow();
    }
  }, [woodAllowance, rockAllowance, clayAllowance, woolAllowance, fishAllowance])

  useEffect(() => {
    if (numberOfOffers > 0) {
      getStringInfo();
    }
  });

  useEffect(() => {
    getCreatorInfo();
    console.log(offerStringArray);
  }, [offerStringArray])

  useEffect(() => {
    console.log(offerCreatorArray);
  }, [offerCreatorArray])


  useEffect(() => {
    getTokenAllowance();
    getNumberOfOffers();
  });

  const getTokenAllowance = async () => {
    if (web3 && account && chainId) {
      const _woodAllowance = await WoodInTheBlockchainLandWrapper?.allowance();
      setWoodAllowance(String(Number(_woodAllowance) / 10 ** 18) || "0");

      const _rockAllowance = await RockInTheBlockchainLandWrapper?.allowance();
      setRockAllowance(String(Number(_rockAllowance) / 10 ** 18) || "0");

      const _clayAllowance = await CLAYInTheBlockchainLandWrapper?.allowance();
      setClayAllowance(String(Number(_clayAllowance) / 10 ** 18) || "0");

      const _woolAllowance = await WoolInTheBlockchainLandWrapper?.allowance();
      setWoolAllowance(String(Number(_woolAllowance) / 10 ** 18) || "0");

      const _fishAllowance = await FishInTheBlockchainLandWrapper?.allowance();
      setFishAllowance(String(Number(_fishAllowance) / 10 ** 18) || "0");
    }
  }

  const getNumberOfOffers = async () => {
    if (web3 && account && chainId) {
      const _numberOfOffers = await tradeOfferWrapper?.getNumberOfOffers();
      if (Number(_numberOfOffers) > 0) {
        setNumberOfOffers(Number(_numberOfOffers));
      }
      else {
        setNumberOfOffers(0);
      }
    }
  }

  useEffect(() => {
    console.log(marketplacePopulated);
  }, [marketplacePopulated])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // Code to be executed after 1 second
  //     if (marketplacePopulated < 1) {
  //       console.log("done");

  //       // window.location.reload();
  //     }
  //   }, 2000);

  //   return () => clearTimeout(timer); // Clean up the timer on component unmount
  // }, []);

  useEffect(() => {
    if (marketplacePopulated < 2) {
      {
        try {
          for (let i = 0; i < offerStringArray.length; i++) {
            if (offerStringArray[i] !== '') {
              console.log(offerStringArray[i]);
              console.log(offerCreatorArray[i]);
              let newOffer: QuerriedOffer = {
                id: i + 1,
                offerString: offerStringArray[i],
                offerCrreator: offerCreatorArray[i],
              };
              setQuerriedOffers((prevState) => [...prevState, newOffer]);
            }
          }
          setMarketplacePopulated(marketplacePopulated + 1);
        } catch (error) {
          console.error("Error fetching offer info:", error);
        }
      }
    }
  }, [offerCreatorArray]);


  const getStringInfo = async () => {
    try {
      if (web3 && account && chainId) {
        const _offerString = await tradeOfferWrapper?.getOfferStringsArray();
        const newOfferStringArray = (String(_offerString)).split(",");
        if (!(newOfferStringArray[0] === offerStringArray[0])) {
          setOfferStringArray(newOfferStringArray);
        }
      }
    } catch (error) {
      console.error("Error fetching offer info:", error);
    }
  };

  const getCreatorInfo = async () => {
    try {
      if (web3 && account && chainId) {
        const _offerCreator = await tradeOfferWrapper?.getOfferCreatorsArray();
        const newOfferCreatorsArray = (String(_offerCreator)).split(",");
        if (newOfferCreatorsArray[0] != offerCreatorArray[0]) {
          setOfferCreatorArray(newOfferCreatorsArray);
        }
      }
    } catch (error) {
      console.error("Error fetching offer info:", error);
    }
  };

  // Function to add a new token to the tokensOffered state
  const handleAddTokenOffered = () => {
    if (counterOffered < 4) {
      const newToken = { id: tokensOffered.length + 1, token: "", amount: 0 };
      setTokensOffered([...tokensOffered, newToken]);
      setCounterOffered(counterOffered + 1);
    }
  };

  // Function to add a new token to the tokensWanted state
  const handleAddTokenWanted = () => {
    if (counterWanted < 4) {
      const newToken = { id: tokensWanted.length + 1, token: "", amount: 0 };
      setTokensWanted([...tokensWanted, newToken]);
      setCounterWanted(counterWanted + 1);
    }
  };


  // Function to handle changes in the tokensOffered state
  const handleTokenOfferedChange = (
    id: number,
    field: string,
    value: string
  ) => {
    const updatedTokens = tokensOffered.map((token) =>
      token.id === id ? { ...token, [field]: value } : token
    );
    setTokensOffered(updatedTokens);

  };


  // Function to handle changes in the tokensWanted state
  const handleTokenWantedChange = (
    id: number,
    field: string,
    value: string
  ) => {
    const updatedTokens = tokensWanted.map((token) =>
      token.id === id ? { ...token, [field]: value } : token
    );
    setTokensWanted(updatedTokens);

  }

  // Function to handle form submission
  const handleSubmitOffer = useCallback(async () => {
    // Validate the form inputs before submitting
    if (tokensOffered.some((token) => token.token === "" || token.amount === 0)) {
      alert("Please fill in all the token offered fields.");
      return;
    }
    if (tokensWanted.some((token) => token.token === "" || token.amount === 0)) {
      alert("Please fill in all the token wanted fields.");
      return;
    }
    createOrderedArray();
    handleCreateOffer();

  }, [web3, account, tokensOffered, tokensWanted]);

  const handleApproveWood = () => {
    if (web3 && account && chainId) {
      setLoading(true);
      WoodInTheBlockchainLandWrapper
        ?.approve()
        .then(() => {
          setLoading(false);
          alert("Wood Approved!");
          setIsApproved(prevState => {
            return { ...prevState, WOOD: true }
          })
        });
    }
  }

  const handleApproveRock = () => {
    if (web3 && account && chainId) {
      setLoading(true);
      RockInTheBlockchainLandWrapper
        ?.approve()
        .then(() => {
          setLoading(false);
          alert("Rock Approved!");
          setIsApproved(prevState => {
            return { ...prevState, ROCK: true }
          })
        });
    }
  }

  const handleApproveClay = () => {
    if (web3 && account && chainId) {
      setLoading(true);
      CLAYInTheBlockchainLandWrapper
        ?.approve()
        .then(() => {
          setLoading(false);
          alert("Clay Approved!");
          setIsApproved(prevState => {
            return { ...prevState, CLAY: true }
          })
        });
    }
  }

  const handleApproveWool = () => {
    if (web3 && account && chainId) {
      setLoading(true);
      WoolInTheBlockchainLandWrapper
        ?.approve()
        .then(() => {
          setLoading(false);
          alert("Wool Approved!");
          setIsApproved(prevState => {
            return { ...prevState, WOOL: true }
          })
        });
    }
  }

  const handleApproveFish = () => {
    if (web3 && account && chainId) {
      setLoading(true);
      FishInTheBlockchainLandWrapper
        ?.approve()
        .then(() => {
          setLoading(false);
          alert("Fish Approved!");
          setIsApproved(prevState => {
            return { ...prevState, FISH: true }
          })
        });
    }
  }

  useEffect(() => {
    for (let i = 0; i < offerCreatorArray.length; i++) {
      if (offerStringArray[i] !== '') {
        if (offerCreatorArray[i] === "true") {
          setMarketplaceButtonName(prevState => [...prevState, 'Cancel Offer']);
        } else {
          setMarketplaceButtonName(prevState => [...prevState, 'Accept Offer']);
        }
      }
    }
  }, [offerCreatorArray])

  const createOrderedArray = () => {
    // Create an array to store the ordered Offered tokens

    const newOfferedData = Array(5).fill(undefined); // Create an array with 5 undefined elements

    for (let i = 0; i < tokensOffered.length; i++) {
      if (tokensOffered[i].token === "WOOD") {
        newOfferedData[0] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "ROCK") {
        newOfferedData[1] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "CLAY") {
        newOfferedData[2] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "WOOL") {
        newOfferedData[3] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "FISH") {
        newOfferedData[4] = tokensOffered[i].amount;
      }
    }

    setTokensOfferedData(newOfferedData);

    // Create an array to store the ordered Wanted tokens


    const newWantedData = Array(5).fill(undefined); // Create an array with 5 undefined elements

    for (let i = 0; i < tokensWanted.length; i++) {
      if (tokensWanted[i].token === "WOOD") {
        newWantedData[0] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "ROCK") {
        newWantedData[1] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "CLAY") {
        newWantedData[2] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "WOOL") {
        newWantedData[3] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "FISH") {
        newWantedData[4] = tokensWanted[i].amount;
      }
    }

    setTokensWantedData(newWantedData);

    const newTokenAmounts = Array(10).fill(undefined);

    for (let i = 0; i < newOfferedData.length; i++) {
      newTokenAmounts[i] = newOfferedData[i]
    }


    for (let i = 0; i < newWantedData.length; i++) {
      newTokenAmounts[i + 5] = newWantedData[i]
    }

    for (let i = 0; i < 10; i++) {
      if (typeof newTokenAmounts[i] === "undefined") {
        newTokenAmounts[i] = 0;
      }
    }
    setTokenAmounts(newTokenAmounts);

  }

  // Function to handle form submission
  const handleCreateOffer = useCallback(async () => {
    // Validate the form inputs before submitting
    if (tokensOffered.some((token) => token.token === "" || token.amount === 0)) {
      alert("Please fill in all the token offered fields.");
      return;
    }
    if (tokensWanted.some((token) => token.token === "" || token.amount === 0)) {
      alert("Please fill in all the token wanted fields.");
      return;
    }


    // Create an array to store the ordered Offered tokens

    for (let i = 0; i < tokensOffered.length; i++) {
      if (tokensOffered[i].token === "WOOD") {
        tokensOfferedData[0] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "ROCK") {
        tokensOfferedData[1] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "CLAY") {
        tokensOfferedData[2] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "WOOL") {
        tokensOfferedData[3] = tokensOffered[i].amount;
      } else if (tokensOffered[i].token === "FISH") {
        tokensOfferedData[4] = tokensOffered[i].amount;
      }
    }

    // Create an array to store the ordered Wanted tokens

    for (let i = 0; i < tokensWanted.length; i++) {
      if (tokensWanted[i].token === "WOOD") {
        tokensWantedData[0] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "ROCK") {
        tokensWantedData[1] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "CLAY") {
        tokensWantedData[2] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "WOOL") {
        tokensWantedData[3] = tokensWanted[i].amount;
      } else if (tokensWanted[i].token === "FISH") {
        tokensWantedData[4] = tokensWanted[i].amount;
      }
    }



    for (let i = 0; i < tokensOfferedData.length; i++) {
      tokenAmounts[i] = tokensOfferedData[i]
    }


    for (let i = 0; i < tokensWantedData.length; i++) {
      tokenAmounts[i + 5] = tokensWantedData[i]
    }

    for (let i = 0; i < 10; i++) {
      if (typeof tokenAmounts[i] === "undefined") {
        tokenAmounts[i] = 0;
      }
    }

    const tokenAmountsTuple = tokenAmounts as [number, number, number, number, number, number, number, number, number, number];

    if (web3 && account && chainId) {
      setLoading(true);
      tradeOfferWrapper
        ?.makeOffer(...tokenAmountsTuple)
        .then(() => {
          alert("Offer created successfully!");
        })
        .then(() => {
          setLoading(false);
          window.location.reload();
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        })
        .then(() => {
          setLoading(false);
          window.location.reload();
        });
    }

  }, [web3, account, tokensOffered, tokensWanted, tradeOfferWrapper]);

  const handleCancelOffer = (async (_offerId: number) => {
    if (web3 && account && chainId) {
      setLoading(true);
      tradeOfferWrapper?.withdraw(_offerId - 1)
        .then(() => {
          alert("Offer cancelled successfully!");
        })
        .then(() => {
          setLoading(false);
          window.location.reload();
        })
        .catch((err) => {
          setLoading(false);
          alert(`Error: ${err.message}`);
          window.location.reload();
        })
    }
  });
  const handleTransactAcceptOffer = async (_offerId) => {
    if (web3 && account && chainId) {
      setLoading(true);
      tradeOfferWrapper?.acceptOffer(_offerId - 1)
        .then(() => {
          alert("Offer Accepted successfully!");
        })
        .then(() => {
          setLoading(false);
          window.location.reload();
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        })
    }

  };


  // Function to connect to XDCPay
  const handleConnectXDCPay = useCallback(() => {
    connect();
  }, [connect]);

  // Function to disconnect from the wallet
  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

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
    <div className="min-h-screen flex">

      {/* Combined Navbar & Main Content */}
      <div className="w-2/3 flex flex-col">

        {/* Navbar */}
        <header>
          {/* Your Navbar Contents */}
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
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-100% 100% bg-cover bg-no-repeat" style={{ backgroundImage: "url('/Trading.png')" }}>
          {/* Your Main Content */}
          <Modal show={show} backdrop="static" keyboard={false}>
            <Modal.Header>
              <Modal.Title id="example-modal-sizes-title-lg">Provide Approvals</Modal.Title>
            </Modal.Header>
            <Modal.Body>
    {loading ? (
        <HashLoader color="#0ca02c" />
    ) : (
        <>
            <button onClick={woodAllowance === "0" ? handleApproveWood : () => console.log("Wood approved")}>
                {woodAllowance === "0" ? "Approve Wood" : "Wood Approved"}
            </button>

            <button onClick={rockAllowance === "0" ? handleApproveRock : () => console.log("Rock approved")}>
                {rockAllowance === "0" ? "Approve Rock" : "Rock Approved"}
            </button>

            <button onClick={clayAllowance === "0" ? handleApproveClay : () => console.log("Clay approved")}>
                {clayAllowance === "0" ? "Approve Clay" : "Clay Approved"}
            </button>

            <button onClick={woolAllowance === "0" ? handleApproveWool : () => console.log("Wool approved")}>
                {woolAllowance === "0" ? "Approve Wool" : "Wool Approved"}
            </button>

            <button onClick={fishAllowance === "0" ? handleApproveFish : () => console.log("Fish approved")}>
                {fishAllowance === "0" ? "Approve Fish" : "Fish Approved"}
            </button>
        </>
    )}
</Modal.Body>

          </Modal>

          <div>
          <div className="flex items-center justify-center ">
    <h2 className="text-2xl font-bold mb-3">Marketplace Offers (List of Open Offers)</h2>
</div>

            {querriedOffers.length > 0 ? (
              <ul className="list-decimal pl-2 overflow-y-scroll scrollbar-hide w-1/2 h-80 mx-auto mt-16">
                {querriedOffers.filter(offer => offer).map((offer, index) => (
                  <li key={offer.id} className="mb-3">
                    <strong className="font-medium">Offer Id: {offer.id}</strong>
                    <p className="mb-2">{offer.offerString}</p>
                    <div>
                      {loading ? (
                        <HashLoader color="#0ca02c" />
                      ) : (
                        <button 
                        className={`
                            defaultbtn 
                            ${marketplaceButtonName[index] === "Accept Offer" ? "bg-green-500 hover:bg-green-600  px-5 py-2 rounded" : 
                              marketplaceButtonName[index] === "Cancel Offer" ? "bg-red-500 hover:bg-red-600 px-5 py-2 rounded" : " "}
                        `}
                        onClick={
                            marketplaceButtonName[index] === "Cancel Offer" ? 
                                () => handleCancelOffer(offer.id) : 
                            marketplaceButtonName[index] === 'Accept Offer' ? 
                                () => handleTransactAcceptOffer(offer.id) : 
                            undefined
                        }
                    >
                        {marketplaceButtonName[index]}
                    </button>
                    
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <HashLoader color="#0ca02c" />
            )}
          </div>
          <p className="text-yellow-300 font-bold text-center mt-6">
            Scroll to see more item tiles below
        </p>
        </main>

      </div>

      {/* Sidebar */}
      <aside className="w-1/3 bg-no-repeat bg-center flex-grow" 
      style={{ 
        backgroundImage: "url('/rightsidebar.jpg')", 
        backgroundSize: '100% 100%',
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat'
      }}
    >
        {/* Your Sidebar Contents */}
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
            onClick={handleConnectXDCPay} 
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


          {/* Tokens Offered */}
          <div className="mt-0 p-1">
    <h2 className="text-2xl font-bold mb-4 ml-12">Make an Offer to Trade</h2>

    
        <h3 className="ml-8 mb-2">Tokens Offered</h3>
        <div className="ml-8 mb-4 h-32 overflow-y-auto scrollbar-hide">
        {tokensOffered.map((token, index) => (
           <div key={token.id} className="mb-2 flex items-center">
           <input
               type="number"
               min="1"
               value={token.amount}
               onChange={(e) =>
                   handleTokenOfferedChange(token.id, "amount", e.target.value)
               }
               className="border p-2 mr-2 w-20" 
           />
           
           <select
               value={token.token}
               onChange={(e) =>
                   handleTokenOfferedChange(token.id, "token", e.target.value)
               }
               className="border p-2"
           >
               <option value="">Select Token</option>
               <option value="WOOD">WOOD</option>
               <option value="ROCK">ROCK</option>
               <option value="CLAY">CLAY</option>
               <option value="WOOL">WOOL</option>
               <option value="FISH">FISH</option>
           </select>
       </div>
       
        ))}
         </div>
        <button 
            onClick={handleAddTokenOffered} 
            className="ml-8 bg-yellow-500 text-white rounded"
        >
            Add Another
        </button>
   

    
        <h3 className="mt-5 ml-8 mb-2">Tokens Wanted</h3>
        <div className="ml-8 mb-4 h-32 overflow-y-auto scrollbar-hide">
        {tokensWanted.map((token, index) => (
            <div key={token.id} className="mb-2 flex items-center">
                <input
                    type="number"
                    min="1"
                    value={token.amount}
                    onChange={(e) =>
                        handleTokenWantedChange(token.id, "amount", e.target.value)
                    }
                    className="border p-2 mr-2 w-20"
                />
                <select
                    value={token.token}
                    onChange={(e) =>
                        handleTokenWantedChange(token.id, "token", e.target.value)
                    }
                    className="border p-2"
                >
                    <option value="">Select Token</option>
                    <option value="WOOD">WOOD</option>
                    <option value="ROCK">ROCK</option>
                    <option value="CLAY">CLAY</option>
                    <option value="WOOL">WOOL</option>
                    <option value="FISH">FISH</option>
                </select>
            </div>
        ))}
        </div>
        <button 
            onClick={handleAddTokenWanted} 
            className="ml-8 bg-yellow-500 text-white rounded"
        >
            Add Another
        </button>
    

    <div>
        {
            loading ? 
            <HashLoader color="#0ca02c" /> 
            : 
            <div className="flex justify-center">
            <button 
                onClick={handleCreateOffer} 
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
            >
                Create Offer to Trade
            </button>
        </div>
        
        }
    </div>
</div>


      </aside>

    </div>
  );
};

export default App;