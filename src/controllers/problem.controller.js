const {StatusCodes} = require("http-status-codes");

//ping server check
function pingProblemController(req, res){
    return res.json({message: "Problem controller is up"})
}

//To add problem
async function addProblem(req, res, next){
    try {
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({
            message: `Not implemeneted`
        });
    } catch (error) {
        next(error)
    }
}

//get problem with id
async function getProblem(req, res, next) {
    try {
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({
            message: `Not implemeneted`
        })
    } catch (error) {
        next(error)
    }
}

//get problems
async function getProblems(req, res, next){
    try {
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({
            message: `Not implemeneted`
        })
    } catch (error) {
        next(error)
    }
}

//To remove problem
async function deleteProblem(req, res, next){
    try {
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({
            message: `Not implemeneted`
        })
    } catch (error) {
        next(error)
    }
}

//To update problem 
async function updateProblem(req, res, next){
    try {
        return res.status(StatusCodes.NOT_IMPLEMENTED).json({
            message: `Not implemeneted`
        })
    } catch (error) {
        next(error)
    }
}

module.exports={
    addProblem,
    getProblem,
    getProblems,
    deleteProblem,
    updateProblem,
    pingProblemController
}