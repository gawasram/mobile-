import Contract from "./Contract";
import Artifacts from "./NFTWalletBalanceChecker.json";

class NFTWalletBalanceChecker extends Contract {
    constructor(options, address) {
        super(options, "NFTWalletBalanceChecker", Artifacts["abi"], address);
    }
}

export default NFTWalletBalanceChecker;
