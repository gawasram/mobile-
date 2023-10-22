import Web3 from 'web3';
import nails from './contracts/nails';
import { addressArray } from './constants';

export default class nailsTokenWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: nails;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        this.Contract = new nails(this.wrapperOptions, addressArray[18].Contract[this.chainId]);
    }
    
    async approve(_approvalKey) {
        const value = '115792089237316195423570985008687907853269984665640564039457584007913129639935'; // (2^256 - 1)
        try {
            const tx = await this.Contract.send('approve', { from: this.account }, addressArray[_approvalKey].Contract[this.chainId], value);
            return tx;
        } catch (error) {
            throw error;
        }
    }

    async mintNail(_amount) {
        try {
            const tx = await this.Contract.send('mintNail', { from: this.account }, _amount);
        } catch (error) {
            throw error;
        }
    }

    async allowance(_approvalKey): Promise<unknown> {
        try {
            const allowance = await this.Contract.call('allowance', this.account, addressArray[_approvalKey].Contract[this.chainId]);
            return allowance;
        } catch (error) {
            throw error;
        }
    }
}
