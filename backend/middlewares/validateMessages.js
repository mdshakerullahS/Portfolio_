export const validateMessage = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  if ((!name || !email || !subject, !message)) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email.",
    });
  }

  next();
};
