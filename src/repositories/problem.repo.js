const { Problem } = require("../models");
const logger = require("../config/logger.config")
const NotFound = require('../errors/notfound.error');

class ProblemRepository {
  async createProblem(problemData) {
    try {
      const problem = await Problem.create({
        title: problemData.title,
        description: problemData.description,
        difficulty: problemData.difficulty,
        testCases: problemData.testCases ? problemData.testCases : [],
      });

      return problem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllProblems() {
    try {
      const getAllProblems = await Problem.find({});
      return getAllProblems;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getProblemByID(id) {
    try {
      console.log("In the repo :", id);
      const getProblem = await Problem.findById(id);
      console.log(getProblem);
      return getProblem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteProblem(id) {
    try {
      const deletedProblem = await Problem.findByIdAndDelete(id);
      console.log(deletedProblem)

      if (!deletedProblem) {
        //level of log
        logger.error(
          `Problem.Repository: Problem with id: ${id} not found in the db`
        );
        throw new NotFound("problem", id);
      }
      return deletedProblem;
    } catch (error) {
      throw error;
    }
  }

  async updateProblem(id, updatedData) {
    try {
      console.log(updatedData)
      const updatedProblem = await Problem.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      if (!updatedProblem) {
        throw new NotFound("Problem", id);
      }
      return updatedProblem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = ProblemRepository;
