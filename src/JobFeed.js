
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function JobFeed() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('https://ai-job-tracker-hr6h.onrender.com/jobs')
      .then(response => setJobs(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Job Feed</h2>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <strong>{job.title}</strong> at {job.company}
            <p>{job.description}</p>
            <button>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobFeed;
