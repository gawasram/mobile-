import Contract from "./Contract";
import Artifacts from "./cloth.json";

class cloth extends Contract {
    constructor(options, address) {
        super(options, "cloth", Artifacts["abi"], address);
    }
}

export default cloth;
