import Contract from "./Contract";
import Artifacts from "./CLAYInTheBlockchainLandTrading.json";

class CLAYInTheBlockchainLand extends Contract {
    constructor(options, address) {
        super(options, "CLAYInTheBlockchainLand", Artifacts["abi"], address);
    }
}

export default CLAYInTheBlockchainLand;
