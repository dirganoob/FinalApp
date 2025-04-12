import React, { useState, useEffect } from 'react';

function Integration() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('user_id');
  const [appliedStatus, setAppliedStatus] = useState({});

  useEffect(() => {
    if (!userId) {
      alert('Anda harus login terlebih dahulu.');
      return;
    }

    fetch(`http://127.0.0.1:5000/user-applications/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user applications');
        }
        return response.json();
      })
      .then((data) => {
        setAppliedJobs(data.applications || []);
        const initialStatus = {};
        data.applications.forEach((job, index) => {
          initialStatus[index] = false;
        });
        setAppliedStatus(initialStatus);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
        setLoading(false);
      });
  }, [userId]);

  const handleApplyClick = (index) => {
    setAppliedStatus((prevState) => ({
      ...prevState,
      [index]: true,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">Memuat data...</p>
      </div>
    );
  }

  if (appliedJobs.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">
          Anda belum melamar pekerjaan apa pun.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Lamaran Pekerjaan Anda
        </h2>
        <div className="grid gap-6">
          {appliedJobs.map((job, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                {job.job_title || 'Pekerjaan'}
              </h3>
              <p className="text-gray-600 mb-1">
                <strong>Perusahaan:</strong> {job.Company || 'Tidak tersedia'}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Lokasi:</strong> {job.Location || 'Tidak tersedia'}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Link:</strong>{' '}
                {job.Job_URL ? (
                  <a href={job.Job_URL} target="_blank" rel="noopener noreferrer">
                    {job.Job_URL}
                  </a>
                ) : (
                  'Belum ada status'
                )}
              </p>
              <p className="text-gray-600">
                <strong>Work Type:</strong> {job["Work Type"] || 'Tidak tersedia'}
              </p>
              <div className="mt-4">
                <button
                  className={`px-4 py-2 rounded-md text-white font-semibold ${appliedStatus[index] ? 'bg-green-600' : 'bg-red-600'}`}
                  disabled={appliedStatus[index]}
                >
                  {appliedStatus[index] ? 'Sudah Dilamar' : 'Belum Dilamar'}
                </button>
                {!appliedStatus[index] && (
                  <button
                    onClick={() => handleApplyClick(index)}
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700"
                  >
                    Tandai Sudah Dilamar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Integration;
