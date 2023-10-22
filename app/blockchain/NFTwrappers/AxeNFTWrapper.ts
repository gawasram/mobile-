import Web3 from 'web3';
import axe from '../contracts/NFTcontracts/axe';
import { addressArray } from '../constants';

export default class axeNFTWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: axe;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        this.Contract = new axe(this.wrapperOptions, addressArray[14].Contract[this.chainId]);
    }

    async buyAxe() {
        try {
            const tx = await this.Contract.send('buyAxe', { from: this.account });
        } catch (error) {
            throw error;
        }
    }
}
