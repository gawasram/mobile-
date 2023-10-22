import Web3 from 'web3';
import anvil from '../contracts/NFTcontracts/anvil';
import { addressArray } from '../constants';

export default class hammerNFTWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: anvil;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        this.Contract = new anvil(this.wrapperOptions, addressArray[12].Contract[this.chainId]);
    }

    async buyAnvil() {
        try {
            const tx = await this.Contract.send('buyAnvil', { from: this.account });
        } catch (error) {
            throw error;
        }
    }
}
