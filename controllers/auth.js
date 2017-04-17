import User from '../models/user';

export const signup = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(422).send({ error: 'Email and password must be present'});

  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) res.status(422).send({ error: 'This email is already in use' });

    const user = new User({ email, password });

    user.save((err) => {
      if (err) return next(err);
      res.json({ user });
    });
  });
};
