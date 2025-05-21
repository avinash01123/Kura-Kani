const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (jwtError) {
      if (
        jwtError.name === "JsonWebTokenError" ||
        jwtError.name === "TokenExpiredError"
      ) {
        return res.status(401).json({ message: "Token is invalid or expired" });
      }
      throw jwtError;
    }
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = protectRoute;
