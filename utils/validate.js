const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

exports.validateSignUp = (data) => {
	const schema = Joi.object({
		username: Joi.string().required().label("Username"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

exports.validateLogin = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

