import { BriefcaseIcon, MapPinIcon } from "@heroicons/react/24/outline";

const JobCard = ({ job, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border-l-4 p-4 mb-2 bg-white rounded-md shadow-sm transition-all hover:shadow-md ${
        isSelected ? "border-pink-600" : "border-transparent"
      }`}
    >
      <h3 className="text-md font-semibold text-gray-800">{job.title}</h3>
      <p className="text-sm text-gray-600">
        {job.company} — <span className="text-gray-500">{job.location}</span>
      </p>
      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{job.description}</p>

      <div className="flex justify-between items-center mt-2">
        <span className="text-sm font-semibold text-gray-700">
          {job.salary}
        </span>
        <button className="text-pink-600 text-sm font-semibold hover:underline">
          Quick Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;



