import Contract from "./Contract";
import Artifacts from "./NAIL.json";

class nails extends Contract {
    constructor(options, address) {
        super(options, "nails", Artifacts["abi"], address);
    }
}

export default nails;
