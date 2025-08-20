const homeController = async (req, res) => {
  const { username, user_id, role } = req.userInfo;
  res.status(200).json({
    success: true,
    message: `Welcome ${username}`,
    user: {
      userId: user_id,
      username: username,
      role: role,
    },
  });
};

export default homeController;
