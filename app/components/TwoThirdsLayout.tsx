

const TwoThirdsLayout = ({ children }) => {
  return (
    <div style={{ width: '66.66%', backgroundImage: "url('/homeport.jpg')", backgroundSize: '100% 100% ', backgroundPosition: 'center' }}>
      <main>
        {children}
      </main>
    </div>
  );
};


export default TwoThirdsLayout;
