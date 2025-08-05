const homeController = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the home page.",
  });
};

export default homeController;
