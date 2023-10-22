import Contract from "../Contract";
import Artifacts from "./HammerNFT.json";

class hammer extends Contract {
    constructor(options, address) {
        super(options, "hammer", Artifacts["abi"], address);
    }
}

export default hammer;
