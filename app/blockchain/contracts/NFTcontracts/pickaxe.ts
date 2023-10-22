import Contract from "../Contract";
import Artifacts from "./PickaxeNFT.json";

class pickaxe extends Contract {
    constructor(options, address) {
        super(options, "pickaxe", Artifacts["abi"], address);
    }
}

export default pickaxe;
