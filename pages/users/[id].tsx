import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ImageViewer: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  

  const goBack = () => {
    router.back();
  };

  if (!id) return <p>Loading...</p>;

  const imageUrl = `https://gateway.pinata.cloud/ipfs/${id}`;

  
 


  const handleStake = () => {
    // Logic for staking or harvesting
  };

 
  return (
    <div className="grid grid-cols-3 h-screen">
  
      {/* Left Sidebar Content (2/3 size) with Background */}
      <div 
    className="col-span-2 relative"
    style={{ 
        backgroundImage: `url(${imageUrl})`, 
        backgroundSize: 'cover', 
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
        {/* You can add additional content here if needed */}
    </div>
</div>

 

  
      {/* Right Sidebar Content (1/3 size) with Background */}
      <div 
        className="col-span-1 relative"
        style={{ backgroundImage: 'url(/Right-column-background.png)', backgroundSize: '100% 100%' }}
      >
        {/* You can add content or other UI components here */}
        {/* Back Button */}
        <button 
          onClick={goBack}
          className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>

        <div className="mt-12">
    <div className="flex items-center justify-center ">
        <h1 className="text-xl font-bold mt-6 mb-3">Harvest Resources</h1>
    </div>

        <span className="mb-4 ml-8 ">On LandNFT 0x0y_C2</span>

        <div className="mb-4 ml-8">
          <h2>Select Your Character to Stake</h2>
          <div className="flex space-x-4 mt-2 ml-8">
          <Image src="https://gateway.pinata.cloud/ipfs/Qma9UKohnTLEVSbzCEES4zQuRw5F2fsx5k8jUZ7oL5dRM9" alt="ruben" width={70} height={70} />
          <Image src="https://gateway.pinata.cloud/ipfs/QmatT6s9sgowNdn5Tw41ywvH9RfgAFdLeMJxFBKuEFHYpJ" alt="hans" width={70} height={70} />

          </div>
        </div>

        <div className="mb-4 ml-8">
          <h2>Select Tool to use</h2>
          <div className="mt-2 ml-8">
            <Image src="https://gateway.pinata.cloud/ipfs/QmaT7fBrTY49aZzuR7kYk7vS9fhD6SPzopkXBhP98w4Jvk" alt="Tool" width={70} height={70} />
          </div>
        </div>

        <div className="mb-4 ml-8">
          <h2>Select Resource to Harvest</h2>
          <div className="flex space-x-4 mt-2 ml-8">
            <Image src="https://gateway.pinata.cloud/ipfs/QmNMXhu6EMiyDRUHqV1mm27ABQYtGyLWLHVo97BEXnePML"alt="Resource 1" width={70} height={70} />
            <Image src="https://gateway.pinata.cloud/ipfs/QmYDnFZYqKGbG3VQTH4yKWUbMjSyRfy3K1p7Kz3ikMtuph" alt="Resource 2" width={70} height={70} />
            <Image src="https://gateway.pinata.cloud/ipfs/QmQjodW7SiQCpkNY1d2M9B39mmXTANyzcNY21cor6vSqpq" alt="Resource 2" width={70} height={70} />
          </div>
        </div>

        <div className="flex justify-center items-center">
  <button style={{ width: '150px' }} className="h-10 px-4 bg-blue-500 text-white rounded" onClick={handleStake}>
    Stake Character
  </button>
</div>
      </div>
      </div>
    </div>
  );
  };
  

export default ImageViewer;
