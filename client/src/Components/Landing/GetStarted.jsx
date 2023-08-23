import React from 'react';

const GetStarted = () => {
  return (
    <div className="gradient-bg-services py-16 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8">Get Started</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg bg-gray-900 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Join the Future of Verification</h3>
            <p className="text-gray-400">
              Universities: Streamline your transcript issuance and verification process today.
            </p>
            <button className="mt-4 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition duration-300 ease-in-out">
              Get Started
            </button>
          </div>
          <div className="p-6 rounded-lg bg-gray-900 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Client Companies: Experience a New Era of Efficient Hiring</h3>
            <p className="text-gray-400">
              Hire with confidence using reliable credentials and a streamlined verification process.
            </p>
            <button className="mt-4 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition duration-300 ease-in-out">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
