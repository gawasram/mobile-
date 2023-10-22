import Web3 from 'web3';
import hammer from '../contracts/NFTcontracts/hammer';
import { addressArray } from '../constants';

export default class hammerNFTWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: hammer;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        this.Contract = new hammer(this.wrapperOptions, addressArray[11].Contract[this.chainId]);
    }

    async buyHammer() {
        try {
            const tx = await this.Contract.send('buyHammer', { from: this.account });
        } catch (error) {
            throw error;
        }
    }
}
