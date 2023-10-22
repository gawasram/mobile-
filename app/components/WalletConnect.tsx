
import React, { useContext } from 'react';
import { Web3ModalContext } from "../contexts/Web3ModalProvider";

interface WalletConnectProps {
  account: string | null;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ account }) => {
  const { connect, disconnect } = useContext(Web3ModalContext);
  
  const ellipseAddress = (address: string = "", width: number = 4) => {
    return `xdc${address.slice(2, width + 2)}...${address.slice(-width)}`;
  };

  return (
    <div className="mt-4">
      {!account ? (
        <button className="bg-blue-500 text-white px-5 py-2 rounded mx-auto" onClick={connect}>
          CONNECT WALLET
        </button>
      ) : (
        <button className="bg-blue-500 text-white px-5 py-2 rounded mx-auto" onClick={disconnect}>
          {ellipseAddress(account)}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
