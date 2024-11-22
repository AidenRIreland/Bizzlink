import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  console.log("Request body received by backend:", req.body);
  try {
    const { 
      fullName, 
      username, 
      password, 
      confirmPassword, 
      email, 
      phone, 
      companyName, 
      industry, 
      address, 
      socialLinks, 
      businessLogo, 
      gender
  } = req.body;
      console.log("Extracted fields:", email, address, phone, socialLinks);
// Ensure all required fields are validated
if (!fullName || !username || !email || !password || !confirmPassword) {
  return res.status(400).json({ error: "Please fill in all required fields" });
}


    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
   // Check if username or email already exists
   const user = await User.findOne({ username });
   const existingEmail = await User.findOne({ email });
   if (user) {
       return res.status(400).json({ error: "Username already exists" });
   }
   if (existingEmail) {
       return res.status(400).json({ error: "Email already exists" });
   }


    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      email,
      phone,
      companyName,
      industry,
      address,
      socialLinks,
      businessLogo,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id; // Assuming req.user is populated from the protectRoute middleware

    console.log("userId:", userId);
    console.log("currentPassword:", currentPassword);
    console.log("newPassword:", newPassword);

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    console.log("user.password:", user.password);

    // Verify the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the password in the database
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in changePassword:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
