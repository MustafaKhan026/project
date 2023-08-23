import React from 'react'
const BenefitItem = ({ icon, title, description }) => (
    <div className="flex items-start mb-8">
      <div className="w-10 h-10 bg-blue-500 rounded-full flex-shrink-0 flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
const Benifits = () => {
    const benefits = [
        {
          icon: (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ),
          title: 'Efficiency',
          description: ' Say goodbye to weeks of verification delays; our solution streamlines the process, providing instant access to verified credentials.'
          
        },
        {
          icon: (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ),
          title: 'Transparency',
          description: `Blockchain's immutable ledger ensures that verification records are transparent and tamper-proof.` 
          
        },
        {
            icon: (
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            ),
            title: 'Security',
            description: 'Our platform employs the robust Elliptic Curve Digital Signature Algorithm (ECDSA) and SHA-256 hashing, creating an impervious shield against data tampering.'
            
          },
          {
            icon: (
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            ),
            title: 'Enhanced Trust',
            description: 'Certificates backed by blockchain technology instill confidence in both graduates and employers, fostering a trustworthy ecosystem.'
            
          },
        // Add more benefits as needed
      ];
    
      return (
        <div className="gradient-bg-transactions text-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-8">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <BenefitItem key={index} {...benefit} />
              ))}
            </div>
          </div>
        </div>
      );
}

export default Benifits