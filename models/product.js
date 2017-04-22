import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  title       : { type: String, required: [true, 'field is required'], minlength: 3, trim: true },
  description : { type: String, required: [true, 'field is required'], minlength: 3, trim: true },
  imagePath   : { type: String, required: [true, 'field is required'], minlength: 3, trim: true },
  price       : { type: Number, required: [true, 'field is required'] },
  category    : { type: String, minlength: 3, trim: true }
});

export default mongoose.model('Product', ProductSchema);
