import React, { useState } from "react";
import "./FileUploader.css";

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const newFiles = Array.from(event.dataTransfer.files);
    handleFiles(newFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (event) => {
    const newFiles = Array.from(event.target.files);
    handleFiles(newFiles);
  };

  const handleFiles = (newFiles) => {
    const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    const filteredFiles = newFiles.filter((file) =>
      validExtensions.includes(file.type)
    );

    if (filteredFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
      uploadFiles(filteredFiles);
    } else {
      alert("No valid image files uploaded.");
    }
  };

  const uploadFiles = (filesToUpload) => {
    const updatedUploadingFiles = Array(filesToUpload.length).fill(true);

    setUploadingFiles(updatedUploadingFiles);

    filesToUpload.forEach((file, index) => {
      const formData = new FormData();
      formData.append("file", file);

      // Simulate file upload
      setTimeout(() => {
        updatedUploadingFiles[index] = false;
        setUploadingFiles([...updatedUploadingFiles]);
      }, (index + 1) * 1000); // Simulating different upload times
    });
  };

  return (
    <div
      className={`drag-area ${isDragging ? "active" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="icon">
        <i className="fas fa-cloud-upload-alt"></i>
      </div>
      <header>Drag & Drop to Upload Files</header>
      <span>OR</span>
      <label htmlFor="fileInput" className="file-label">
        Browse Files
        <input
          type="file"
          id="fileInput"
          hidden
          onChange={handleFileInputChange}
          multiple
        />
      </label>
      <div className="file-list">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            {uploadingFiles[index] && <div className="loader"></div>}
            <span>{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
