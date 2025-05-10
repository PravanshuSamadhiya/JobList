import express from "express";
import { Job } from "../models/Jobs.js";

export const getAllJobs = async(req , res) => {
    try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}

export const getJobsByLocation = async(req , res) => {
  const { location } = req.query;
  try {
    const query = location
      ? { location: { $regex: new RegExp(location, 'i') } }
      : {};
    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}