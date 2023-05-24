const mongoose = require("mongoose");
const Student = require("../models/Student");
const Interview = require("../models/Interview");
const Result = require("../models/Result");
const { Parser } = require("json2csv");

exports.downloadCSV = async (req, res) => {
  try {
    // Populate Interviews with relevant eligible students and their marks
    const interviews = await Interview.find({}).populate({
      path: "eligibleStudents",
      model: Student,
      select: "name college status scores",
    });

    // Format data for CSV
    const data = interviews.flatMap((interview) => {
      return interview.eligibleStudents.map((student) => ({
        interview_id: interview._id,
        interview_company: interview.company,
        student_id: student._id,
        student_name: student.name,
        student_college: student.college,
        student_status: student.status,
        DSA_Marks: student.scores.dsa,
        WebD_Marks: student.scores.webd,
        React_Marks: student.scores.react,
      }));
    });

    // Check if there is data to convert
    if (data.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data to download",
      });
    }

    // Convert JSON data to CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);

    // Set headers to prompt file download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=interviews.csv");

    return res.send(csv);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};
