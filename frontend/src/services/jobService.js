import axios from "axios";

const API_BASE_URL = "https://joblist-9ngj.onrender.com/api/jobs"; 

export const fetchJobs = async () => {
  try {
    const res = await axios.get(API_BASE_URL);
    return res.data;
  } catch (err) {
    console.error("Error fetching jobs", err);
    return [];
  }
};

export const searchJobsByLocation = async (location) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/search`, {
      params: { location },
    });
    return res.data;
  } catch (err) {
    console.error("Error searching jobs by location", err);
    return [];
  }
};
