import React, { useState, useCallback, useEffect, useContext } from "react";
import { Web3ModalContext } from "../app/contexts/Web3ModalProvider";
import { BlockchainContext } from "../app/contexts/BlockchainProvider";
import ImageComponent from "../app/components/ImageComponent";
import { imgArray } from "../app/data/imageData";
import { useHandleClick, ImageInfo } from "../app/hooks/useHandleClick";
import { HashLoader } from "react-spinners";
import { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import '../app/globals.css';
import TwoThirdsLayout from '../app/components/TwoThirdsLayout';
import OneThirdLayout from '../app/components/OneThirdLayout';
import Navbar from '../app/components/Navbar';
import MainFrame from "../app/components/MainFrame";


interface HandleClickProps {
  setSelectedImage: (src: string) => void;
  setSelectedImageTitle: (title: string) => void;
  setSelectedOffer: (offer: string) => void;
  setAmount: (amount: string) => void;
  setFetchedAmount: (amount: string) => void;
  setFetchedAmount1: (amount: string) => void;
  setTokenBurned: (token: string) => void;
  setTokenReturned: (token: string) => void;
  setCreateText: (text: string) => void;
}

const imageInfoMap: Record<string, ImageInfo> = {
  CLOTH: {
    title: "CLOTH",
    tokenBurned: "WOOL",
    tokenReturned: "CLOTH",
    createText: "CREATE CLOTH",
    fetchedAmount: (amount: number) => (amount * 8).toString(),
    currentIndex: 0,
    offer: "800 BRICK ERC20 Make 1 CLOTH NFT", // Add the 'offer' property here
  },
  BRICK: {
    title: "BRICK",
    tokenBurned: "CLAY ",
    tokenReturned: "BRICK ",
    createText: "CREATE BRICK",
    fetchedAmount: (amount: number) => (amount * 2).toString(), // Add fetched amount calculation
    currentIndex: 1,
    offer: "100 BRICK ERC20 Make 1 BRICK NFT", // Add the 'offer' property here
  },
  ROPE: {
    title: "ROPE",
    tokenBurned: "WOOL",
    tokenReturned: "ROPE",
    createText: "CREATE ROPE",
    fetchedAmount: (amount: number) => (amount * 3).toString(), // Add fetched amount calculation
    currentIndex: 2,
    offer: "100 BRICK ERC20 Make 1 NAILS NFT", // Add the 'offer' property here
  },
  IRON: {
    title: "IRON",
    tokenBurned: "ROCK + WOOD",
    tokenReturned: "IRON ",
    createText: "CREATE IRON",
    fetchedAmount: (amount: number) => (amount * 3).toString(), // Add fetched amount calculation
    fetchedAmount1: (amount: number) => (amount * 1).toString(),
    currentIndex: 3,
    offer: "100 BRICK ERC20 Make 1 NAILS NFT", // Add the 'offer' property here
  },
  LUMBER: {
    title: "LUMBER",
    tokenBurned: "WOOD ",
    tokenReturned: "LUMBER ",
    createText: "CREATE LUMBER",
    fetchedAmount: (amount: number) => (amount * 2).toString(), // Add fetched amount calculation
    currentIndex: 4,
    offer: "100 BRICK ERC20 Make 1 CLOTH NFT", // Add the 'offer' property here
  },
  FORGE: {
    title: "FORGE",
    tokenBurned: "BRICK + CLAY",
    tokenReturned: "FORGE",
    createText: "CREATE FORGE",
    fetchedAmount: (amount: number) => (amount * 100).toString(), // Add fetched amount calculation
    fetchedAmount1: (amount: number) => (amount * 3).toString(),
    currentIndex: 5,
    offer: "100 BRICK ERC20 Make 1 BRICK NFT", // Add the 'offer' property here
  },
  HAMMER: {
    title: "HAMMER",
    tokenBurned: "WOOD + IRON  ",
    tokenReturned: "HAMMER ",
    createText: "CREATE HAMMER",
    fetchedAmount: (amount: number) => (amount * 1).toString(), // Add fetched amount calculation
    fetchedAmount1: (amount: number) => (amount * 1).toString(),
    currentIndex: 6,
    offer: "100 BRICK ERC20 Make 1 NAILS NFT", // Add the 'offer' property here
  },
  ANVIL: {
    title: "ANVIL",
    tokenBurned: " IRON + WOOD",
    tokenReturned: "ANVIL ",
    createText: "CREATE ANVIL",
    fetchedAmount: (amount: number) => (amount * 100).toString(), // Add fetched amount calculation
    fetchedAmount1: (amount: number) => (amount * 3).toString(),
    currentIndex: 7,
    offer: "100 BRICK ERC20 Make 1 CLOTH NFT", // Add the 'offer' property here
  },
  NET: {
    title: "NAILS",
    tokenBurned: "BRICK + ROPE",
    tokenReturned: "NET",
    createText: "CREATE NET",
    fetchedAmount: (amount: number) => (amount * 6).toString(), // Add fetched amount calculation
    fetchedAmount1: (amount: number) => (amount * 1).toString(),
    currentIndex: 8,
    offer: "100 BRICK ERC20 Make 1 NAILS NFT", // Add the 'offer' property here
  },
  AXE: {
    title: "BRICK",
    tokenBurned: "WOOD + IRON",
    tokenReturned: "AXE ",
    createText: "CREATE AXE",
    fetchedAmount: (amount: number) => (amount * 1).toString(), // Add fetched amount calculation
    fetchedAmount1: (amount: number) => (amount * 2).toString(),
    currentIndex: 9,
    offer: "100 BRICK ERC20 Make 1 BRICK NFT", // Add the 'offer' property here
  },
  SAW: {
    title: "SAW",
    tokenBurned: " WOOD + IRON",
    tokenReturned: "SAW ",
    createText: "CREATE SAW",
    fetchedAmount: (amount: number) => (amount * 1).toString(), // Add fetched amount calculation
    fetchedAmount1: (amount: number) => (amount * 3).toString(),
    currentIndex: 10,
    offer: "100 BRICK ERC20 Make 1 CLOTH NFT", // Add the 'offer' property here
  },
  PICKAXE: {
    title: "PICKAXE",
    tokenBurned: "WOOD + IRON",
    tokenReturned: "PICKAXE",
    createText: "CREATE PICKAXE",
    fetchedAmount: (amount: number) => (amount * 1).toString(), // Add fetched amount calculation
    fetchedAmount1: (amount: number) => (amount * 3).toString(),
    currentIndex: 11,
    offer: "100 BRICK ERC20 Make 1 BRICK NFT", // Add the 'offer' property here
  },
  ROWBOAT: {
    title: "ROWBOAT",
    tokenBurned: " LUMBER",
    tokenReturned: "ROWBOAT ",
    createText: "CREATE ROWBOAT",
    fetchedAmount: (amount: number) => (amount * 16).toString(), // Add fetched amount calculation
    currentIndex: 12,
    offer: "100 BRICK ERC20 Make 1 BRICK NFT", // Add the 'offer' property here
  },
  NAILS: {
    title: "NAILS",
    tokenBurned: "IRON + WOOD",
    tokenReturned: "NAIL",
    createText: "CREATE NAIL",
    fetchedAmount: (amount: number) => (amount * 1).toString(),
    fetchedAmount1: (amount: number) => (amount * 1).toString(),
    currentIndex: 13,
    offer: "",
  },
  SHEARS: {
    title: "SHEARS",
    tokenBurned: "WOOD  + IRON ",
    tokenReturned: "SHEARS ",
    createText: "CREATE SHEARS ",
    fetchedAmount: (amount: number) => (amount * 1).toString(),
    fetchedAmount1: (amount: number) => (amount * 1).toString(),
    currentIndex: 14,
    offer: "",
  },
  SHOVEL: {
    title: "SHOVEL",
    tokenBurned: "WOOD + IRON",
    tokenReturned: "SHOVEL ",
    createText: "CREATE SHOVEL",
    fetchedAmount: (amount: number) => (amount * 1).toString(),
    fetchedAmount1: (amount: number) => (amount * 3).toString(),
    currentIndex: 15,
    offer: "",
  },

};

const App: React.FC = () => {
  const [frameWidth, setFrameWidth] = useState(0);
  const [frameHeight, setFrameHeight] = useState(0);
  const [slide, setSlide] = useState(0);
  const [address, setAddress] = useState('');
  const [balances, setBalances] = useState<number[]>([]);
  const router = useRouter();


  const { web3, account, connect, disconnect, chainId } =
    React.useContext(Web3ModalContext);

  const {
    tokenBalanceTracker: TokenBalanceTrackerWrapper,
    woodInTheBlockchainLand: WoodInTheBlockchainLandWrapper,
    rockInTheBlockchainLand: RockInTheBlockchainLandWrapper,
    CLAYInTheBlockchainLand: CLAYInTheBlockchainLandWrapper,
    woolInTheBlockchainLand: WoolInTheBlockchainLandWrapper,
    fishInTheBlockchainLand: FishInTheBlockchainLandWrapper,
    ropeToken: ropeTokenWrapper,
    clothToken: clothTokenWrapper,
    brickToken: brickTokenWrapper,
    ironToken: ironTokenWrapper,
    lumberToken: lumberTokenWrapper,
    forgeNFT: forgeNFTWrapper,
    hammerNFT: hammerNFTWrapper,
    anvilNFT: anvilNFTWrapper,
    fishNetNFT: fishNetNFTWrapper,
    axeNFT: axeNFTWrapper,
    sawNFT: sawNFTWrapper,
    pickaxeNFT: pickaxeNFTWrapper,
    rowboatNFT: rowboatNFTWrapper,
    nailsToken: nailsTokenWrapper,
    shearsNFT: shearsNFTWrapper,
    shovelNFT: shovelNFTWrapper

  } = React.useContext(BlockchainContext);

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedImageTitle, setSelectedImageTitle] = useState<string>("");
  const [selectedOffer, setSelectedOffer] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [fetchedAmount, setFetchedAmount] = useState<string>("");
  const [fetchedAmount1, setFetchedAmount1] = useState<string>("");
  const [tokenBurned, setTokenBurned] = useState<string>("");
  const [tokenReturned, setTokenReturned] = useState<string>("");
  const [createText, setCreateText] = useState<string>("");

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentArray, setCurrentArray] = useState<string[]>();
  const handleClick = useCallback(
    (src: string, title: string, amount: string, offer: string) => {
      setSelectedImage(src);
      setSelectedImageTitle(title);
      setSelectedOffer(offer);
      setIsShowOffer(true); // Always show the offer when an image is clicked	
      setAmount(amount);
      setFetchedAmount("");
      setFetchedAmount1("");
      setCreateText(imageInfoMap[title]?.createText || "");

      // Get the imageInfo for the selected title from imageInfoMap	
      const imageInfo = imageInfoMap[title];
      if (imageInfo) {
        // Calculate the token burned and token returned values based on the selected amount	
        const calculatedTokenBurned = imageInfo.tokenBurned;
        const calculatedTokenReturned = imageInfo.tokenReturned;
        setTokenBurned(calculatedTokenBurned);
        setTokenReturned(calculatedTokenReturned);

        // Check if the image has fetchedAmount property and calculate it	
        if (imageInfo.fetchedAmount) {
          const calculatedAmount = imageInfo.fetchedAmount(parseFloat(amount));
          setFetchedAmount(calculatedAmount);

          // Check if the image has fetchedAmount1 property and calculate it	
          if (imageInfo.fetchedAmount1) {
            const calculatedAmount1 = imageInfo.fetchedAmount1(parseFloat(amount));
            setFetchedAmount1(calculatedAmount1);
          } else {
            setFetchedAmount1("");
          }
        } else {
          setFetchedAmount("");
          setFetchedAmount1("");
        }
      } else {
        setTokenBurned("");
        setTokenReturned("");
        setFetchedAmount("");
        setFetchedAmount1("");
      }

      // Check if the clicked image is the same as the previous one.	
      // If not, hide the offer for the previous image.	
      if (selectedImageTitle !== title) {
        setIsShowOffer(false);
      }
    },
    [selectedImageTitle]
  );


  const [isShowOffer, setIsShowOffer] = useState(false);

  //approvals for tokens to burn
  const [isApproved, setIsApproved] = useState({
    WOOD: false,
    ROCK: false,
    CLAY: false,
    WOOL: false,
    FISH: false,
    ROPE: false,
    CLOTH: false,
    BRICK: false,
    IRON: false,
    LUMBER: false,
    NAIL: false
  });

  //Loading state
  const [loading, setLoading] = useState<boolean>(false);
  const [tileLoading, setTileLoading] = useState<boolean>(false);

  const [buttonName, setButtonName] = useState("Mint");
  const [buttonClicked, setButtonClicked] = useState(false);

  // Token Balances
  const [erc20Balances, setErc20Balances] = useState<string[]>([]);
  const [erc721Balances, setErc721Balances] = useState<string[]>([]);

  //arays from imageData.ts
  const [currentErc20TokensArray, setCurrentErc20TokensArray] = useState<number[]>([]);
  const [currentErc721TokensArray, setCurrentErc721TokensArray] = useState<number[]>([]);
  const [requiredERC721Names, setRequiredERC721Names] = useState<string[]>([]);

  //true if rquired Token in wallet
  const [mintingPossible, setMintingPossible] = useState(false);

  //list of tokens missing
  const [neededERC20TokensString, setNeededERC20TokensString] = useState("");
  const [neededERC721TokensString, setNeededERC721TokensString] = useState("");

  //invalid amount
  const [amountInvalid, setAmountInvalid] = useState(false);


  const getERC20TokensBalances = async () => {
    setTileLoading(false);
    if (web3 && account && chainId && Number(amount) != 0) {
      const _erc20balance = await TokenBalanceTrackerWrapper?.getERC20Balance();
      const newErc20Balances = (String(_erc20balance)).split(",");
      if (_erc20balance != undefined && currentArray != undefined) {
        let counter = 0;
        let string = "You need at least ";
        for (let i = 0; i < currentErc20TokensArray.length; i++) {
          if (Number(newErc20Balances[i]) <
            Number(amount) * currentErc20TokensArray[i]) {
            const toInsert = currentArray[counter];
            let missingBalance = Number(amount) * currentErc20TokensArray[i] -
              Number(newErc20Balances[i]);
            string += `${missingBalance} ${toInsert} `;
            counter++;
          }
          else {
          }
        }
        if (string != "You need at least ") {
          string += 'More';
        }
        setNeededERC20TokensString(string);
      }
    } else {
      setAmountInvalid(true);
      setButtonClicked(false);
    }
    setTileLoading(false);
  }

  useEffect(() => {
    setTileLoading(false);
    if (neededERC721TokensString.length == 0 &&
      neededERC20TokensString.length == 18) {
      setMintingPossible(true);
      setButtonClicked(true);
    } else {
      setMintingPossible(false);
    }
  }, [neededERC20TokensString, neededERC721TokensString])

  useEffect(() => {
    if ((!amountInvalid) && (!mintingPossible) && ((neededERC721TokensString.length > 0) || (neededERC20TokensString.length > 18))) {
      setButtonClicked(false);
    }
    if (amountInvalid) {
      setButtonClicked(false);
    }
  }, [amountInvalid, mintingPossible, neededERC721TokensString, neededERC20TokensString])

  useEffect(() => {
    setNeededERC20TokensString("");
    setNeededERC721TokensString("");
    setButtonName("Mint");
    setLoading(false);
    setTileLoading(false);
    setAmountInvalid(false);
  }, [currentIndex]);

  const getERC721TokensBalances = async () => {
    setTileLoading(false);
    if (web3 && account && chainId) {
      const _erc721balance = await TokenBalanceTrackerWrapper?.getERC721Balance();
      const newErc721Balances = (String(_erc721balance)).split(",");
      let string = "";
      if (_erc721balance != undefined) {
        for (let i = 0; i < currentErc721TokensArray.length; i++) {
          if (newErc721Balances[currentErc721TokensArray[i]] !== "0") {
          }
          else {
            string += ` 1 ${requiredERC721Names[i]} NFT `;
          }
        }
        setNeededERC721TokensString(string);
      }
    }
  }

  const getTokenAllowance = async (wrapper, _index) => {
    if (web3 && account && chainId && wrapper) {
      const allowance = await wrapper.allowance(_index + 5);
      return String(Number(allowance) / 10 ** 18) || "0";
    }
    return "0";
  };

  const getWoodAllowance = async (_index) => {
    const _woodAllowance = await getTokenAllowance(WoodInTheBlockchainLandWrapper, _index);
    if (_woodAllowance !== "0") {
      setIsApproved(prevState => ({
        ...prevState,
        WOOD: true
      }));
    } else {
      changeButtonName();
    }
  };

  const getRockAllowance = async (_index) => {
    const _rockAllowance = await getTokenAllowance(RockInTheBlockchainLandWrapper, _index);
    if (_rockAllowance !== "0") {
      setIsApproved(prevState => ({
        ...prevState,
        ROCK: true
      }));
    } else {
      changeButtonName();
    }
  };

  const getClayAllowance = async (_index) => {
    const _clayAllowance = await getTokenAllowance(CLAYInTheBlockchainLandWrapper, _index);
    if (_clayAllowance !== "0") {
      setIsApproved(prevState => ({
        ...prevState,
        CLAY: true
      }));
    } else {
      changeButtonName();
    }
  };

  const getWoolAllowance = async (_index) => {
    const _woolAllowance = await getTokenAllowance(WoolInTheBlockchainLandWrapper, _index);
    if (_woolAllowance !== "0") {
      setIsApproved(prevState => ({
        ...prevState,
        WOOL: true
      }));
    } else {
      changeButtonName();
    }
  };

  const getFishAllowance = async (_index) => {
    const _fishAllowance = await getTokenAllowance(FishInTheBlockchainLandWrapper, _index);
    if (_fishAllowance !== "0") {
      setIsApproved(prevState => ({
        ...prevState,
        FISH: true
      }));
    } else {
      changeButtonName();
    }
  };

  const getRopeAllowance = async (_index) => {
    const _ropeAllowance = await getTokenAllowance(ropeTokenWrapper, _index);
    if (_ropeAllowance !== "0") {
      setIsApproved(prevState => ({
        ...prevState,
        ROPE: true
      }));
    } else {
      changeButtonName();
    }
  };

  const getClothAllowance = async (_index) => {
    const _clothAllowance = await getTokenAllowance(clothTokenWrapper, _index);
    if (_clothAllowance !== "0") {
      setIsApproved(prevState => ({
        ...prevState,
        CLOTH: true
      }));
    } else {
      changeButtonName();
    }
  };

  const getBrickAllowance = async (_index) => {
    const _brickAllowance = await getTokenAllowance(brickTokenWrapper, _index);
    if (_brickAllowance !== "0") {
      setIsApproved(prevState => ({
        ...prevState,
        BRICK: true
      }));
    } else {
      changeButtonName();
    }
  };

  const getIronAllowance = async (_index) => {
    const _ironAllowance = await getTokenAllowance(ironTokenWrapper, _index);
    if (_ironAllowance !== "0") {
      setIsApproved(prevState => ({
        ...prevState,
        IRON: true
      }));
    } else {
      changeButtonName();
    }
  };

  const getLumberAllowance = async (_index) => {
    const _lumberAllowance = await getTokenAllowance(lumberTokenWrapper, _index);
    if (_lumberAllowance !== "0") {
      setIsApproved(prevState => ({
        ...prevState,
        LUMBER: true
      }));
    } else {
      changeButtonName();
    }
  };

  const getNailsAllowance = async (_index) => {
    const _NailsAllowance = await getTokenAllowance(nailsTokenWrapper, _index);
    if (_NailsAllowance !== "0") {
      setIsApproved(prevState => ({
        ...prevState,
        NAIL: true
      }));
    } else {
      changeButtonName();
    }
  };


  function changeButtonName() {
    setLoading(false);
    if (currentArray == undefined) {
      setLoading(false);
    } else if (currentArray != undefined) {
      for (let i = 0; i < currentArray.length; i++) {
        if (currentArray[i].length == 0) {
          return
        } else if ((!isApproved[currentArray[i]]) && currentArray[i].length > 0) {
          setLoading(false);
          const bName = `Approve ${currentArray[i]}`;
          setButtonName(bName);
          break;
        }
        setLoading(false);
        setButtonName("Transact");
      }
    }
  };

  useEffect(() => {
    changeButtonName()
  }, [isApproved])


  function getRequiredAllowance() {
    if (currentArray != undefined) {
      for (let i = 0; i < currentArray.length; i++) {
        if (currentArray[i] === "WOOD") {
          getWoodAllowance(currentIndex);
        }
        if (currentArray[i] === "ROCK") {
          getRockAllowance(currentIndex);
        }
        if (currentArray[i] === "CLAY") {
          getClayAllowance(currentIndex);
        }
        if (currentArray[i] === "WOOL") {
          getWoolAllowance(currentIndex);
        }
        if (currentArray[i] === "FISH") {
          getFishAllowance(currentIndex);
        }
        if (currentArray[i] === "ROPE") {
          getRopeAllowance(currentIndex);
        }
        if (currentArray[i] === "CLOTH") {
          getClothAllowance(currentIndex);
        }
        if (currentArray[i] === "BRICK") {
          getBrickAllowance(currentIndex);
        }
        if (currentArray[i] === "IRON") {
          getIronAllowance(currentIndex);
        }
        if (currentArray[i] === "LUMBER") {
          getLumberAllowance(currentIndex);
        }
        if (currentArray[i] === "NAILS") {
          getNailsAllowance(currentIndex);
        }

      }
    }
  }

  const handleMint = () => {
    setTileLoading(true);
    getERC20TokensBalances();
    getERC721TokensBalances();
    setButtonClicked(true);
    setTileLoading(false);
    if (web3 && account && chainId) {
      getRequiredAllowance();
    }
  };

  const handleApproveWood = () => {
    setLoading(true);
    if (web3 && account && chainId) {
      WoodInTheBlockchainLandWrapper?.approve(currentIndex + 5)
        .then(() => {
          alert("Wood Approved!");
          setIsApproved(prevState => {
            return { ...prevState, WOOD: true }
          });
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  const handleApproveRock = () => {
    setLoading(true);
    if (web3 && account && chainId) {
      RockInTheBlockchainLandWrapper?.approve(currentIndex + 5)
        .then(() => {
          alert("Rock Approved!");
          setIsApproved(prevState => {
            return { ...prevState, ROCK: true }
          });
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  const handleApproveClay = () => {
    setLoading(true);
    if (web3 && account && chainId) {
      CLAYInTheBlockchainLandWrapper?.approve(currentIndex + 5)
        .then(() => {
          alert("Clay Approved!");
          setIsApproved(prevState => {
            return { ...prevState, CLAY: true }
          })
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  const handleApproveWool = () => {
    setLoading(true);
    if (web3 && account && chainId) {
      WoolInTheBlockchainLandWrapper?.approve(currentIndex + 5)
        .then(() => {
          setIsApproved(prevState => {
            return { ...prevState, WOOL: true }
          });
        })
        .then(() => {
          alert("Wool Approved!");
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  const handleApproveFish = () => {
    setLoading(true);
    if (web3 && account && chainId) {
      FishInTheBlockchainLandWrapper?.approve(currentIndex + 5)
        .then(() => {
          alert("Fish Approved!");
          setIsApproved(prevState => {
            return { ...prevState, FISH: true }
          })
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  const handleApproveRope = () => {
    setLoading(true);
    if (web3 && account && chainId) {
      ropeTokenWrapper?.approve(currentIndex + 5)
        .then(() => {
          alert("Rope Approved!");
          setIsApproved(prevState => {
            return { ...prevState, ROPE: true }
          })
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  const handleApproveCloth = () => {
    setLoading(true);
    if (web3 && account && chainId) {
      clothTokenWrapper?.approve(currentIndex + 5)
        .then(() => {
          alert("Cloth Approved!");
          setIsApproved(prevState => {
            return { ...prevState, CLOTH: true }
          });
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  const handleApproveBrick = () => {
    setLoading(true);
    if (web3 && account && chainId) {
      brickTokenWrapper?.approve(currentIndex + 5)
        .then(() => {
          alert("Brick Approved!");
          setIsApproved(prevState => {
            return { ...prevState, BRICK: true }
          })
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  const handleApproveIron = () => {
    setLoading(true);
    if (web3 && account && chainId) {
      ironTokenWrapper?.approve(currentIndex + 5)
        .then(() => {
          alert("Iron Approved!");
          setIsApproved(prevState => {
            return { ...prevState, IRON: true }
          })
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  const handleApproveLumber = () => {
    setLoading(true);
    if (web3 && account && chainId) {
      lumberTokenWrapper?.approve(currentIndex + 5)
        .then(() => {
          alert("Lumber Approved!");
          setIsApproved(prevState => {
            return { ...prevState, LUMBER: true }
          })
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  const handleApproveNails = () => {
    setLoading(true);
    if (web3 && account && chainId) {
      nailsTokenWrapper?.approve(currentIndex + 5)
        .then(() => {
          alert("Nails Approved!");
          setIsApproved(prevState => {
            return { ...prevState, NAIL: true }
          })
        })
        .catch((err) => {
          alert(`Error: ${err.message}`);
        });
    }
  };

  const handleTransact = () => {
    setLoading(true);
    if (web3 && account && chainId) {
      if (currentIndex === 0) {
        clothTokenWrapper?.mintCloth(amount)
          .then(() => {
            alert("CLOTH Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 1) {
        brickTokenWrapper?.mintBrick(amount)
          .then(() => {
            alert("BRICK Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 2) {
        ropeTokenWrapper?.mintRope(amount)
          .then(() => {
            alert("ROPE Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 3) {
        ironTokenWrapper?.mintIron(amount)
          .then(() => {
            alert("IRON Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 4) {
        lumberTokenWrapper?.mintLumber(amount)
          .then(() => {
            alert("LUMBER Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 5) {
        forgeNFTWrapper?.buyForge()
          .then(() => {
            alert("FORGE Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 6) {
        hammerNFTWrapper?.buyHammer()
          .then(() => {
            alert("HAMMER Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 7) {
        anvilNFTWrapper?.buyAnvil()
          .then(() => {
            alert("ANVIL Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 8) {
        fishNetNFTWrapper?.buyNet()
          .then(() => {
            alert("FISH NET Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 9) {
        axeNFTWrapper?.buyAxe()
          .then(() => {
            alert("AXE Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 10) {
        sawNFTWrapper?.buySaw()
          .then(() => {
            alert("SAW Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 11) {
        pickaxeNFTWrapper?.buyPickaxe()
          .then(() => {
            alert("PICKAXE Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 12) {
        rowboatNFTWrapper?.buyRowBoat()
          .then(() => {
            alert("ROWBOAT Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 13) {
        nailsTokenWrapper?.mintNail(amount)
          .then(() => {
            alert("NAILS Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 14) {
        shearsNFTWrapper?.buyShears()
          .then(() => {
            alert("SHEARS Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
      if (currentIndex === 15) {
        shovelNFTWrapper?.buyShovel()
          .then(() => {
            alert("SHOVEL Minted successfully");
          })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            alert(`Error: ${err.message}`);
            window.location.reload();
          });
      }
    }
  }




  const handleConnectWallet = useCallback(() => {
    console.log("Connecting wallet...");
    try {
      connect();
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  }, [connect]);


  const handleDisconnectWallet = useCallback(() => {
    console.log("Disconnecting wallet...");
    disconnect();
  }, [disconnect]);







  const handleAmountChange = (inputAmount: string) => {
    const parsedAmount = parseFloat(inputAmount);
    if (!isNaN(parsedAmount)) {
      setAmount(inputAmount);
      const imageInfo = imageInfoMap[selectedImageTitle];
      if (imageInfo) {
        const calculatedAmount = imageInfo.fetchedAmount(parsedAmount);
        setFetchedAmount(calculatedAmount);

        // Check if the image has fetchedAmount1 property and calculate it
        if (imageInfo.fetchedAmount1) {
          const calculatedAmount1 = imageInfo.fetchedAmount1(parsedAmount);
          setFetchedAmount1(calculatedAmount1);
        } else {
          setFetchedAmount1("");
        }
      } else {
        setFetchedAmount("");
        setFetchedAmount1("");
      }
    } else {
      setAmount("");
      setFetchedAmount("");
      setFetchedAmount1("");
    }
  };


  function ellipseAddress(address: string = "", width: number = 4): string {
    return `xdc${address.slice(2, width + 2)}...${address.slice(-width)}`;
  }

  function handleImageClick(curIndex: number) {
    setCurrentIndex(curIndex);
    const item = imgArray[curIndex];
    setCurrentArray(item.requiredToken);
    setCurrentErc721TokensArray(item.requiredERCE721Indices);
    handleClick(item.src, item.title, item.amount, item.offer);
    setRequiredERC721Names(item.requiredERC721Names);
    setCurrentErc20TokensArray(item.requiredERC20Amounts);

    // Set the default amount value based on the selected image title
    const defaultAmount = ['NET', 'FORGE', 'ANVIL', 'HAMMER', 'AXE', 'SAW', 'PICKAXE', 'ROWBOAT', 'SHEARS', 'SHOVEL'].includes(item.title) ? '1' : '';
    setAmount(defaultAmount);

    setSelectedImageTitle(item.title);
  }

  useEffect(() => {
    console.log(tileLoading);

  }, [tileLoading])


  const handleOpenLink = () => {
    // Open the specified link in a new tab/window
    console.log("Button clicked!");
    window.open('https://app.sandbox.topperpay.com/?wst_id=29347f45-1f86-43a0-973b-bd51ffb5f451', '_blank');
  };


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

  const convertWeiToEther = (wei: number) => {
    console.log(`Converting wei: ${wei}`);
    return wei / 10 ** 18;
  };


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

  useEffect(() => {

    const updateFrameWidth = () => {
      const windowHeight = window.innerHeight;
      setFrameHeight(windowHeight);
      const newFrameWidth = (29 / 20) * windowHeight; // Calculate the width based on the ratio
      setFrameWidth(newFrameWidth);
    };

    // Initial sizing
    updateFrameWidth();

    // Add a resize event listener to update the size when the window is resized
    window.addEventListener('resize', updateFrameWidth);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateFrameWidth);
    };
  }, []);


  const MainContent = ({
    imgArray,
    buttonClicked,
    currentIndex,
    handleImageClick,
    setIsShowOffer
  }) => (
    <div className="container mx-auto overflow-y-scroll scrollbar-hide"
      style={{
        width: `${frameWidth * 0.597}px`,
        height: `${frameHeight * 0.94}px`,
        paddingLeft: `${frameWidth * 0.088}px`,
        paddingTop: `${frameHeight * 0.124}px`
      }}>
      <div className="grid grid-cols-4">
        {imgArray.map((item, index) => (
          <div
            key={item.title + index}
            className="object-contain hover:scale-110 cursor-pointer transition delay-75 duration-200 ease-in-out"
            style={{
              width: `${frameWidth * 0.12}px`,
              height: `${frameHeight * 0.175}`,
              margin: `${frameWidth * 0.004}px`
            }}
          >
            <ImageComponent
              buttonClicked={buttonClicked}
              src={item.src}
              title={item.title}
              currentIndex={currentIndex}
              index={index}
              handleImageClick={handleImageClick}
              setShowOffer={setIsShowOffer}
            />
          </div>
        ))}
      </div>
      {/* <p className="mt-4 text-center text-yellow-500 font-bold">
        Scroll to see more item tiles below
      </p> */}

    </div>
  );

  const SideBar = ({
    account,
    handleConnectWallet,
    handleDisconnectWallet,
    router,
    tileLoading,
    currentIndex,
    amountInvalid,
    mintingPossible,
    neededERC721TokensString,
    neededERC20TokensString,
    selectedImageTitle,
    isShowOffer,
    selectedOffer,
    fetchedAmount,
    fetchedAmount1,
    tokenBurned,
    amount,
    handleAmountChange,
    tokenReturned,
    loading,
    buttonName,
    handleMint,
    handleApproveWood,
    handleApproveRock,
    handleApproveClay,
    handleApproveWool,
    handleApproveFish,
    handleApproveCloth,
    handleApproveBrick,
    handleApproveRope,
    handleApproveIron,
    handleApproveLumber,
    handleApproveNails,
    handleTransact,

  }) => (
    <div className="p-4 space-y-4 ">

      {/* Wallet Connection Section */}


      {/* My Holdings Button */}
      <button
        className="bg-transparent border-none fixed top-2   m-3.5"
        onClick={() => router.push('/myholding')}
      >
        <div className="relative inline-block no-underline text-center  w-12 h-12">
          <img
            src="/myHoldings.jpg"
            alt="My Holdings"
            className="w-12 h-12"
          />

        </div>
      </button>
      <div className="flex space-x-4 ml-20">
        {/* Landtiles Button */}
        <button
          className="p-1 bg-yellow-500 text-white rounded"
          onClick={() => router.push('/landtiles')}
        >
          Landtiles
        </button>

        {/* Get XDC Button */}
        <button
          onClick={() => {/*handleOpenLink*/ }}
          className="p-1 bg-green-500 text-white rounded"
        >
          Get XDC
        </button>

        {/* Wallet Connect/Disconnect Button */}
        {!account ? (
          <div
            onClick={handleConnectWallet}
            className="p-1 bg-blue-500 text-white rounded cursor-pointer"
          >
            CONNECT WALLET
          </div>
        ) : (
          <div
            onClick={handleDisconnectWallet}
            className="p-1 bg-red-500 text-white rounded cursor-pointer"
          >
            {ellipseAddress(account)}
          </div>
        )}
      </div>


      {/* Dynamic Sections Based on States */}
      {tileLoading ? (
        <HashLoader color="#0ca02c" />
      ) : currentIndex < 0 ? (
        <h1 className="flex flex-col items-center space-y-4 p-4 border rounded">Click a Tile to Start</h1>
      ) : amountInvalid && !mintingPossible ? (
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold">Please select a valid amount</h2>
        </div>
      ) : !amountInvalid && !mintingPossible && (neededERC721TokensString.length > 0 || neededERC20TokensString.length > 18) ? (
        <div className="text-center py-4">
          {neededERC20TokensString.length > 0 && <h4 className="text-xl">{neededERC20TokensString}</h4>}
          {neededERC721TokensString.length > 0 && <h4 className="text-xl">{neededERC721TokensString}</h4>}
        </div>
      ) : (
        <div className="p-4">

          {selectedImageTitle && (
            <div className="text-center mb-4">
              <h3 className="text-2xl font-semibold">Make {selectedImageTitle}</h3>
            </div>
          )}
          {isShowOffer && (
            <div className="mb-4 text-center">
              <h5 className="text-xl">
                <p>{selectedOffer}</p>
              </h5>
            </div>
          )}


          <div className="space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4 items-center h-12">
              <h6 className="text-lg font-medium mb-1">
                <label htmlFor="amount">Amount</label>
              </h6>
              <h2 className="text-2xl font-semibold">Token Burned</h2>
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4 items-center h-12">
              <span>{fetchedAmount}</span>
              <p>{tokenBurned}</p>
            </div>
            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-4 items-center h-12">
              <span>{fetchedAmount1}</span>
              <p></p> {/* Empty paragraph to maintain height and position */}
            </div>
            {/* Row 4 */}
            <div className="grid grid-cols-2 gap-4 items-center h-12">
              <h6 className="text-lg font-medium mb-1">
                <label htmlFor="amount">Amount</label>
              </h6>
              <h5 className="text-xl font-medium">Token Returned</h5>
            </div>
            {/* Row 5 */}
            <div className="grid grid-cols-2 gap-4 items-center h-12">
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                disabled={!['ROPE', 'CLOTH', 'BRICK', 'IRON', 'LUMBER', 'NAILS'].includes(selectedImageTitle)}
                min="1"
                step="1"
                className="p-2 border rounded  w-20 h-15"
              />
              <p>{tokenReturned}</p>
            </div>
          </div>





          <div className="p-4 flex items-center justify-center min-h-[100px]">
            <div>
              {loading ? (
                <HashLoader color="#0ca02c" />
              ) : (
                <button
                  id="create-offer"
                  onClick={() => {
                    buttonName === "Mint" && currentIndex >= 0
                      ? handleMint()
                      : buttonName === 'Approve WOOD'
                        ? handleApproveWood()
                        : buttonName === 'Approve ROCK'
                          ? handleApproveRock()
                          : buttonName === 'Approve CLAY'
                            ? handleApproveClay()
                            : buttonName === 'Approve WOOL'
                              ? handleApproveWool()
                              : buttonName === 'Approve FISH'
                                ? handleApproveFish()
                                : buttonName === 'Approve CLOTH'
                                  ? handleApproveCloth()
                                  : buttonName === 'Approve BRICK'
                                    ? handleApproveBrick()
                                    : buttonName === 'Approve ROPE'
                                      ? handleApproveRope()
                                      : buttonName === 'Approve IRON'
                                        ? handleApproveIron()
                                        : buttonName === 'Approve LUMBER'
                                          ? handleApproveLumber()
                                          : buttonName === 'Approve NAILS'
                                            ? handleApproveNails()
                                            : buttonName === 'Transact'
                                              ? handleTransact()
                                              : console.log("");
                  }}
                  className="w-40 h-12 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue flex items-center justify-center"
                >
                  {buttonName === "Mint"
                    ? `Mint ${selectedImageTitle}`
                    : buttonName === "Transact"
                      ? `Create ${selectedImageTitle}`
                      : buttonName}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>

  );




  return (
    <main className="flex h-screen w-screen overflow-hidden bg-black">

      <div className="mx-auto" style={{ position: "relative" }}>
        <MainFrame reorderedBalances={reorderedBalances} backGroundImagePath={"/TownPort.png"} />
        <div
          style={{ position: "absolute", top: 0, left: 0 }}>
          <MainContent
            imgArray={imgArray}
            buttonClicked={buttonClicked}
            currentIndex={currentIndex}
            handleImageClick={handleImageClick}
            setIsShowOffer={setIsShowOffer}
          />
        </div>
      </div>


      {/* </TwoThirdsLayout> */}

      {/* <OneThirdLayout>
        <SideBar
          account={account}
          handleConnectWallet={handleConnectWallet}
          handleDisconnectWallet={handleDisconnectWallet}
          router={router}
          tileLoading={tileLoading}
          currentIndex={currentIndex}
          amountInvalid={amountInvalid}
          mintingPossible={mintingPossible}
          neededERC721TokensString={neededERC721TokensString}
          neededERC20TokensString={neededERC20TokensString}
          selectedImageTitle={selectedImageTitle}
          isShowOffer={isShowOffer}
          selectedOffer={selectedOffer}
          fetchedAmount={fetchedAmount}
          fetchedAmount1={fetchedAmount1}
          tokenBurned={tokenBurned}
          amount={amount}
          handleAmountChange={handleAmountChange}
          tokenReturned={tokenReturned}
          loading={loading}
          buttonName={buttonName}
          handleMint={handleMint}
          handleApproveWood={handleApproveWood}
          handleApproveRock={handleApproveRock}
          handleApproveClay={handleApproveClay}
          handleApproveWool={handleApproveWool}
          handleApproveFish={handleApproveFish}
          handleApproveCloth={handleApproveCloth}
          handleApproveBrick={handleApproveBrick}
          handleApproveRope={handleApproveRope}
          handleApproveIron={handleApproveIron}
          handleApproveLumber={handleApproveLumber}
          handleApproveNails={handleApproveNails}
          handleTransact={handleTransact}
        />

      </OneThirdLayout> */}
    </main>
  );
};
export default App;