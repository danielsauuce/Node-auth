const authMiddleware = (req, res, next) => {
  console.log("auth Middleware is called");
  next();
};

export default authMiddleware;
