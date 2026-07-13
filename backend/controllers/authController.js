import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// =====================================================
// REGISTER
// =====================================================

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// LOGIN
// =====================================================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// GET PROFILE
// =====================================================

export const getProfile = async (req, res) => {
  res.json(req.user);
};

// =====================================================
// UPDATE PROFILE
// =====================================================

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.fullName = req.body.fullName ?? user.fullName;
    user.phone = req.body.phone ?? user.phone;

    user.age = req.body.age ?? user.age;
    user.gender = req.body.gender ?? user.gender;

    user.state = req.body.state ?? user.state;
    user.district = req.body.district ?? user.district;

    user.category = req.body.category ?? user.category;

    user.occupation = req.body.occupation ?? user.occupation;

    user.education = req.body.education ?? user.education;

    user.course = req.body.course ?? user.course;

    user.annualIncome =
      req.body.annualIncome ?? req.body.income ?? user.annualIncome;

    await user.save();

    res.json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// PROFILE IMAGE
// =====================================================

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "SchemeSathi/Profile",
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
          });
        }

        const user = await User.findById(req.user._id);

        user.profileImage = result.secure_url;

        await user.save();

        res.json({
          success: true,
          message: "Profile image uploaded successfully",
          image: result.secure_url,
          user,
        });
      },
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Upload Failed",
    });
  }
};
