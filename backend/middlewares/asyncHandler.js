const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    res.status(500).json({
      message: error.message || "Internal server error",
    });
  });
};

export default asyncHandler;
