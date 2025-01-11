import mongoose from 'mongoose';

const cryptoDataSchema = new mongoose.Schema({
  name: String,
  price: Number,
  marketCap: Number,
  "24hChange": Number,
  timestamp: { type: Date, default: Date.now },
});

const CryptoData = mongoose.model('CryptoData', cryptoDataSchema);

export { CryptoData };
