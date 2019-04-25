module.exports = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.status(401).json({ error: 'You must log in!' });
};
