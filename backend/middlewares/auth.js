import jwt from "jsonwebtoken";

export const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(403).json({
      success: false,
      message: "No token provided",
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    if (decoded.role !== "admin")
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    req.admin = decoded;
    next();
  });
};
