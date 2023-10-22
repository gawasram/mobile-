import Contract from "../Contract";
import Artifacts from "./ShovelNFT.json";

class shovel extends Contract {
    constructor(options, address) {
        super(options, "shovel", Artifacts["abi"], address);
    }
}

export default shovel;
