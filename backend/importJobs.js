import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import { Job } from "./models/Jobs.js";

dotenv.config();

const BATCH_SIZE = 1000;

async function importJobs() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    
    const rawData = fs.readFileSync("./jobs.json", "utf-8");
    const jobs = JSON.parse(rawData);

    if (!Array.isArray(jobs)) {
      throw new Error("jobs.json must be an array of job objects.");
    }

    const cleanedJobs = jobs.map((job) => {
      const jobIdRaw = job["Job ID (Numeric)"];
      let jobId = "";
      if (typeof jobIdRaw === "string") {
        jobId = jobIdRaw;
      } else if (typeof jobIdRaw === "object" && "$numberLong" in jobIdRaw) {
        jobId = String(jobIdRaw["$numberLong"]);
      }

      return {
        jobId,
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
        companyImageUrl: typeof job.companyImageUrl === "string" ? job.companyImageUrl : "",
        company_url: typeof job.company_url === "string" ? job.company_url : "",
        seniority_level: job.seniority_level || "",
        min_exp: typeof job.min_exp === "number" ? job.min_exp : 0,
        max_exp: typeof job.max_exp === "number" ? job.max_exp : 0,
        companytype: job.companytype || "",
      };
    });

    await Job.deleteMany();

    const insertedJobIds = new Set();
    for (let i = 0; i < cleanedJobs.length; i += BATCH_SIZE) {
      const batch = cleanedJobs.slice(i, i + BATCH_SIZE);
      const uniqueBatch = batch.filter((job) => !insertedJobIds.has(job.jobId));

      uniqueBatch.forEach((job) => insertedJobIds.add(job.jobId));

      try {
        if (uniqueBatch.length > 0) {
          await Job.insertMany(uniqueBatch, { ordered: false });
        }
      } catch (error) {
        fs.appendFileSync("failed_jobs.log", JSON.stringify(error.writeErrors?.map(e => e.err.op), null, 2) + "\n");
      }
    }

    process.exit(0);
  } catch (error) {
    fs.appendFileSync("failed_jobs.log", JSON.stringify(error.writeErrors?.map(e => e.err.op), null, 2) + "\n");
    process.exit(1);
  }
}

importJobs();
