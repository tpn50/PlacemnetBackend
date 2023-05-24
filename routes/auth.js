const express = require("express");
const router = express.Router();

const { signIn, signUp } = require("../controllers/employees-controller");
const { students, addStudent } = require("../controllers/dashboard-controller");
const {
  interviews,
  createInterviews,
} = require("../controllers/interview-controller");
const { addResult, downloadCSV } = require("../controllers/results-controller");
const {
  addEligibleStudent,
  removeEligibleStudent,
} = require("../controllers/interview-controller");

router.post("/signin", signIn);
router.post("/signup", signUp);

router.get("/home/students", students);
router.post("/home/addStudent", addStudent);

router.get("/home/interviews", interviews);
router.post("/home/addinterview", createInterviews);

router.get("/home/downloadCSV", downloadCSV);

router.post("/home/interview/addStudent", addEligibleStudent);
router.post("/home/interview/removeStudent", removeEligibleStudent);

module.exports = router;
