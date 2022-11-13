const User = require("../models/user");
const bcrypt = require("bcrypt");
const customError = require("../utils/errorResponse")
const { 
  validateSignUp, 
  validateLogin 
} = require("../utils/validate")

exports.SignUp = async (req, res, next) => {
	try {
    // cek validasi apakah json yang dikirim sesuai
    // cek agar tidak ada atribut yang sama
		const { error } = validateSignUp(req.body)
		if (error)
			return next(new customError( error.details[0].message , 400 ))
  
    // check email
		const user = await User.findOne({ email: req.body.email })
		if (user)
			return next(new customError( "User with given email already Exist!", 409 ))
  
    // hashing password
		const salt = await bcrypt.genSalt(Number(process.env.SALT))
		const hashPassword = await bcrypt.hash(req.body.password, salt)

		await new User({ ...req.body, password: hashPassword }).save()
		res
      .status(201)
      .send({ message: "User created successfully" })

	} catch (err) {
		next(err)
	}
}

exports.Login = async (req, res, next) => {
	try {
    // cek validasi apakah json yang dikirim sesuai
    // cek agar tidak ada atribut yang sama
		const { error } = validateLogin(req.body);
		if (error)
			return next(new customError( error.details[0].message13, 400 )) 
      
    // check email
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return next(new customError( "Invalid Email or Password", 401 ))

    // compare password
		const validPassword = await bcrypt.compare(
			req.body.password, 
			user.password
		);
		if (!validPassword)
			return next(new customError( "Invalid Email or Password", 401 ))
     
    // generate token
		const token = user.generateAuthToken();
		res
      .cookie('auth_token', token, {
        httpOnly: true,
        sameSite: 'strict'
      })
      .status(200)
      .send({ 
        message: "Logged in successfully"
      })

	} catch (err) {
		next(err)
	}
}

exports.Logout = async (req, res, next) => {
  try {
    res.clearCookie('auth_token');
    res.status(200).json({ status: 'success' });
  } catch (err) {
    next(err);
  }
};

