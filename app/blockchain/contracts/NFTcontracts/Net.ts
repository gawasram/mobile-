import Contract from "../Contract";
import Artifacts from "./NetNFT.json";

class fishNet extends Contract {
    constructor(options, address) {
        super(options, "fishNet", Artifacts["abi"], address);
    }
}

export default fishNet;
