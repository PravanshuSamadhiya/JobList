import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import { Job } from "./models/Jobs.js";

dotenv.config();



async function importJobs() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to MongoDB");

    const rawData = fs.readFileSync("./jobs.json", "utf-8");
    const jobs = JSON.parse(rawData);

    const cleanedJobs = jobs.map((job) => ({
  jobId: job["Job ID (Numeric)"]
    ? String(job["Job ID (Numeric)"].$numberLong || job["Job ID (Numeric)"])
    : "",
  title: job.title || "",
  company: job.company || "",
  location: job.location || "",
  job_link: job.job_link || "",
  employment_type: job.employment_type || "",
  experience: job.experience || "",
  source: job.source || "",
  country: job.country || "",
  postedDateTime: job.postedDateTime?.["$date"]
    ? new Date(job.postedDateTime["$date"])
    : null,
  companyImageUrl: typeof job.companyImageUrl === "string" 
  ? job.companyImageUrl 
  : "",
  company_url:
    typeof job.company_url === "string"
      ? job.company_url
      : typeof job.company_url === "object" && job.company_url.$numberDouble
      ? ""
      : "",
  seniority_level: job.seniority_level || "",
  min_exp: typeof job.min_exp === "number" ? job.min_exp : 0,
  max_exp: typeof job.max_exp === "number" ? job.max_exp : 0,
  companytype: job.companytype || "",
}));

    await Job.deleteMany(); 
    await Job.insertMany(cleanedJobs);

    console.log(`🎉 Imported ${cleanedJobs.length} jobs into MongoDB`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Import error:", error);
    process.exit(1);
  }
}

importJobs();
