import React, { useState } from "react";
import "./page.css";
import img2 from "./images/img2.png";
import FileUpload from "../files/FileUploader";
import { ethers } from "ethers";
import { abi, contractAddress} from "../../utils/constants"
import axios from 'axios';
const fetchBlockchain = async (cert_hash) => {
  console.log("Fetching Data from Blockchain");
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    console.log(contract)
    try {
      const transcript = await contract.transcripts(cert_hash)

      console.log(transcript.cert_name);
      console.log(transcript.digitalSignature);
      console.log(transcript.signerAddress);
      return transcript;
      // await listenForTransactionMine(transactionResponse, provider)
    } catch (error) {
      console.log(error)
    }
  } else {
    alert("Metamask Not Found.");
  }

}

const verifyFileSignature = async ({ file, address, signature }) => {
  try {
    const fileBuffer = await file.arrayBuffer();
    const hashArray = new Uint8Array(await crypto.subtle.digest('SHA-256', fileBuffer));
    const hash = ethers.utils.hexlify(hashArray);

    const signerAddr = await ethers.utils.verifyMessage(hash, signature);
    if (signerAddr !== address) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
const downloadCert = async () => {
  try {
    const response = await axios.get('http://localhost:5000/genCert', {
      responseType: 'blob', // Indicate the response type as a blob
    });
    

    console.log(response);
    // console.log(response.json());
    // Create a blob URL for the response data
    const blobUrl = URL.createObjectURL(response.data);

    // Create a temporary link element to trigger the download
    const a = document.createElement('a');
    a.href = blobUrl;
    // fetch the name from db
    a.download = "Genuiness-Certificate.docx"; // Set the desired filename
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Clean up the blob URL
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};
const ClientPage = () => {
  const [fileHash, setFileHash] = useState();
  const handleVerification = async (e) => {
    e.preventDefault();
    setFileHash("");
    const transcript = await fetchBlockchain(fileHash)
    const data = new FormData(e.target);
    const file = data.get("file");
    const signature = transcript.digitalSignature
    const address = transcript.signerAddress

    if (!file) {
      console.error("Please select a file.");
      return;
    }

    const isValid = await verifyFileSignature({
      file,
      address,
      signature
    });

    if (isValid) {
      console.log("Signature is valid!");
      // await fetch('127.0.0.1:5000/genCert').then(res=>console.log(res))
      // axios.get('http://localhost:5000/genCert', { responseType: 'blob' }).then(res=>console.log(res))
      // fetch and send student details as parameters for downloadCert()
      downloadCert();
      

      // add function to generate genuiness certificate.
    } else {
      console.log("Invalid")
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileBuffer = await selectedFile.arrayBuffer();
      const hashArray = new Uint8Array(await crypto.subtle.digest('SHA-256', fileBuffer));
      const hash = ethers.utils.hexlify(hashArray);
      // fetchBlockchain(hash)
      setFileHash(hash);
    } else {
      setFileHash("");
    }
  };

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
      <form onSubmit={handleVerification}>
      <FileUpload  func={handleFileChange}/> {/* Include the updated FileUpload component here */}
      <div className="action-buttons">
        <button className="action-button">Verify Signature</button>
      </div>
      </form>
    </div>
  );
};

export default ClientPage;
