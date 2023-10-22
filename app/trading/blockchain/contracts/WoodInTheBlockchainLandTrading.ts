import Contract from "./Contract";
import Artifacts from "./WoodInTheBlockchainLandTrading.json";

class WoodInTheBlockchainLand extends Contract {
    constructor(options, address) {
        super(options, "WoodInTheBlockchainLand", Artifacts["abi"], address);
    }
}

export default WoodInTheBlockchainLand;
