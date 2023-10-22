import Web3 from 'web3';
import NFTWalletBalanceChecker from './contracts/NFTWalletBalanceChecker';

export default class NFTWalletBalanceCheckerWrapper {
    web3: Web3;
    chainId: number;
    account: string;
    wrapperOptions: any;
    Contract: NFTWalletBalanceChecker;

    constructor(web3, chainId, account, options = {}) {
        this.web3 = web3;
        this.chainId = chainId;
        this.account = account;

        this.wrapperOptions = {
            web3, chainId, account, ...options
        };

        // Use the address of your deployed WalletBalanceChecker contract here
        this.Contract = new NFTWalletBalanceChecker(this.wrapperOptions, "0x52A4B8E4AeC69B10683b74B6DAc509c4fc861845");
    }

    async checkNFTBalances(userAddress: string): Promise<string[]> {
        try {
            const balances = await this.Contract.call('checkNFTBalances', userAddress) as string[];
return balances;

        } catch (error) {
            throw error;
        }
    }

    async getBalance(userAddress?: string): Promise<string[]> {
        if (userAddress) {
            return this.checkNFTBalances(userAddress);
        } else {
            return this.checkBalancesOfConnectedAccount();
        }
    }    

    async checkBalancesOfConnectedAccount(): Promise<string[]> {
        return this.checkNFTBalances(this.account);
    }

    // Add other methods as needed based on the WalletBalanceChecker contract functions
}
