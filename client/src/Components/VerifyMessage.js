import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";
import { abi, contractAddress } from "../utils/constants"
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

export default function VerifyFileSignature() {
  const [error, setError] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [fileHash, setFileHash] = useState();

  const handleVerification = async (e) => {
    e.preventDefault();
    setSuccessMsg();
    setError();
    // setFileHash("");
    const transcript = await fetchBlockchain(fileHash)
    const data = new FormData(e.target);
    const file = data.get("file");
    const signature = transcript.digitalSignature
    const address = transcript.signerAddress

    if (!file) {
      setError("Please select a file.");
      return;
    }

    const isValid = await verifyFileSignature({
      file,
      address,
      signature
    });

    if (isValid) {
      setSuccessMsg("Signature is valid!");
      // await fetch('127.0.0.1:5000/genCert').then(res=>console.log(res))
      // axios.get('http://localhost:5000/genCert', { responseType: 'blob' }).then(res=>console.log(res))
      // fetch and send student details as parameters for downloadCert()
      downloadCert();
      

      // add function to generate genuiness certificate.
    } else {
      setError("Invalid signature");
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
    <form className="m-4" onSubmit={handleVerification}>
      <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Verify File Signature
          </h1>
          <div className="">
            <div className="my-3">
              <input
                required
                type="file"
                name="file"
                className="input input-bordered focus:ring focus:outline-none w-full"
                onChange={handleFileChange}
              />
            </div>
            {fileHash && (
              <div className="textarea w-full h-14 textarea-bordered focus:ring focus:outline-none">
                <p>File Hash: {fileHash}</p>
              </div>
            )}
            {/* <div className="my-3">
              <textarea
                required
                type="text"
                name="signature"
                className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                placeholder="Signature"
              />
            </div>
            <div className="my-3">
              <input
                required
                type="text"
                name="address"
                className="input input-bordered focus:ring focus:outline-none w-full"
                placeholder="Signer address"
              />
            </div> */}
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Verify Signature
          </button>
        </footer>
        <div className="p-4 mt-4">
          <ErrorMessage message={error} />
          <SuccessMessage message={successMsg} />
        </div>
      </div>
    </form>
  );
}
