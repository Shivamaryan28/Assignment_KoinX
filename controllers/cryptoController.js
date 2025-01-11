import axios from 'axios';
import { CryptoData } from '../models/CryptoDataModel.js';

export const fetchCryptoData = async (req,res) => {
    const url = process.env.COINGECKO_URL;
    const params = {
      ids: 'bitcoin,matic-network,ethereum',
      vs_currencies: 'usd',
      include_market_cap: 'true',
      include_24hr_change: 'true',
    };
  
    try {
      
      const response = await axios.get(url, { params });
  
      // Extracting data
      const { bitcoin, 'matic-network': matic, ethereum } = response.data;
  
      const cryptoData = [
        new CryptoData({
          name: 'bitcoin',
          price: bitcoin.usd,
          marketCap: bitcoin.usd_market_cap,
          "24hChange": bitcoin.usd_24h_change,
          timestamp: new Date(),
        }),
        new CryptoData({
          name: 'matic',
          price: matic.usd,
          marketCap: matic.usd_market_cap,
          "24hChange": matic.usd_24h_change,
          timestamp: new Date(),
        }),
        new CryptoData({
          name: 'ethereum',
          price: ethereum.usd,
          marketCap: ethereum.usd_market_cap,
          "24hChange": ethereum.usd_24h_change,
          timestamp: new Date(),
        }),
      ];

      //inserting the data in database
      await CryptoData.insertMany(cryptoData);
      res.status(200).json({"message":"Database updated successfully."});
    } catch (error) {
      console.error('Error fetching crypto data:', error.message);
      return error
    }
  }