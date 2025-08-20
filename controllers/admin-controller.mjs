const adminController = (req, res) => {
  const { username } = req.userInfo;
  res.json({
    message: `Welcome back ${username}`,
  });
};

export default adminController;
