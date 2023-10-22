import Web3 from 'web3';
import forge from './../contracts/NFTcontracts/forge';
import { addressArray } from './../constants';

export default class forgeNFTWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: forge;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        this.Contract = new forge(this.wrapperOptions, addressArray[10].Contract[this.chainId]);
    }

    async buyForge() {
        try {
            const tx = await this.Contract.send('buyForge', { from: this.account });
        } catch (error) {
            throw error;
        }
    }
}
