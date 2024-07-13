import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imagePath: {
    type: String
  }
});

const Product = mongoose.models.mobilephones || mongoose.model('mobilephones', ProductSchema);

export default Product;
