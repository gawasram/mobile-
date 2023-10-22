import Contract from "./Contract";
import Artifacts from "./WalletBalanceChecker.json";

class WalletBalanceChecker extends Contract {
    constructor(options, address) {
        super(options, "WalletBalanceChecker", Artifacts["abi"], address);
    }
}

export default WalletBalanceChecker;
