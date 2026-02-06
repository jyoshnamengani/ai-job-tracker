import React from 'react';
import JobFeed from './JobFeed';
import Dashboard from './Dashboard';
import JobDetails from './JobDetails';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>AI Job Tracker</h1>
      <JobFeed />
      <Dashboard />
      <JobDetails />
    </div>
  );
}

export default App;
