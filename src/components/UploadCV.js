import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UploadCV.css';

const UploadCV = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("https://nirvana-produces-stay-nn.trycloudflare.com/api/cv/upload", formData, {
        headers: {
          // DO NOT manually set Content-Type for FormData!
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success(response.data || "Uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      if (err.response) {
        toast.error(err.response.data || "Upload failed due to server.");
      } else {
        toast.error("Upload failed. Backend may be down or unreachable.");
      }
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Resume</h2>
      <input type="file" onChange={handleFileChange} />
      <br /><br />
      <button onClick={handleUpload}>Upload</button>
      <ToastContainer />
    </div>
  );
};

export default UploadCV;
