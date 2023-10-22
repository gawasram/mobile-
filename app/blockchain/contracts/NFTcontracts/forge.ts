import Contract from "../Contract";
import Artifacts from "./ForgeNFT.json";

class forge extends Contract {
    constructor(options, address) {
        super(options, "forge", Artifacts["abi"], address);
    }
}

export default forge;
