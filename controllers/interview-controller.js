const Interview = require("../models/Interview");
const Student = require("../models/Student");

exports.interviews = async (req, res) => {
  try {
    const interviews = await Interview.find({});
    if (!interviews || interviews.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No interviews",
      });
    } else {
      return res.status(200).json({
        success: true,
        interviews,
        message: "Interview list fetched successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};

exports.createInterviews = async (req, res) => {
  try {
    const { company, date_of_visit } = req.body;
    if (!company || !date_of_visit) {
      return res.status(400).json({
        success: false,
        message: "Please provide both company and date_of_visit",
      });
    }
    const interview = await Interview.create({ company, date_of_visit });
    return res.status(200).json({
      success: true,
      interview,
      message: "Interview added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};

exports.addEligibleStudent = async (req, res) => {
  try {
    const { interviewId, studentId } = req.body;
    const student = await Student.findById(studentId);
    const interview = await Interview.findById(interviewId);

    if (!student || !interview) {
      return res.status(404).json({
        success: false,
        message: "Interview or student not found",
      });
    }

    if (interview.eligibleStudents.includes(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Student is already eligible for the interview",
      });
    }

    interview.eligibleStudents.push(studentId);
    await interview.save();

    return res.status(200).json({
      success: true,
      interview,
      message: "Student added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};

exports.removeEligibleStudent = async (req, res) => {
  try {
    const { interviewId, studentId } = req.body;
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    if (!interview.eligibleStudents.includes(studentId)) {
      return res.status(400).json({
        success: false,
        message: "Student is not eligible for the interview",
      });
    }

    interview.eligibleStudents = interview.eligibleStudents.filter(
      (student) => student.toString() !== studentId
    );
    await interview.save();

    return res.status(200).json({
      success: true,
      interview,
      message: "Student removed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};
