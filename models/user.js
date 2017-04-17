import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new Schema ({
  email:    { type: String, required: true, minlength: 5, trim: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true, minlength: 3, trim: true }
});


UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});


export default mongoose.model('User', UserSchema);
