const jwt = require('jsonwebtoken');
const customError = require("../utils/errorResponse")
const User = require ('../models/user')

exports.authMid = async (req, res, next) => {
  let currentUser;

  //Token Cookies
  const token = req.cookies.auth_token;
  if (!token) {
    return next(
      new customError ('Authentication Invalid Not Log In', 401)
    );
  }

  try {
    //Verify the user token
    let payload = jwt.verify(token, process.env.JWTKey);

    // Cek kalo user udh didelete => token releveant or not
    currentUser = await User.findById(payload._id);
    if (!currentUser) {
      return next(new customError('User does not exist for this token'), 401);
    }

  } catch (err) {
    return next(err);
  }

  // Proceed to next middleware/route
  req.user = currentUser;
  next();
};