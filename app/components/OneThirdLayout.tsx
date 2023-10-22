import React, { ReactNode } from 'react';

interface OneThirdLayoutProps {
  children?: ReactNode;
}

const OneThirdLayout: React.FC<OneThirdLayoutProps> = ({ children }) => {
  return (
    <div 
      className="h-full w-1/3 bg-no-repeat bg-center" 
      style={{ 
        backgroundImage: "url('/rightsidebar.jpg')", 
        backgroundSize: '100% 100%',
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat'
      }}
    >
      {children}
    </div>
  );
};

export default OneThirdLayout;
