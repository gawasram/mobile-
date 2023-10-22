import Contract from "./Contract";
import Artifacts from "./iron.json";

class iron extends Contract {
    constructor(options, address) {
        super(options, "iron", Artifacts["abi"], address);
    }
}

export default iron;
