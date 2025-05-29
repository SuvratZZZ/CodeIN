import { db } from "../libs/db.js";

export const createProblem = async (req, res) => {
    try {
        const {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            hints,
            editorial,
            testcases,
            codeSnippets,
            referenceSolutions
        } = req.body;

        // Validate required fields
        if (!title || !description || !difficulty || !constraints || !testcases || !codeSnippets || !referenceSolutions) {
            return res.status(400).json({
                error: "Missing required fields"
            });
        }

        // Validate difficulty enum
        if (!['EASY', 'MEDIUM', 'HARD'].includes(difficulty)) {
            return res.status(400).json({
                error: "Invalid difficulty level"
            });
        }

        const problem = await db.Problem.create({
            data: {
                title,
                description,
                difficulty,
                tags: tags || [],
                examples: examples || {},
                constraints,
                hints,
                editorial,
                testcases,
                codeSnippets,
                referenceSolutions,
                userId: req.user.id // Assuming user is authenticated and attached to request
            }
        });

        res.status(201).json({
            success: true,
            message: "Problem created successfully",
            problem
        });
    } catch (error) {
        console.error('Error creating problem:', error);
        res.status(500).json({
            success: false,
            message: "Failed to create problem",
            details: error.message
        });
    }
};

export const getProblemById = async (req, res) => {
    const { id } = req.params;

    try {
        const problem = await db.Problem.findUnique({
            where: { id }
        });

        res.status(200).json({
            success: true,
            message: "Problem fetched successfully",
            problem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch problem",
            details: error.message
        });
    }
};

export const getAllProblems = async (req, res) => {
    try {   
        const problems = await db.Problem.findMany();
        res.status(200).json({
            success: true,
            message: "Problems fetched successfully",
            problems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch problems",
            details: error.message
        });
    }
};

export const updateProblem = async (req, res) => {
    const { id } = req.params;

    const { title, description, input, output, constraints, sampleInput, sampleOutput, explanation } = req.body;

    const problem = await db.Problem.update({
        where: { id },
        data: { title, description, input, output, constraints, sampleInput, sampleOutput, explanation }
    });

    res.status(200).json(problem);
};

export const deleteProblem = async (req, res) => {
    const { id } = req.params;

    await db.Problem.delete({ where: { id } });

    res.status(200).json({ message: "Problem deleted successfully" });
};

export const getSolvedProblems = async (req, res) => {
    try {
        const solvedProblems = await db.problemSolved.findMany({
            include: {
                problem: true
            }
        });

        res.status(200).json({
            success: true,
            message: "Solved problems fetched successfully",
            solvedProblems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch solved problems",
            error: error.message
        });
    }
};

export const getSolvedProblemsByUser = async (req, res) => {
    const userId = req.user.id;

    try {
        // Get all solved problems with their details
        const solvedProblems = await db.problemSolved.findMany({
            where: { userId },
            include: {
                problem: {
                    select: {
                        id: true,
                        title: true,
                        difficulty: true,
                        tags: true,
                        createdAt: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Get difficulty counts
        const difficultyCounts = {
            EASY: solvedProblems.filter(p => p.problem.difficulty === "EASY").length,
            MEDIUM: solvedProblems.filter(p => p.problem.difficulty === "MEDIUM").length,
            HARD: solvedProblems.filter(p => p.problem.difficulty === "HARD").length
        };

        // Get submission history for heatmap
        const submissions = await db.submission.findMany({
            where: {
                userId,
                status: "Accepted"
            },
            select: {
                createdAt: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Generate heatmap data
        const heatmapData = [];
        const today = new Date();
        for (let i = 179; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const count = submissions.filter(s => 
                s.createdAt.toISOString().split('T')[0] === dateStr
            ).length;
            heatmapData.push({
                date: dateStr,
                count
            });
        }

        // Calculate streak
        let streak = 0;
        let currentDate = new Date();
        while (true) {
            const dateStr = currentDate.toISOString().split('T')[0];
            const hasSubmission = submissions.some(s => 
                s.createdAt.toISOString().split('T')[0] === dateStr
            );
            if (!hasSubmission) break;
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        }

        res.status(200).json({
            success: true,
            data: {
                solvedProblems,
                difficultyCounts,
                heatmapData,
                totalSolved: solvedProblems.length,
                streak,
                stats: {
                    totalSolved: solvedProblems.length,
                    easySolved: difficultyCounts.EASY,
                    mediumSolved: difficultyCounts.MEDIUM,
                    hardSolved: difficultyCounts.HARD
                }
            }
        });
    } catch (error) {
        console.error("Error fetching solved problems:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch solved problems",
            error: error.message
        });
    }
};
