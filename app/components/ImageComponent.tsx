import React, { useState, useCallback, useEffect } from "react";
import { imgArray } from "../data/imageData";

interface ImageComponentProps {
  src: string;
  title: string;
  handleImageClick: (arg: number) => void;
  setShowOffer: React.Dispatch<React.SetStateAction<boolean>>;
  currentIndex: number;
  index: number;
  buttonClicked: boolean;
  className?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  title,
  handleImageClick,
  setShowOffer,
  currentIndex,
  index,
  buttonClicked,
  className
}) => {
  const totalImages = imgArray.length;


  const handleClickCallback = useCallback(() => {
    if (!(currentIndex != index && buttonClicked)) {
      handleImageClick(index);
      setShowOffer(true);
    }
  }, [handleImageClick, setShowOffer]);

  return (
    <div className={`col-2 Card ${(currentIndex != index && buttonClicked) ? "grey disable" : ""} ${currentIndex == index ? 'active' : ''}${className}`}onClick={handleClickCallback}>
      <img src={src} alt={title} />
    </div>
  );
};

export default ImageComponent;