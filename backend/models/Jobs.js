import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  jobId: { type: String, required: true,},
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, default: "" },
  job_link: { type: String, required: true },
  employment_type: { type: String, default: "" },
  experience: { type: String, default: "" },
  source: { type: String, default: "" },
  country: { type: String, default: "" },
  postedDateTime: { type: Date },
  companyImageUrl: { type: String, default: "" },
  min_exp: { type: Number, default: 0 },
  max_exp: { type: Number, default: 0 },
  seniority_level: { type: String, default: "" },
  company_url: { type: String, default: "" },
  companytype: { type: String, default: "" },
}, {
  timestamps: true 
});

export const Job = mongoose.model("Job", JobSchema);
