import Jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided, please login to continue",
    });
  }

  try {
    const decodeToken = Jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userInfo = decodeToken;
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export default authMiddleware;
