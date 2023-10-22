import Web3 from 'web3';
import shovel from '../contracts/NFTcontracts/shovel';
import { addressArray } from '../constants';

export default class shovelNFTWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: shovel;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        this.Contract = new shovel(this.wrapperOptions, addressArray[20].Contract[this.chainId]);
    }

    async buyShovel() {
        try {
            const tx = await this.Contract.send('buyShovel', { from: this.account });
        } catch (error) {
            throw error;
        }
    }
}
