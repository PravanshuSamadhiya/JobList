import { useState } from "react";

const SearchBar = ({ onSearch, theme = "purple" }) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(location);
  };

  const themes = {
    purple: {
      bg: "bg-purple-600",
      hover: "hover:bg-purple-700",
    },
    blue: {
      bg: "bg-blue-600",
      hover: "hover:bg-blue-700",
    },
    emerald: {
      bg: "bg-emerald-600",
      hover: "hover:bg-emerald-700",
    },
  };

  const selectedTheme = themes[theme] || themes.purple;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center"
    >
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Search by location..."
        className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-purple-400 transition-all"
      />
      <button
        type="submit"
        className={`px-6 py-2 rounded-xl text-white font-medium ${selectedTheme.bg} ${selectedTheme.hover} transition-all`}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

