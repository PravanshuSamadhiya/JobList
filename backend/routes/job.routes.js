import express from "express";
import { getAllJobs, getJobsByLocation } from "../controllers/job.controllers.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/search", getJobsByLocation);

export default router;
