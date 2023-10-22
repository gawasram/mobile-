import React, {useEffect, useState} from "react";

const ManufacturingTiles = ({
    imgArray,
    buttonClicked,
    currentIndex,
    handleImageClick,
    setIsShowOffer
}) => (
    <div className="container mx-auto p-4 w-full mt-14 md:w-3/4 lg:w-1/2 h-full md:h-auto lg:h-[500px] overflow-y-scroll scrollbar-hide">
        <div className="grid grid-cols-4 gap-1">
            {imgArray.map((item, index) => (
                <div
                    key={item.title + index}
                    className="w-5 h-5 md:w-32 md:h-16 lg:w-20 lg:h-20 object-contain"
                >
                    <ImageComponent
                        buttonClicked={buttonClicked}
                        src={item.src}
                        title={item.title}
                        currentIndex={currentIndex}
                        index={index}
                        handleImageClick={handleImageClick}
                        setShowOffer={setIsShowOffer}
                    />
                </div>
            ))}
        </div>
        <p className="mt-4 text-center text-yellow-500 font-bold">
            Scroll to see more item tiles below
        </p>

    </div>
);