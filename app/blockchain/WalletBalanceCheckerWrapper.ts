import Web3 from 'web3';
import WalletBalanceChecker from './contracts/WalletBalanceChecker';

export default class WalletBalanceCheckerWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: WalletBalanceChecker;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        // Use the address of your deployed WalletBalanceChecker contract here
        this.Contract = new WalletBalanceChecker(this.wrapperOptions, "0xe2B8F6abEcC1F5e729eF2c9857584E542314A22b");
    }

    async checkBalances(userAddress: string): Promise<string[]> {
        try {
            const balances = await this.Contract.call('checkBalances', userAddress) as string[];
return balances;

        } catch (error) {
            throw error;
        }
    }

    async getBalance(userAddress?: string): Promise<string[]> {
        if (userAddress) {
            return this.checkBalances(userAddress);
        } else {
            return this.checkBalancesOfConnectedAccount();
        }
    }    

    async checkBalancesOfConnectedAccount(): Promise<string[]> {
        return this.checkBalances(this.account);
    }

    // Add other methods as needed based on the WalletBalanceChecker contract functions
}
