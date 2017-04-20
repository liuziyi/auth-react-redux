const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req,res,next){
	//User already has had their email and pw auth'd
	//We just need to give them a token
	res.send({ token: tokenForUser(req.user) })
}

exports.signup = function(req,res,next){

	const email = req.body.email;
	const password = req.body.password;

	if(!email || !password){
		return res.status(422).send({ error: 'You must provide email and password' })
	}

	//Check if email exists
	User.findOne({ email: email }, function(err, existingUser){
		if(err) { return next(err); }

		//If email exists, return an error
		if(existingUser){
			return (
				res.status(422).send({ error: 'Email is in use' })
			)
		}

		//If email doesn't exists, create and save user record
		const user = new User({
			email: email,
			password: password
		});

		user.save(function(err){
			if(err) { return next(err); }

			//Respond to request indicating the user was created
			res.json({ tokem: tokenForUser(user) })
		});
 
	});

	
}