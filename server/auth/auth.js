var jwt = require('jsonwebtoken');
// a wrapper around jwt
// it verifies web tokens for you
var expressJwt = require('express-jwt');
var config = require('../config/config');
// returns a middleware function for us that looks on req.authorization
var checkToken = expressJwt({ secret: config.secrets.jwt });
var User = require('../api/user/userModel');

exports.decodeToken = function() {
  return function(req, res, next) {
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    if (req.query && req.query.hasOwnProperty('access_token')) {
      // Bearer is required, you have to namespace it
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }

    // this will call next if token is valid
    // and send error if its not. It will attached
    // the decoded token to req.user
    // look for token on req.authorization
    // will verify jwt with the secret
    // if verification process fails, it will call next with an error
    checkToken(req, res, next);
  };
};

exports.getFreshUser = function() {
  return function(req, res, next) {
    // we'll have access to req.user here
    // because we'll use decodeToken in before
    // this function in the middleware stack.
    // req.user will just be an object with the user
    // id on it. We want the full user object/
    // if no user is found it
    // was a valid JWT but didn't decode
    // to a real user in our DB. Either the user was deleted
    // since the client got the JWT, or
    // it was a JWT from some other source

    // update req.user with fresh user from the
    // stale token data

  }
};

exports.verifyUser = function() {
  return function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    // if no username or password then stop.

    // look user up in the DB so we can check
    // if the passwords match for the username
    if(!username || !password) {
      res.status(400).send('You need a username and password');
      return;
    }

    // look user up in the DB so we can check
    // if the passwords match for the username
    user.findOne({username: username})
      .then(function(user) {
        if(!user) {
          res.status(401).send('No user with the given username');
        } else {
          // check the passwords here

          // use the authenticate() method on a user doc. Passing
          // in the posted password, it will hash the
          // password the same way as the current passwords got hashed
          if(!user.authenticate(password)) {
            res.status(401).send('Wrong password');
          } else {
            // if everything is good
            // then attach to req.user
            // and call next so the controller 
            // can sign a token from the req.user._id
            req.user = user;
            next();
          }
        }
      }, function(err) {
        next(err);
      });
  };
};

// util method to sign tokens on signup
exports.signToken = function(id) {
  return jwt.sign(
    // _id is a choice by the database
    // so keep that
    {_id: id},
    config.secrets.jwt,
    {expiresInMinutes: config.expireTime}
  );
};
