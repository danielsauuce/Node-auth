import jwt from "jsonwebtoken";
import User from "../models/user.mjs";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist, try a different username or email.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role,
    });
    await newUser.save();

    if (newUser) {
      return res.status(200).json({
        success: true,
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register user, please try again",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existedUser = await User.findOne({ username });
    if (!existedUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existedUser.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const accessToken = jwt.sign(
      {
        user_id: existedUser._id,
        username: existedUser.username,
        role: existedUser.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30m" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.user_id;

    //extract old and new password
    const { oldPassword, newPassword } = req.body;

    //find the currenct logged in user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //check if old password is correct
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is not correct! Please try again.",
      });
    }

    //hash the newPassword
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    //update the password in DB
    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const authControllers = { registerUser, loginUser, changePassword };

export default authControllers;
