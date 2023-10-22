import React, { useEffect, useState } from 'react';

interface MainFrameProps {
  reorderedBalances: string[];
}

const MainFrame: React.FC<MainFrameProps> = ({ reorderedBalances }) => {
  const spacings = [15, 70, 70, 70, 70];
  const [frameWidth, setFrameWidth] = useState(0);
  const [frameHeight, setFrameHeight] = useState(0);

  useEffect(() => {
      
    const updateFrameWidth = () => {
      const windowHeight = window.innerHeight;
      setFrameHeight(windowHeight);
      const newFrameWidth = (29 / 20) * windowHeight; // Calculate the width based on the ratio
      setFrameWidth(newFrameWidth);
    };

    // Initial sizing
    updateFrameWidth();

    // Add a resize event listener to update the size when the window is resized
    window.addEventListener('resize', updateFrameWidth);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateFrameWidth);
    };
  }, []);

  return (
    <div className="bg-black">
      <div className="h-screen">
        <div
          className="items-center mx-auto bg-no-repeat bg-center"
          style={{
            backgroundImage: "url('/main-frame.png')",
            // backgroundSize: `${height}px ${height}px`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: `${frameWidth}px`,
            // height: `${squareSize}px`,
            aspectRatio: '29/20'
          }}
        >
          <div className="flex w-full h-full justify-evenly"
            style={{
              paddingTop: `${(frameHeight * 1.45)/100}px`,
              paddingLeft: `${(frameWidth * 6.1)/100}px`,
              paddingRight: `${(frameWidth * 34)/100}px`
            }}>
            {reorderedBalances.map((balance, index) => (
              <div
                key={index}
                className="justify-evenly text-white font-bold"
                style={{ 
                  fontSize: `${frameHeight / 45}px`,
                  width: `${frameWidth * 0.05}px`,
                  paddingLeft: `0px`,
                  paddingRight: `0px`
                 }}>
                {balance}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  ); 
};

export default MainFrame;
