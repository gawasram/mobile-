import Contract from "../Contract";
import Artifacts from "./ShearsNFT.json";

class shears extends Contract {
    constructor(options, address) {
        super(options, "shears", Artifacts["abi"], address);
    }
}

export default shears;
