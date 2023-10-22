export interface ImageInfo {
  title: string;
  tokenBurned: string;
  tokenReturned: string;
  createText: string;
  fetchedAmount: (amount: number) => string;
  fetchedAmount1?: (amount: number) => string;
  currentIndex: number;
  offer: string;
}

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
  setCurrentIndex: (currentIndex: number) => void;
}



export function useHandleClick(
  setSelectedImage: (src: string) => void,
  setSelectedImageTitle: (title: string) => void,
  setSelectedOffer: (offer: string) => void,
  setAmount: (amount: string) => void,
  setFetchedAmount: (amount: string) => void,
  setFetchedAmount1: (amount: string) => void,
  setTokenBurned: (token: string) => void,
  setTokenReturned: (token: string) => void,
  setCreateText: (text: string) => void,
  setCurrentIndex: (index: number) => void,
  imageInfoMap: Record<string, ImageInfo>
) {
  const handleClick = (
    src: string, 
    title: string, 
    amount: string, 
    offer: string, 
    currentIndex: number) => {
    setSelectedImage(src);
    setSelectedImageTitle(title);
    setSelectedOffer(offer);
    setAmount(amount);
    setCurrentIndex(currentIndex);

    const imageInfo = imageInfoMap[title];

    if (imageInfo) {
      setTokenBurned(imageInfo.tokenBurned);
      setTokenReturned(imageInfo.tokenReturned);
      setCreateText(imageInfo.createText);

      const parsedAmount = parseFloat(amount);
      if (!isNaN(parsedAmount)) {
        setAmount(amount);
        setFetchedAmount(imageInfo.fetchedAmount(parsedAmount).toString());

        // Perform a null check on fetchedAmount1
        if (imageInfo.fetchedAmount1) {
          setFetchedAmount1(imageInfo.fetchedAmount1(parsedAmount).toString());
        } else {
          setFetchedAmount1("");
        }

        setSelectedOffer(offer);
      } else {
        setAmount("");
        setFetchedAmount("");
        setFetchedAmount1("");
        setSelectedOffer("");

        console.log("selectedOffer:", "");
        console.log("fetchedAmount:", "");
      }
    } else {
      setTokenBurned("");
      setTokenReturned("");
      setCreateText("");
      setAmount("");
      setFetchedAmount("");
      setFetchedAmount1("");
      setSelectedOffer("");
    }
  };

  const selectOffer = (title: string, amount: string) => {
    const imageInfo = imageInfoMap[title];
    if (imageInfo) {
      const parsedAmount = parseFloat(amount);
      if (!isNaN(parsedAmount)) {
        return imageInfo.fetchedAmount(parsedAmount) + " " + imageInfo.offer;
      }
    }
    return "";
  };

  return { handleClick, selectOffer };
}