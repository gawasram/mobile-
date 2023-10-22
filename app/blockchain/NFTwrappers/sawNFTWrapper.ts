import Web3 from 'web3';
import saw from '../contracts/NFTcontracts/saw';
import { addressArray } from '../constants';

export default class sawNFTWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: saw;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        this.Contract = new saw(this.wrapperOptions, addressArray[15].Contract[this.chainId]);
    }

    async buySaw() {
        try {
            const tx = await this.Contract.send('buySaw', { from: this.account });
        } catch (error) {
            throw error;
        }
    }
}
