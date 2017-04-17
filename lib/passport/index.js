import passport from 'passport';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;
import LocalStrategy from 'passport-local';

import secret from './secret';
import User   from '../../models/user';


const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);

    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false);
      // and finally
      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret.key
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false);
    if (user) {
      done(null, user); //null of err, get user
    } else {
      done(null, false); //no user
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
