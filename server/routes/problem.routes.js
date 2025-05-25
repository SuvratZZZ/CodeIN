import { Router } from "express";
import { authMid } from "../middleware/auth.middleware.js";
import { checkAdmin } from "../middleware/auth.middleware.js";
import { createProblem, deleteProblem, getAllProblems, getProblemById, getSolvedProblems, updateProblem } from "../controllers/problem.controller.js";


const router = Router();

router.post("/create-problem", authMid, checkAdmin, createProblem);

router.get("/get-problem/:id", authMid, getProblemById);

router.get("/get-all-problems", authMid, getAllProblems);

router.put("/update-problem/:id", authMid, checkAdmin, updateProblem);

router.delete("/delete-problem/:id", authMid, checkAdmin, deleteProblem);

router.get("/get-solved-problems", authMid, getSolvedProblems);

export default router;
