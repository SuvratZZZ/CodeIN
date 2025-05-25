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
    const problems = await db.Problem.findMany();

    res.status(200).json(problems);
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
    const { id } = req.params;

    const solvedProblems = await db.Problem.findMany({
        where: { solved: true }
    });

    res.status(200).json(solvedProblems);
};
