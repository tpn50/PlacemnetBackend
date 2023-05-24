const Employee = require("../models/Employee");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Exists",
      });
    }
    const user = await Employee.create({
      name,
      email,
      password,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: "Internal server erroe",
      message: error.message,
    });
  }

  return res.status(200).json({
    success: true,
    message: "User Created Successfully",
  });
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res.status(400).json({
        success: fail,
        message: "Please fill the required details",
      });
    }
    const user = await Employee.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not reqistered",
      });
    }

    if (password == user.password) {
      return res.status(200).json({
        success: true,
        user,
        message: "User logged in",
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
