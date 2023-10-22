import Contract from "./Contract";
import Artifacts from "./WoolInTheBlockchainLandTrading.json";

class WoolInTheBlockchainLand extends Contract {
    constructor(options, address) {
        super(options, "WoolInTheBlockchainLand", Artifacts["abi"], address);
    }
}

export default WoolInTheBlockchainLand;
