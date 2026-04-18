import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide cryptocurrency name'],
      trim: true,
    },
    symbol: {
      type: String,
      required: [true, 'Please provide cryptocurrency symbol'],
      uppercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide price'],
    },
    image: {
      type: String,
      required: false,
    },
    change24h: {
      type: Number,
      required: [true, 'Please provide 24h change percentage'],
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Crypto', cryptoSchema);
