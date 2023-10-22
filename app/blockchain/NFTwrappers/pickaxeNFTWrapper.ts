import Web3 from 'web3';
import pickaxe from '../contracts/NFTcontracts/pickaxe';
import { addressArray } from '../constants';

export default class pickaxeNFTWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: pickaxe;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        this.Contract = new pickaxe(this.wrapperOptions, addressArray[16].Contract[this.chainId]);
    }

    async buyPickaxe() {
        try {
            const tx = await this.Contract.send('buyPickaxe', { from: this.account });
        } catch (error) {
            throw error;
        }
    }
}
