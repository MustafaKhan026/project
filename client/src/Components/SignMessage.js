import { useState } from "react";
import { ethers, utils } from "ethers";
import ErrorMessage from "./ErrorMessage";
import axios from 'axios';
import { abi, contractAddress} from "../utils/constants"

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

export default function SignMessage() {
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
      <form className="m-4" onSubmit={handleSign}>
      <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Sign files in folder
          </h1>
          <div className="">
            <div className="my-3">
              <input
                required
                type="file"
                name="folder"
                webkitdirectory=""
                className="input input-bordered focus:ring focus:outline-none w-full"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Sign files
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="btn btn-secondary submit-button focus:ring focus:outline-none w-full mt-2"
            disabled={signatures.length === 0}
          >
            Download CSV
          </button>
          <button
            type="button"
            onClick={storeBlockchain}
            className="btn btn-secondary submit-button focus:ring focus:outline-none w-full mt-2"
            disabled={signatures.length === 0}
          >
            Blockchain
          </button>
          <ErrorMessage message={error} />
        </footer>
      </div>
    </form>
    {/* <h1> Nothing</h1> */}
    </div>
  );
}
