import Contract from "../Contract";
import Artifacts from "./RowBoatNFT.json";

class RowBoat extends Contract {
    constructor(options, address) {
        super(options, "RowBoat", Artifacts["abi"], address);
    }
}

export default RowBoat;
