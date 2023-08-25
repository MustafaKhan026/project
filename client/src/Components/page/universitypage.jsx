import React,{useState} from "react";
import { ethers, utils } from "ethers";
import { abi, contractAddress} from "../../utils/constants"

import FileUpload from "../files/FileUploader";
import "./page.css";
import img1 from "./images/img1.jpg";
const UniversityPage = () => {
  const signFilesInFolder = async ({ setError, folder }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
  
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      const files = folder.files;
  
      const signatures = [];
  
      for (const file of files) {
        const fileBuffer = await file.arrayBuffer();
        const hashArray = new Uint8Array(await crypto.subtle.digest('SHA-256', fileBuffer));
        const hash = ethers.utils.hexlify(hashArray);
  
        const signature = await signer.signMessage(hash);
        const address = await signer.getAddress();
  
        signatures.push({
          fileName: file.name,
          fileHash: hash,
          signature,
          signerAddress: address
        });
      }
  
      return signatures;
    } catch (err) {
      setError(err.message);
    }
  };
  const [error, setError] = useState();
  const [signatures, setSignatures] = useState([]);
  const [csvContent, setCsvContent] = useState(null);

  const handleSign = async (e) => {
    e.preventDefault();
    setError();
    const folder = e.target.folder;
    if (!folder) {
      setError("Please select a folder.");
      return;
    }

    const files = Array.from(folder.files);

    const sigs = await signFilesInFolder({
      setError,
      folder: { files }
    });

    if (sigs && sigs.length > 0) {
      setSignatures([...signatures, ...sigs]);
    }
  };

  const generateCsvContent = () => {
    if (signatures.length === 0) {
      return;
    }

    const csvRows = [["File Name", "File Hash", "Digital Signature", "Signer Address"]];
    signatures.forEach(sig => {
      csvRows.push([sig.fileName, sig.fileHash, sig.signature, sig.signerAddress]);
    });


    // console.log(csvRows)
    for(let i = 1; i < csvRows.length; i++) {
      console.log(csvRows[i]);
    }
    const csvContent = csvRows.map(row => row.join(",")).join("\n");
    setCsvContent(csvContent);
  };

  const listenForTransactionMine = (transactionResponse, provider) => {
    console.log(`Mining Txn : ${transactionResponse.hash}`)
    return new Promise((resolve, reject) => {
        try {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log(
                    `Completed with ${transactionReceipt.confirmations} confirmations. `
                )
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}

  const storeBlockchain = async () => {
    // fetching data to store on chain
    if (signatures.length === 0) {
      return;
    }

    const certs = [];
    signatures.forEach(sig => {
      certs.push([sig.fileName, sig.fileHash, sig.signature, sig.signerAddress]);
    });
    console.log(certs);
    // End of data fetch

    // Blockchain logic
    

    if (typeof window.ethereum !== "undefined") {
      console.log("Storing Transcript on blockchain")
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" })
      } catch (error) {
        console.log(error)
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/f6-isSCf5OjiqBkWaONyDJCeUe-OPlzG")
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)

      certs.forEach(async cert => {
        try {
          const transcript = await contract.transcripts(cert[1])
          console.log(transcript)
          if(transcript[0] !== "") {
            console.log("Transcript already exists in blockchain")
            alert("Transcript already exists in blockchain")
          } else {
            const transactionResponse = await contract.addTranscript(cert)
            console.log(`Blockchain ID : ${transactionResponse.hash}`)
            await listenForTransactionMine(transactionResponse, provider)
          }
        } catch (error) {
          console.log(error)
        }
      })
    } else {
      alert("Metamask Not Found.");
    }
    
  }

  const handleDownload = () => {
    generateCsvContent();

    if (csvContent) {
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "file_signatures.csv";
      a.click();
    }
  };
  return (
    <div>
      <div className="description ">
        <div className="description-image">
          <img src={img1} alt="Image 1" />
        </div>
        <div className="description-content">
          <h2>Welcome to Transcript Manager</h2>
          <p>
            Utilize the power of ECDSA to digitally sign and securely upload
            transcripts onto the blockchain.
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
                Securely upload and store student transcripts on the blockchain
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
                Digital signature technology for tamper-proof records
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
                Prevent fraud and maintain data integrity
              </span>
            </div>
          </div>
          {/* Add more feature boxes */}
        </div>
      </div>
      <form>

      <FileUpload /> {/* Include the updated FileUpload component here */}
      <div className="action-buttons">
        <button className="action-button" onClick={handleSign}>SIGN FILES</button>
        <button className="action-button" onClick={handleDownload}>DOWNLOAD CSV</button>
        <button className="action-button" onClick={storeBlockchain}>BLOCKCHAIN</button>
      </div>
      </form>
    </div>
  );
};

export default UniversityPage;