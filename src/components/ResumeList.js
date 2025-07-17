import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ResumeList.css';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchResumes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cv/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Ensure the response is an array
      if (Array.isArray(res.data)) {
        setResumes(res.data);
        setFilteredResumes(res.data);
      } else {
        console.error("Invalid data format received:", res.data);
        setResumes([]);
        setFilteredResumes([]);
      }

    } catch (err) {
      console.error("Failed to fetch resumes", err);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = resumes.filter(cv =>
      (cv.fullName && cv.fullName.toLowerCase().includes(term)) ||
      (cv.email && cv.email.toLowerCase().includes(term)) ||
      (cv.skills && cv.skills.toLowerCase().includes(term))
    );
    setFilteredResumes(filtered);
  }, [searchTerm, resumes]);

  return (
    <div className="resume-list-container">
      <h2>Uploaded Resumes</h2>

      <input
        type="text"
        className="search-input"
        placeholder="Search by name, email, or skills"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="refresh-button-container">
        <button className="refresh-button" onClick={fetchResumes}>
          🔄 Refresh Resumes
        </button>
      </div>

      <table className="resume-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Skills</th>
            <th>Resume File</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredResumes) && filteredResumes.length > 0 ? (
            filteredResumes.map((cv, index) => (
              <tr key={index}>
                <td>{cv.fullName || "N/A"}</td>
                <td>{cv.email}</td>
                <td>{cv.phone}</td>
                <td>{cv.skills}</td>
                <td>
                  {cv.fileName ? (
                    <button
                      className="view-file-button"
                      onClick={async () => {
                        try {
                          const token = localStorage.getItem("token");
                          if (!token) {
                            alert("You must be logged in to view files.");
                            return;
                          }

                          const res = await axios.get(
                            `${process.env.REACT_APP_BACKEND_URL}/api/cv/signed-url/${cv.fileName}`,
                            {
                              headers: {
                                Authorization: `Bearer ${token}`
                              }
                            }
                          );

                          if (res.data) {
                            window.open(res.data, "_blank");
                          } else {
                            alert("No signed URL received.");
                          }
                        } catch (err) {
                          alert("Failed to open file");
                          console.error("Signed URL fetch failed:", err);
                        }
                      }}
                    >
                      View File
                    </button>
                  ) : (
                    "Not Available"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No resumes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResumeList;
