import express from "express"
import { authMid } from "../middleware/auth.middleware.js";
import { getAllSubmission, getAllTheSubmissionsForProblem, getSubmissionsForProblem } from "../controllers/submission.controller.js";


const submissionRoutes = express.Router()


submissionRoutes.get("/get-all-submissions" , authMid , getAllSubmission);
submissionRoutes.get("/get-submission/:problemId" , authMid , getSubmissionsForProblem)

submissionRoutes.get("/get-submissions-count/:problemId" , authMid , getAllTheSubmissionsForProblem)


export default submissionRoutes;