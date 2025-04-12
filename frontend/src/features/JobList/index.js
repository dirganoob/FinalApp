import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../../features/common/headerSlice";
import "./JobList.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function JobList() {
  const [allJobs, setAllJobs] = useState([]); // Semua data pekerjaan
  const [filteredJobs, setFilteredJobs] = useState([]); // Data yang ditampilkan
  const [clusters, setClusters] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [selectedClassifications, setSelectedClassifications] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState("");
  const [clusterPercentages, setClusterPercentages] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      dispatch(showNotification({ type: "error", message: "Anda harus login terlebih dahulu." }));
      navigate("/login");
    }
  }, [userId, navigate, dispatch]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/jobs")
      .then(response => response.json())
      .then(data => {
        setAllJobs(data); 
        setFilteredJobs(data); 
        setClusters([...new Set(data.map(job => job.Cluster))]);
        setClassifications([...new Set(data.map(job => job.Classification))]);
        console.log("All Jobs:", data);
      })
      .catch(error => console.error("Error fetching jobs:", error));
  }, []);

  // Hitung persentase klasifikasi dalam setiap cluster
  useEffect(() => {
    if (selectedClassifications.length === 0) {
      setClusterPercentages({});
      return;
    }

    let classificationCountPerCluster = {};
    let totalRelevantClassifications = 0;

    selectedClassifications.forEach(cls => {
      allJobs.forEach(job => {
        if (job.Classification === cls) {
          if (!classificationCountPerCluster[job.Cluster]) {
            classificationCountPerCluster[job.Cluster] = 0;
          }
          classificationCountPerCluster[job.Cluster] += 1;
          totalRelevantClassifications += 1;
        }
      });
    });

    const percentages = {};
    Object.keys(classificationCountPerCluster).forEach(cluster => {
      percentages[cluster] = (classificationCountPerCluster[cluster] / totalRelevantClassifications) * 100;
    });

    setClusterPercentages(percentages);
  }, [selectedClassifications, allJobs]);

  // Memfilter pekerjaan berdasarkan cluster yang dipilih
  const handleClusterChange = (e) => {
    const cluster = e.target.value;
    setSelectedCluster(cluster);

    if (cluster === "") {
      setFilteredJobs(allJobs);
      return;
    }

    fetch(`http://127.0.0.1:5000/jobs/cluster/${encodeURIComponent(cluster)}`)
      .then(response => response.json())
      .then(data => {
        setFilteredJobs(data.message ? [] : data);
      })
      .catch(error => console.error("Error fetching jobs:", error));
  };

  const handleApplyJob = (job) => {
    if (appliedJobs.includes(job['Job ID'])) {
      dispatch(showNotification({ type: 'error', message: 'Anda sudah melamar pekerjaan ini.' }));
      return;
    }

    fetch('http://127.0.0.1:5000/apply-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, job }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          dispatch(showNotification({ message: 'Gagal memilih lamaran', status: 2 }));}else {
            dispatch(showNotification({ message: 'Lamaran berhasil dipilih!', status: 1 }));
            const newAppliedJobs = [...appliedJobs, job['Job ID']];
            setAppliedJobs(newAppliedJobs);
            localStorage.setItem('applied_jobs', JSON.stringify(newAppliedJobs));
            navigate('/app/integration');
          }
        })
        .catch(error => {
          console.error('Error applying job:', error);
          dispatch(showNotification({ type: 'error', message: 'Terjadi kesalahan saat melamar pekerjaan.' }));
        });
    };
  
    return (
      <div className="job-list-container">
        <h1 className="job-list-title">Daftar Pekerjaan</h1>
  
        {/* Dropdown Klasifikasi */}
        <div className="filter-container">
          <h2>Pilih Klasifikasi Pekerjaan:</h2>
          <div className="dropdown">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="dropdown-button">
              {selectedClassifications.length > 0 ? selectedClassifications.join(", ") : "Pilih Klasifikasi"}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-content">
                {classifications.map((classification, index) => (
                  <div key={index} className="checkbox-container">
                    <input
                      type="checkbox"
                      value={classification}
                      checked={selectedClassifications.includes(classification)}
                      onChange={(e) => {
                        const classification = e.target.value;
                        setSelectedClassifications(prev =>
                          prev.includes(classification) ? prev.filter(item => item !== classification) : [...prev, classification]
                        );
                      }}
                    />
                    <label>{classification}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
  
        {/* Dropdown Cluster */}
        <div className="filter-container">
          <h2>Pilih Cluster:</h2>
          <select id="cluster" value={selectedCluster} onChange={handleClusterChange}>
            <option value="">Semua Cluster</option>
            {clusters.map((cluster, index) => (
              <option key={index} value={cluster}>
                {`Cluster ${cluster}`} {clusterPercentages[cluster] ? `(${clusterPercentages[cluster].toFixed(2)}%)` : ""}
              </option>
            ))}
          </select>
        </div>
  
        {/* Job Cards */}
        <div className="job-list">
          {filteredJobs.length === 0 ? (
            <p className="no-jobs-message">Data pekerjaan tidak ditemukan.</p>
          ) : (
            <div className="job-card-container">
              {filteredJobs.map((job, index) => (
                <div key={index} className="job-card">
                  <div className="job-card-detail"><strong>Company:</strong> {job["Company"]}</div>
                  <div className="job-card-detail"><strong>Job:</strong> {job["Job"]}</div>
                  <div className="job-card-detail"><strong>Location:</strong> {job["Location"]}</div>
                  <div className="job-card-detail"><strong>Job Desk :</strong> {job["Teaser Job"]}</div>
                  <div className="job-card-detail"><strong>Bidang :</strong> {job["Classification"]}</div>
                  <div className="job-card-detail">
                  <span className="applied-count">
                    <i className="fas fa-user" style={{ marginRight: '5px' }}></i>
                    {job.appliedCount || 0}
                  </span>
                </div>
                  <div className="apply-button-container">
                    {appliedJobs.includes(job['Job ID']) ? (
                      <button className="apply-button disabled">Sudah Disimpan</button>
                    ) : (
                      <button className="apply-button" onClick={() => handleApplyJob(job)}>
                        Simpan
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default JobList;