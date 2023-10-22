import Contract from "./Contract";
import Artifacts from "./rope.json";

class rope extends Contract {
    constructor(options, address) {
        super(options, "rope", Artifacts["abi"], address);
    }
}

export default rope;