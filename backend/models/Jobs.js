import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  jobId: { type: String},
  title: String,
  company: String,
  location: String,
  job_link: String,
  employment_type: String,
  experience: String,
  source: String,
  country: String,
  postedDateTime: Date,
  companyImageUrl: String,
  min_exp: Number,
  max_exp: Number,
  seniority_level: String,
  company_url: String,
  companytype: String,
});

export const Job = mongoose.model("Job", JobSchema);