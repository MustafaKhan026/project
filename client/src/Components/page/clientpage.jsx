import React from "react";
import "./page.css";
import img2 from "./images/img2.png";
import FileUpload from "../files/FileUploader";
const ClientPage = () => {
  return (
    <div>
      <div className="description ">
        <div className="description-image">
          <img src={img2} alt="Image 1" />
        </div>
        <div className="description-content">
          <h2>Verification Made Simple!</h2>
          <p>
            Instantly verify with the university if the student-submitted
            certificates are genuine. Easily download verified certificates for
            your records. Rest assured that the information is accurate and
            tamper-proof, thanks to our blockchain-based solution.
          </p>
          <div className="feature-box white-glassmorphism p-3 m-2">
            <div className="flex flex-row items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="ml-2">
                Verify submitted student certificates instantly with the
                university, ensuring authenticity and accuracy.
              </span>
            </div>
          </div>
          <div className="white-glassmorphism p-3 m-2">
            <div className="flex flex-row items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="ml-2">
                Download verified certificates effortlessly for your records,
                backed by our tamper-proof blockchain technology.
              </span>
            </div>
          </div>
          <div className="white-glassmorphism p-3 m-2">
            <div className="flex flex-row items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="ml-2">
                Streamline the verification process with a single button click
                for signature verification, making it convenient and
                hassle-free.
              </span>
            </div>
          </div>
          {/* Add more feature boxes */}
        </div>
      </div>
      <FileUpload /> {/* Include the updated FileUpload component here */}
      <div className="action-buttons">
        <button className="action-button">Verify Signature</button>
      </div>
    </div>
  );
};

export default ClientPage;
