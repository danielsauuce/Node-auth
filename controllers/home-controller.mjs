const homeController = async (req, res) => {
  const { username, userid, role } = req.userinfo;
  res.status(200).json({
    success: true,
    message: "Welcome to the home page.",
    user: {
      _id: userid,
      username: username,
      role: role,
    },
  });
};

export default homeController;
