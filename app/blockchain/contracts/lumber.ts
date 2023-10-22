import Contract from "./Contract";
import Artifacts from "./lumber.json";

class lumber extends Contract {
    constructor(options, address) {
        super(options, "lumber", Artifacts["abi"], address);
    }
}

export default lumber;
