import passport from 'passport';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt  = require('passport-jwt').ExtractJwt;

import secret from './secret';
import User   from '../../models/user';


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
