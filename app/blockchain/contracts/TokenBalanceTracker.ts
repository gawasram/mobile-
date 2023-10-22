import Contract from "./Contract";
import Artifacts from "./TokenBalanceTracker.json";

class TokenBalanceTracker extends Contract {
    constructor(options, address) {
        super(options, "TokenBalanceTracker", Artifacts["abi"], address);
    }
}

export default TokenBalanceTracker;