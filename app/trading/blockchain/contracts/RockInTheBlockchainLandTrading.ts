import Contract from "./Contract";
import Artifacts from "./RockInTheBlockchainLandTrading.json";

class RockInTheBlockchainLand extends Contract {
    constructor(options, address) {
        super(options, "RockInTheBlockchainLand", Artifacts["abi"], address);
    }
}

export default RockInTheBlockchainLand;
