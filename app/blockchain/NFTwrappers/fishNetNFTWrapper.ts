import Web3 from 'web3';
import fishNet from '../contracts/NFTcontracts/Net';
import { addressArray } from '../constants';

export default class fishNetNFTWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: fishNet;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        this.Contract = new fishNet(this.wrapperOptions, addressArray[13].Contract[this.chainId]);
    }

    async buyNet() {
        try {
            const tx = await this.Contract.send('buyNet', { from: this.account });
        } catch (error) {
            throw error;
        }
    }
}
