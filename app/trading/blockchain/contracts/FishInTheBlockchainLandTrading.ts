import Contract from "./Contract";
import Artifacts from "./FishInTheBlockchainLandTrading.json";

class FishInTheBlockchainLand extends Contract {
    constructor(options, address) {
        super(options, "FishInTheBlockchainLand", Artifacts["abi"], address);
    }
}

export default FishInTheBlockchainLand;
