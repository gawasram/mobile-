import Web3 from 'web3';
import shears from '../contracts/NFTcontracts/shears';
import { addressArray } from '../constants';

export default class shearsNFTWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: shears;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        this.Contract = new shears(this.wrapperOptions, addressArray[19].Contract[this.chainId]);
    }

    async buyShears() {
        try {
            const tx = await this.Contract.send('buyShears', { from: this.account });
        } catch (error) {
            throw error;
        }
    }
}
