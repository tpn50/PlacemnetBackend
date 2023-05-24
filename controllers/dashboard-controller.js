const Student = require("../models/Student");

exports.students = async (req, res) => {
  try {
    const students = await Student.find({});
    if (!students) {
      return res.status(400).json({
        success: false,
        message: "No users",
      });
    } else {
      return res.status(200).json({
        succsss: true,
        students,
        message: "Student list fetched successfullt",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: "Internal server erroe",
      message: error.message,
    });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { email, name, batch, college, status, scores } = req.body;
    if (
      !email ||
      !name ||
      !batch ||
      !college ||
      !status ||
      !scores ||
      !scores.dsa ||
      !scores.webd ||
      !scores.react
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill the required details",
      });
    }

    const student = await Student.create({
      email,
      name,
      batch,
      college,
      status,
      scores,
    });

    return res.status(200).json({
      success: true,
      message: "Student Added Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: "Internal server error",
      message: error.message,
    });
  }
};
