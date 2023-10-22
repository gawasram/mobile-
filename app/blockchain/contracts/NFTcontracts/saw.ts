import Contract from "../Contract";
import Artifacts from "./SawNFT.json";

class saw extends Contract {
    constructor(options, address) {
        super(options, "saw", Artifacts["abi"], address);
    }
}

export default saw;
