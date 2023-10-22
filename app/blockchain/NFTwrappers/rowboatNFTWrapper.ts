import Web3 from 'web3';
import RowBoat from '../contracts/NFTcontracts/rowboat';
import { addressArray } from '../constants';

export default class rowboatNFTWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: RowBoat;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        this.Contract = new RowBoat(this.wrapperOptions, addressArray[17].Contract[this.chainId]);
    }

    async buyRowBoat() {
        try {
            const tx = await this.Contract.send('buyRowBoat', { from: this.account });
        } catch (error) {
            throw error;
        }
    }
}
