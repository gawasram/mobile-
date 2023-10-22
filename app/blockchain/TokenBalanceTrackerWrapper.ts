import Web3 from 'web3';
import TokenBalanceTracker from './contracts/TokenBalanceTracker';
import { addressArray } from './constants';

export default class TokenBalanceTrackerWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: TokenBalanceTracker;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        this.Contract = new TokenBalanceTracker(this.wrapperOptions, "0x9b59775B133695362BDe2E4952c1800146C02381");
    }

    async getERC20Balance(): Promise<unknown> {
        try {
            const ERC20Balance = await this.Contract.call('getERC20Balance');
            return ERC20Balance;
        } catch (error) {
            throw error;
        }
    }

    async getERC721Balance(): Promise<unknown> {
        try {
            const ERC721Balance = await this.Contract.call('getERC721Balance');
            return ERC721Balance;
        } catch (error) {
            throw error;
        }
    }
}