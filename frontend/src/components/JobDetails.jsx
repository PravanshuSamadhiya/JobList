const JobDetails = ({ job, theme = "purple" }) => {
  const themes = {
    purple: "text-purple-600 dark:text-purple-400",
    blue: "text-blue-600 dark:text-blue-400",
    emerald: "text-emerald-600 dark:text-emerald-400",
  };

  const textColor = themes[theme] || themes.purple;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 transition-all">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{job.title}</h2>

      <div className="space-y-2 text-sm">
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold text-gray-800 dark:text-gray-100">Company:</span> {job.company}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold text-gray-800 dark:text-gray-100">Location:</span> {job.location}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold text-gray-800 dark:text-gray-100">Employment Type:</span> {job.employment_type}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold text-gray-800 dark:text-gray-100">Experience:</span> {job.experience}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold text-gray-800 dark:text-gray-100">Posted:</span>{" "}
          {new Date(job.postedDateTime).toLocaleDateString()}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-semibold text-gray-800 dark:text-gray-100">Source:</span> {job.source}
        </p>
      </div>

      <div className="mt-5">
        <a
          href={job.job_link}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline font-medium ${textColor} hover:opacity-90`}
        >
          View Job Posting ↗
        </a>
      </div>
    </div>
  );
};

export default JobDetails;
