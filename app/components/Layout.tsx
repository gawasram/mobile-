import React, { ReactNode } from 'react';

type LayoutProps = {
  leftChildren: ReactNode;
  rightChildren: ReactNode;
  backgroundImage: string;
}

const Layout: React.FC<LayoutProps> = ({ leftChildren, rightChildren, backgroundImage }) => {
  return (
    <div className="grid grid-cols-3 h-screen">
      <div 
        className="col-span-2 relative"
        style={{ 
            backgroundImage: `url(${backgroundImage})`, 
            backgroundSize: '100% 100%', 
            backgroundPosition: 'center',
        }}
      >
        <div 
            className="absolute top-0 right-0 bottom-0 left-0"
            style={{ 
                backgroundImage: 'url(/Left-column-frame-and-resource.png)', 
                backgroundSize: '100% 100%', 
            }}
        > 
        {leftChildren}
        </div>
      </div>

      <div 
        className="col-span-1 relative"
        style={{ 
            backgroundImage: 'url(/Right-column-background.png)', 
            backgroundSize: '100% 100%' 
        }}
      >
        {rightChildren}
      </div>
    </div>
  );
}

export default Layout;
