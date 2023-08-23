import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

export default function StudentForm() {
  const [fileList, setFileList] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const updatedStudentDetails = fileList.map((file) => ({
      ...file,
      cert_hash: calculateHash(file.data),
    }));
    setStudentDetails(updatedStudentDetails);
  }, [fileList]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFileList(
      selectedFiles.map((file) => ({
        data: file,
        regNo: "",
        name: "",
        yearOfPassing: "",
        collegeName: "",
      }))
    );
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedStudentDetails = [...studentDetails];
    updatedStudentDetails[index][name] = value;
    setStudentDetails(updatedStudentDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const studentInfo of studentDetails) {
        const response = await axios.post(
          "http://localhost:5000/uploadStudent",
          studentInfo
        );
        if (response.status === 201) {
          console.log(response);
        }
      }

      setError("");
      alert("Student details saved successfully!");
      setFileList([]);
      setStudentDetails([]);
    } catch (error) {
      setError("An error occurred while saving student details.");
    }
  };

  const calculateHash = (data) => {
    const wordArray = CryptoJS.lib.WordArray.create(data);
    const hash = CryptoJS.SHA256(wordArray);
    return hash.toString(CryptoJS.enc.Hex);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Student Information</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium">Select Directory</label>
          <input
            type="file"
            className="form-control"
            name="files"
            onChange={handleFileChange}
            multiple
            directory=""
            webkitdirectory=""
          />
        </div>

        {fileList.map((file, index) => (
          <div key={index} className="border p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">File {index + 1}</h2>
            <div className="form-group">
              <label className="block text-sm font-medium">Registration Number</label>
              <input
                type="text"
                className="form-control w-full border rounded-md px-3 py-2 text-black"
                name="regNo"
                value={studentDetails[index]?.regNo || ""}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                className="form-control w-full border rounded-md px-3 py-2 text-black"
                name="name"
                value={studentDetails[index]?.name || ""}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium">Year of Passing</label>
              <input
                type="text"
                className="form-control w-full border rounded-md px-3 py-2 text-black"
                name="yearOfPassing"
                value={studentDetails[index]?.yearOfPassing || ""}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium">College Name</label>
              <input
                type="text"
                className="form-control w-full border rounded-md px-3 py-2 text-black"
                name="collegeName"
                value={studentDetails[index]?.collegeName || ""}
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
            
            {/* Display certificate name and hash */}
            <div className="mb-2">
              <strong>Certificate Name:</strong> {file.data.name}
            </div>
            <div className="mb-2">
              <strong>Certificate Hash:</strong> {studentDetails[index]?.cert_hash || ""}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
      </form>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}
