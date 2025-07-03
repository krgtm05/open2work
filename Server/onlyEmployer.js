function onlyEmployer(req, res, next) {
  if (req.user?.role !== "employer") {
    return res.status(403).json({ message: "Access denied: employers only" });
  }
  next();
}

module.exports = {
  onlyEmployer: onlyEmployer,
};
