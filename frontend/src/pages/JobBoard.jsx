import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { fetchJobs, searchJobsByLocation } from "../services/jobService.js";
import JobCard from "../components/jobCard";
import JobDetails from "../components/jobDetails";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const fetchAllJobs = async () => {
    const data = await fetchJobs();
    setJobs(data);
    setSelectedJob(data[0]);
  };

  const handleSearch = async (location) => {
    if (!location.trim()) {
      fetchAllJobs();
      return;
    }
    const data = await searchJobsByLocation(location);
    setJobs(data);
    setSelectedJob(data[0]);
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  return (
  <div className="flex flex-col h-screen bg-white p-4">
  <SearchBar onSearch={handleSearch} />

  <div className="flex flex-1 mt-4 border rounded-lg shadow overflow-hidden">
    
    <div className="w-full md:w-2/5 border-r overflow-y-auto bg-gray-50">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onClick={() => handleJobClick(job)}
          isSelected={selectedJob?._id === job._id}
        />
      ))}
    </div>

   
    <div className="w-full md:w-3/5 overflow-y-auto bg-white p-6">
      {selectedJob ? (
        <JobDetails job={selectedJob} />
      ) : (
        <div className="text-gray-500 text-center mt-10">
          Select a job to view details.
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default JobBoard;
