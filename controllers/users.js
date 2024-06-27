const User = require("../models/user");

module.exports.signupFormRender = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ username, email });
    let registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome to wanderLust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", "username is already exit");
    res.redirect("/users/signup");
  }
};

module.exports.loginFromRender = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back on wanderlust");
  const redirect = res.locals.redirectUrl || "listings";
  res.redirect(redirect);
};

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged you Out!");
    res.redirect("/listings");
  });
};
