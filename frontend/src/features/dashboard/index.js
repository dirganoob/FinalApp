import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './dashboard.css';
// Register necessary components for chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, 
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [availableJobs, setAvailableJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('jobsData');
    if (storedData) {
      setAvailableJobs(JSON.parse(storedData));
      setLoading(false);
    } else {
      fetch('http://127.0.0.1:5000/jobs')
        .then(response => response.json())
        .then(data => {
          setAvailableJobs(data);
          localStorage.setItem('jobsData', JSON.stringify(data));
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching available jobs:', error);
          setError('Error fetching jobs data');
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const classificationCounts = availableJobs.reduce((acc, job) => {
    const classification = job.Classification;
    acc[classification] = (acc[classification] || 0) + 1;
    return acc;
  }, {});

  const jobData = {
    labels: Object.keys(classificationCounts),
    datasets: [
      {
        label: 'Jumlah lowongan',
        data: Object.values(classificationCounts),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard Pekerjaan</h1>
      </header>

      <main className="dashboard-content">
        <div className="chart-container">
          <h2>Grafik Lowongan</h2>
          <Line data={jobData} />
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2025 Job Dashboard</p>
      </footer>
    </div>
  );
}

export default Dashboard;
