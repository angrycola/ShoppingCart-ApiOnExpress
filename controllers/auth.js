import jwt from 'jwt-simple';
import secret from '../lib/passport/secret';

import User from '../models/user';

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp, email: user.email }, secret.key);
};

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(422).send({ error: 'Email and password must be present'});

  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) res.status(422).send({ error: 'This email is already in use' });

    const user = new User({ email, password });
    user.save((err) => {
      if (err) return next(err);
      res.json({ token: tokenForUser(user) });
    });
  });
};

export const pre = (req, res, next) => {
  const email = req.body.email;
  User.findOne({ email }, (err, existingUser) => {
    if (existingUser) return res.send({ error: 'Email is already in use' });
    if (err) return next(err);
  });
};
