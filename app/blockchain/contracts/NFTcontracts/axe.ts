import Contract from "../Contract";
import Artifacts from "./AxeNFT.json";

class axe extends Contract {
    constructor(options, address) {
        super(options, "axe", Artifacts["abi"], address);
    }
}
export default axe;