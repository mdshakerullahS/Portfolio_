import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username !== process.env.ADMIN_USERNAME) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const validPassword = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const verifyToken = (req, res) => {
  const token = req.cookies[token];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ success: true, decoded });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};
