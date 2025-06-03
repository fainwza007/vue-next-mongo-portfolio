export const errorHandler = (err, req, res, next) => {
  console.log(err.stack);

  if (res.headerSent) {
    return next(err);
  }

  res.status(500).json({
    message: "Something went wrong!",
  });
};
