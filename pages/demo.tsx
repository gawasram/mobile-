// Demo.tsx
import React from 'react';

const Demo: React.FC = () => {
  return (
    <div className="h-screen bg-[rgb(14,14,14)] flex items-center justify-center">
      <img 
        className="w-[1000px] h-full bg-[hsl(0,0%,90%)] transition-colors duration-300 cursor-zoom-in"
        src="/main-frame.png" 
        alt="Main Frame" 
      />
    </div>
  );
}

export default Demo;
