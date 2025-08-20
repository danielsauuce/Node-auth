const homeController = async (req, res) => {
  const { username } = req.userinfo;
  res.status(200).json({
    success: true,
    message: `Welcome ${username}`,
    user: {
      _id: userid,
      username: username,
      role: role,
    },
  });
};

export default homeController;
