const helpers = {};

helpers.checkSessionActive =(req, res, next) => {
    if (req.session.token) {
      return res.redirect('/');
    }
    next();
  }

  module.exports = helpers;
  