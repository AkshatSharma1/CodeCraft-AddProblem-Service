const NotImplementedError = require("../errors/notImplemented.error");
const { ProblemService } = require("../services");
const { ProblemRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const BadRequest = require("../errors/badrequest.error");
const logger = require("../config/logger.config")

const problemService = new ProblemService(new ProblemRepository());

function pingProblemController(req, res) {
    logger.error("Logs for ping controller")
    return res.json({message: 'Problem controller is up'});
}

async function addProblem(req, res, next) {
    try {
        // console.log("incoming req body", req.body);
        const newproblem = await problemService.createProblem(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Successfully created a new problem',
            error: {},
            data: newproblem
        })
    } catch(error) {
        console.log(error)
        next(error);
    }
}

async function getProblem(req, res, next) {
    try {
        const problem = await problemService.getProblem(req.params.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            error: {},
            message: 'Successfully fetched a problem',
            data: problem
        })
    } catch(error) {
        next(error);
    }
}

async function getProblems(req, res, next) {
    try {
        const response = await problemService.getAllProblems();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully fetched all the problems',
            error: {},
            data: response
        });
    } catch(error) {
        next(error);
    }
}

async function deleteProblem(req, res, next) {
    try {
        const deletedProblem = await problemService.deleteProblem(req.params.id);
        // console.log(deletedProblem)
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully deleted the problem',
            error: {},
            data: deletedProblem
        });
    } catch(error) {
        next(error);
    }
}

async function updateProblem(req, res, next) {
    try {
        const updatedProblem = await problemService.updateProblem(req.params.id, req.body);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully updated the problem',
            error: {},
            data: updatedProblem
        });
    } catch(error) {
        next(error);
    }
}

module.exports = {
    addProblem,
    getProblem,
    getProblems,
    deleteProblem,
    updateProblem,
    pingProblemController
}