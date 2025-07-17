import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import './Dashboard.css';

const Dashboard = () => {
  const [cvData, setCvData] = useState([]);

  useEffect(() => {
    api.get("/cv/all")
      .then((res) => setCvData(res.data))
      .catch((err) => {
        alert("Failed to load CVs. Are you logged in?");
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {cvData.map((cv) => (
          <li key={cv.id}>{cv.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
