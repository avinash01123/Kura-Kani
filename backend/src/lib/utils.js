const jwt = require("jsonwebtoken");
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const generateToken = (userId, res) => {
  const accessToken = jwt.sign({ userId }, ACCESS_SECRET_KEY, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("access_token", accessToken, {
    maxAge: 15 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  res.cookie("refresh_token", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = generateToken;
