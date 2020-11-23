const httpStatus = require('http-status');
const Customer = require('../models/customer.model');

const RefreshToken = require('../models/refreshToken.model');
const moment = require('moment-timezone');
const { jwtExpirationInterval } = require('../../config/vars');
const { findOne } = require('../models/customer.model');

/**
 * Returns a formated object with tokens
 * @private
 */
function generateTokenResponse(user, accessToken) {
  const tokenType = 'Bearer';
  const refreshToken = RefreshToken.generate(user).token;
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn,
  };
}

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req, res) => {
  try {
    const existUserEmail= await Customer.findOne({email:req.body.email});
    const existUsername= await Customer.findOne({username:req.body.username});

    if(existUserEmail){
      res.json('duplicate email');
    }else if(existUsername){
      res.json('duplicate username');
    }else{
      const customer = await new Customer({username:req.body.username,email:req.body.email, password:req.body.password}).save();
      const customerTransformed = customer.transform();
      const token = generateTokenResponse(customer, customer.token());
      return res.json({ token, user: customerTransformed, status: httpStatus.CREATED });
    }
  } catch (error) {
    console.log("register:", error);
  }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
  try {
  
    const { user, accessToken } = await Customer.findAndGenerateToken(req.body);
    /*console.log("accessToken")
    console.log(accessToken)*/
    const token = generateTokenResponse(user, accessToken);
    /*console.log(token);
    console.log(accessToken);*/
    const userTransformed = user.transform();
    
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(error)
  }
};



