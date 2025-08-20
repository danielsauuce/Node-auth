const isAdminUser = (req, res, next) => {
  if (req.userInfo.role !== "admin") {
    return res.status.json({
      success: false,
      message: "Access denied, admin rights required",
    });
  }
  next();
};

export default isAdminUser;
