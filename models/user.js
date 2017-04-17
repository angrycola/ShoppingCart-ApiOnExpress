import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema ({
  email:    { type: String, required: true, minlength: 5, trim: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true, minlength: 3, trim: true }
});

export default mongoose.model('User', UserSchema);
