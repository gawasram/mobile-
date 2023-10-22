import Contract from "./Contract";
import Artifacts from "./brick.json";

class brick extends Contract {
    constructor(options, address) {
        super(options, "brick", Artifacts["abi"], address);
    }
}

export default brick;
