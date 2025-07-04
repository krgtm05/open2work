function onlyCandidate(req, res, next) {
  const role = req.user.role;
  if (role !== "candidate") {
    return res.status(403).json({ message: "Access denied: candidates only" });
  }
  next();
}

module.exports = {
  onlyCandidate: onlyCandidate,
};
