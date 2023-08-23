import React from 'react';

const ContactInformation = () => {
  return (
    <div className="gradient-bg-transactions py-16 text-white ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-12">Contact Information</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="p-6 rounded-lg bg-gray-900 shadow-md">
            <h3 className="text-lg font-semibold mb-4">We're Here to Help</h3>
            <p className="text-gray-400 mb-6">
              For inquiries and support, please reach out to us at{' '}
              <a
                href="mailto:airesearchcentre@woxsen.edu.in"
                className="text-blue-500 hover:underline"
              >
                airesearchcentre@woxsen.edu.in
              </a>
              .
            </p>
            <button className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out">
              Get Support
            </button>
          </div>
          <div className="p-6 rounded-lg bg-gray-900 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Follow us on{' '}
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>{' '}
              to stay updated with our progress and latest news.
            </p>
            <button className="px-6 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition duration-300 ease-in-out">
              Follow on LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
