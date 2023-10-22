import React from 'react';

interface NavbarProps {
  reorderedBalances: string[];
}

const Navbar: React.FC<NavbarProps> = ({ reorderedBalances }) => {
  const spacings = [155, 70, 70, 70, 70];
  
  return (
    <div 
      className="h-5 py-4 flex items-center bg-no-repeat bg-center" 
      style={{ backgroundImage: "url('/topbar.jpg')", backgroundSize: '100% 100%' }}
    >
      <div className="flex flex-row  "> 
        {reorderedBalances.map((balance, index) => (
          <div 
            key={index} 
            className="p-1 mt-2 px-5 w-20 rounded-md text-white font-bold" 
            style={{ marginLeft: `${spacings[index] || 0}px` }}  
          >
            {balance}
          </div>    
        ))}
      </div>
    </div>
  );
};

export default Navbar;
