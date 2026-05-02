function sessionAuth(req, res, next) {
  if (!req.session || !req.session.token) {
    return res.redirect("/login");
  }
  next();
}

module.exports = { sessionAuth };
