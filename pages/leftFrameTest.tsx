import React from "react";
import MainFrame from "../app/components/MainFrame";

const LeftFrameTest = () => {
    return (
        <div>
            <MainFrame reorderedBalances={["23","5","42337","794","2301"]} />
        </div>
    );
};

export default LeftFrameTest;
