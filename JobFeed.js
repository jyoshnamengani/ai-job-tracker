import React, { useEffect, useState } from "react";
import axios from "axios";
import "./JobFeed.css";

function JobFeed() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);

  // Load jobs from backend
  useEffect(() => {
    axios.get("http://localhost:3001/jobs")
      .then(response => setJobs(response.data))
      .catch(error => console.error(error));
  }, []);

  // Load saved status on refresh
  useEffect(() => {
    const saved = localStorage.getItem("appliedJobs");
    if (saved) setAppliedJobs(JSON.parse(saved));
  }, []);

  // Save status when applying
  const handleApply = (jobId) => {
    const didApply = window.confirm("Did you apply for this job?");
    const newStatus = {
      ...appliedJobs,
      [jobId]: didApply ? "Applied" : "Not Applied"
    };
    setAppliedJobs(newStatus);
    localStorage.setItem("appliedJobs", JSON.stringify(newStatus));
  };

  // Filter jobs by search term and type
  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "All" || job.type === filterType;

    return matchesSearch && matchesType;
  });

  // Dashboard summary counts
  const appliedCount = Object.values(appliedJobs).filter(status => status === "Applied").length;
  const notAppliedCount = Object.values(appliedJobs).filter(status => status === "Not Applied").length;

  return (
    <div className="job-feed">
      {!selectedJob ? (
        <>
          <div className="feed-header">
            <div className="header-content">
              <h1>Discover Jobs</h1>
              <p>Browse through our curated list of opportunities</p>
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-dropdown"
              >
                <option value="All">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
          </div>

          {/* Dashboard Summary */}
          <div className="dashboard-summary">
            <div className="summary-card applied">
              <h3>Applied Jobs</h3>
              <p>{appliedCount}</p>
            </div>
            <div className="summary-card not-applied">
              <h3>Not Applied Jobs</h3>
              <p>{notAppliedCount}</p>
            </div>
          </div>

          <div className="jobs-container">
            {filteredJobs.map(job => (
              <div key={job.id} className="job-card" onClick={() => setSelectedJob(job)}>
                <div className="card-content">
                  <div className="job-title-row">
                    <h3>{job.title}</h3>
                    <span className="job-tag">{job.type}</span>
                  </div>
                  <div className="company-info">
                    <span className="company-icon">🏢</span>
                    {job.company}
                  </div>
                  <div className="job-location">
                    <span className="detail-icon">📍</span>
                    {job.location}
                  </div>
                  <div className="job-description">
                    <p>{job.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="job-details-page">
          <h2>{selectedJob.title}</h2>
          <p><b>Company:</b> {selectedJob.company}</p>
          <p><b>Location:</b> {selectedJob.location}</p>
          <p><b>Type:</b> {selectedJob.type}</p>
          <p><b>Description:</b> {selectedJob.description}</p>

          <button
            className={`action-button ${appliedJobs[selectedJob.id] === "Applied" ? "applied" : ""}`}
            onClick={() => handleApply(selectedJob.id)}
          >
            {appliedJobs[selectedJob.id] === "Applied" ? "✓ Applied" : "Apply Now"}
          </button>

          <button className="back-button" onClick={() => setSelectedJob(null)}>
            ← Back to Job Feed
          </button>
        </div>
      )}
    </div>
  );
}

export default JobFeed;