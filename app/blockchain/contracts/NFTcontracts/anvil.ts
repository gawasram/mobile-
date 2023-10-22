import Contract from "../Contract";
import Artifacts from "./AnvilNFT.json";

class anvil extends Contract {
    constructor(options, address) {
        super(options, "anvil", Artifacts["abi"], address);
    }
}
export default anvil;