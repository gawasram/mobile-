import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex">

      {/* Combined Navbar & Main Content */}
      <div className="w-2/3 flex flex-col">

        {/* Navbar */}
        <header className="bg-blue-600 p-4">
          {/* Your Navbar Contents */}
          Navbar Content
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-200">
          {/* Your Main Content */}
          Main Content
        </main>

      </div>

      {/* Sidebar */}
      <aside className="w-1/3 bg-gray-400 p-4">
        {/* Your Sidebar Contents */}
        Sidebar
      </aside>

    </div>
  );
};

export default Dashboard;
